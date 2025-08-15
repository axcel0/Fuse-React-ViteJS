import { useState, useEffect, useCallback } from 'react';

// Import types from container types
import type { ContainerStatus, ActivityLog } from '../app/(control-panel)/container/types';

// Base URL untuk API
const BASE_URL = 'https://dev-be-udms-pmcp-evsoft.polytron.local';

// Keycloak configuration
const KEYCLOAK_CONFIG = {
	tokenUrl: 'https://dev-ppsso.polytronev.id/realms/pmcp/protocol/openid-connect/token',
	clientId: 'be-ppsso-pmcp-rest-api',
	clientSecret: '75ta3DN2Yf25u41bcg7eRQ0Sq4joE2x4'
};

// Access token storage - menggunakan token dari localStorage (Keycloak)
function getStoredAccessToken(): string | null {
	return localStorage.getItem('accessToken');
}

// Function untuk mendapatkan access token dari Keycloak
async function getAccessToken(username: string, password: string): Promise<string> {
	const response = await fetch(KEYCLOAK_CONFIG.tokenUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'password',
			client_id: KEYCLOAK_CONFIG.clientId,
			client_secret: KEYCLOAK_CONFIG.clientSecret,
			username,
			password
		})
	});

	if (!response.ok) {
		throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	localStorage.setItem('accessToken', data.access_token);
	return data.access_token;
}

// Function untuk set access token manual (jika sudah ada token)
function setAccessToken(token: string) {
	localStorage.setItem('accessToken', token);
}

// Network monitoring untuk debugging dev tunnel
let networkStats = {
	totalRequests: 0,
	successfulRequests: 0,
	failedRequests: 0,
	timeoutRequests: 0,
	avgResponseTime: 0,
	responseTimes: [] as number[]
};

function updateNetworkStats(duration: number, success: boolean, timeout: boolean = false) {
	networkStats.totalRequests++;
	networkStats.responseTimes.push(duration);
	
	// Keep only last 50 response times for rolling average
	if (networkStats.responseTimes.length > 50) {
		networkStats.responseTimes.shift();
	}
	
	networkStats.avgResponseTime = Math.round(
		networkStats.responseTimes.reduce((sum, time) => sum + time, 0) / networkStats.responseTimes.length
	);
	
	if (timeout) {
		networkStats.timeoutRequests++;
	} else if (success) {
		networkStats.successfulRequests++;
	} else {
		networkStats.failedRequests++;
	}
	
	// Log stats every 10 requests
	if (networkStats.totalRequests % 10 === 0) {
		const successRate = Math.round((networkStats.successfulRequests / networkStats.totalRequests) * 100);
		const timeoutRate = Math.round((networkStats.timeoutRequests / networkStats.totalRequests) * 100);
		
		console.log(`📊 Network Stats: ${networkStats.totalRequests} requests, ${successRate}% success, ${timeoutRate}% timeout, avg ${networkStats.avgResponseTime}ms`);
	}
}

// Function to get current network performance
export function getNetworkStats() {
	return { ...networkStats };
}

// Function to reset network stats
export function resetNetworkStats() {
	networkStats = {
		totalRequests: 0,
		successfulRequests: 0,
		failedRequests: 0,
		timeoutRequests: 0,
		avgResponseTime: 0,
		responseTimes: []
	};
	console.log('🔄 Network stats reset');
}

// OPTIMIZED fetch dengan request queue untuk mengurangi load
const cache = new Map<string, { data: any; timestamp: number; expiry: number }>();
const CACHE_DURATION = 60000; // 1 menit cache untuk mengurangi request
const MAX_CONCURRENT_REQUESTS = 3; // Maksimal 3 request bersamaan
const REQUEST_DELAY = 200; // 200ms delay antar request

// Request queue untuk mengontrol concurrent requests
let activeRequests = 0;
const requestQueue: Array<() => Promise<any>> = [];

// Process request queue
async function processRequestQueue() {
	if (activeRequests >= MAX_CONCURRENT_REQUESTS || requestQueue.length === 0) {
		return;
	}
	
	const request = requestQueue.shift();
	if (request) {
		activeRequests++;
		try {
			await request();
		} finally {
			activeRequests--;
			// Small delay before processing next request
			setTimeout(() => processRequestQueue(), REQUEST_DELAY);
		}
	}
}

// Enhanced fetchWithAuth dengan request queue dan timeout adaptif
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
	const startTime = performance.now();
	console.log(`🚀 Queuing: ${url}`);
	
	// Check cache first
	const cacheKey = `${url}_${JSON.stringify(options)}`;
	const cached = cache.get(cacheKey);
	const now = Date.now();
	
	if (cached && now < cached.expiry) {
		const duration = Math.round(performance.now() - startTime);
		console.log(`🎯 Cache hit: ${url} (${duration}ms)`);
		updateNetworkStats(duration, true, false);
		return cached.data;
	}
	
	const accessToken = getStoredAccessToken();
	if (!accessToken) {
		throw new Error('Access token not available. Please login first.');
	}

	// Container yang sering down/maintenance menurut tim backend
	const problematicContainers = ['evbackup', 'systemapp', 'evrestore'];
	const isProblematicContainer = problematicContainers.some(container => url.includes(container));
	const timeoutDuration = isProblematicContainer ? 3000 : 5000; // 3 detik untuk container bermasalah

	// Create queued request
	return new Promise((resolve, reject) => {
		const queuedRequest = async () => {
			try {
				console.log(`📡 Executing: ${url} (timeout: ${timeoutDuration}ms)`);
				
				// Timeout dengan AbortController - adaptif berdasarkan container
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
				
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`,
					'Accept': 'application/json',
					'Cache-Control': 'no-cache',
					...options.headers,
				};

				const response = await fetch(url, {
					...options,
					headers,
					signal: controller.signal
				});

				clearTimeout(timeoutId);
				
				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				const duration = Math.round(performance.now() - startTime);
				
				// Cache successful response
				cache.set(cacheKey, {
					data,
					timestamp: now,
					expiry: now + CACHE_DURATION
				});
				
				// Update network stats
				updateNetworkStats(duration, true, false);
				
				console.log(`✅ Success ${url} (${duration}ms)`);
				resolve(data);
				
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				
				if (error instanceof Error && error.name === 'AbortError') {
					console.log(`⏰ Expected timeout ${url} (${duration}ms) - Container likely offline`);
					updateNetworkStats(duration, false, true);
				} else {
					console.error(`❌ Error ${url} (${duration}ms):`, error);
					updateNetworkStats(duration, false, false);
				}
				
				reject(error);
			}
		};
		
		// Add to queue
		requestQueue.push(queuedRequest);
		processRequestQueue();
	});
}

// Cache cleanup function
function cleanupCache() {
	const now = Date.now();
	for (const [key, value] of cache.entries()) {
		if (now >= value.expiry) {
			cache.delete(key);
		}
	}
}

// Clear request queue function
export function clearRequestQueue() {
	requestQueue.length = 0;
	activeRequests = 0;
	console.log('🧹 Request queue cleared');
}

// Cleanup cache every 5 minutes
setInterval(cleanupCache, 5 * 60 * 1000);

// Container API Response interface
interface ContainerApiResponse {
	kafkaStatus?: string;
	status?: string;
	details?: {
		kafka?: {
			status?: string;
			lastConnected?: string | null;
		};
		container?: {
			name?: string;
			version?: string;
			port?: string;
		};
	};
	timestamp?: string;
	responseTime?: number;
	authRequired?: boolean;
	error?: number;
	message?: any;
	[key: string]: any;
}

// OPTIMIZED Hook dengan sequential fetching
export function useContainerStatus() {
	const [data, setData] = useState<ContainerStatus[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContainerStatus = useCallback(async () => {
		const accessToken = getStoredAccessToken();
		if (!accessToken) {
			setError('Access token not available. Please login first.');
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			console.log('🔍 Starting sequential container status fetch...');
			const overallStartTime = performance.now();
			
			// SEMUA 18 endpoints dari tim backend
			const endpoints = [
				'/gps/api/v4/gps02/containerstatus/baseappinterface',
				'/gps/api/v4/gps02/containerstatus/terminalgateway',
				'/gps/api/v4/gps02/containerstatus/displayevapp',
				'/gps/api/v4/gps02/containerstatus/evlockapp',
				'/gps/api/v4/gps02/containerstatus/evbackup',
				'/gps/api/v4/gps02/containerstatus/evrestore',
				'/gps/api/v4/gps02/containerstatus/searchapp',
				'/gps/api/v4/gps02/containerstatus/evstatistic',
				'/gps/api/v4/gps02/containerstatus/producer',
				'/gps/api/v4/gps02/containerstatus/consumer',
				'/gps/api/v4/gps02/containerstatus/apiquery',
				'/gps/api/v4/gps02/containerstatus/cqrsgateway',
				'/gps/api/v4/gps02/containerstatus/evrestgateway',
				'/gps/api/v4/gps02/containerstatus/evrestgatewayaes',
				'/gps/api/v4/gps02/containerstatus/systemapp',
				'/gps/api/v4/gps02/containerstatus/evvehiclereport',
				'/gps/api/v4/gps02/containerstatus/nearme',
				'/gps/api/v4/gps02/containerstatus/evsseapp'
			];

			// Container yang seharusnya memiliki kafka connection menurut backend
			const kafkaEnabledContainers = ['evlockapp', 'consumer', 'evvehiclereport', 'nearme', 'evsseapp'];
			
			console.log(`📡 Fetching ${endpoints.length} endpoints with request queue...`);
			
			// Use Promise.allSettled but with our queued fetchWithAuth (controlled concurrency)
			const results = await Promise.allSettled(
				endpoints.map(async (endpoint) => {
					const containerName = endpoint.split('/').pop() || 'unknown';
					const isKafkaEnabled = kafkaEnabledContainers.includes(containerName);
					
					try {
						const result = await fetchWithAuth(`${BASE_URL}${endpoint}`);
						return processContainerResult(result, containerName, isKafkaEnabled);
						
					} catch (error) {
						console.error(`❌ Failed ${endpoint}:`, error);
						return createFailedContainer(containerName, error);
					}
				})
			);
			
			const overallEndTime = performance.now();
			const totalDuration = Math.round(overallEndTime - overallStartTime);
			
			// Extract successful results
			const allContainers: ContainerStatus[] = [];
			results.forEach((result) => {
				if (result.status === 'fulfilled') {
					allContainers.push(result.value);
				} else {
					console.error('Promise rejected:', result.reason);
					allContainers.push(createFailedContainer('unknown', result.reason));
				}
			});
			
			console.log(`🎉 All containers fetched in ${totalDuration}ms`);
			console.log(`📊 Performance: ${allContainers.length} containers`);
			
			setData(allContainers);
			
		} catch (error) {
			console.error('💥 Error fetching container status:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, []);

	// Auto fetch on mount
	useEffect(() => {
		fetchContainerStatus();
	}, [fetchContainerStatus]);

	return {
		data,
		loading,
		error,
		refetch: fetchContainerStatus
	};
}

// Helper function to process container result
function processContainerResult(result: any, containerName: string, isKafkaEnabled: boolean): ContainerStatus {
	let status = 'unknown';
	let kafkaStatus = 'unconnected';
	
	// Define containers that can have "connected" status
	const connectedContainers = ['ev lock', 'consumer', 'ev vehicle report', 'nearme', 'ev sse app'];
	const canBeConnected = connectedContainers.some(name => 
		containerName.toLowerCase().includes(name.toLowerCase())
	);
	
	if (result.message) {
		// Extract kafka status from response body fields
		let extractedKafkaStatus = '';
		
		// Priority 1: Check kafkaStatus field
		if (result.message.kafkaStatus) {
			extractedKafkaStatus = result.message.kafkaStatus.toLowerCase();
		}
		// Priority 2: Check details.kafka.status field
		else if (result.message.details && result.message.details.kafka && result.message.details.kafka.status) {
			extractedKafkaStatus = result.message.details.kafka.status.toLowerCase();
		}
		// Priority 3: Check kafkaConnection array untuk backward compatibility
		else if (result.message.kafkaConnection && Array.isArray(result.message.kafkaConnection)) {
			const connectedCount = result.message.kafkaConnection.filter((conn: any) => 
				conn.status === 'connected' || conn.state === 'connected'
			).length;
			
			if (connectedCount > 0) {
				extractedKafkaStatus = 'connected';
			} else {
				extractedKafkaStatus = 'disconnected';
			}
		}
		
		// Map kafka status based on extracted value and container type
		if (extractedKafkaStatus) {
			if (extractedKafkaStatus.includes('connected') && canBeConnected) {
				kafkaStatus = 'connected';
				status = 'connected';
			} else if (extractedKafkaStatus.includes('disconnected')) {
				kafkaStatus = 'disconnected';
				status = result.message.status || 'ok';
			} else if (extractedKafkaStatus.includes('error') || extractedKafkaStatus.includes('failed')) {
				kafkaStatus = 'error';
				status = result.message.status || 'failed';
			} else {
				kafkaStatus = 'unconnected';
				status = result.message.status || 'ok';
			}
		} else if (isKafkaEnabled) {
			// Kafka enabled but no kafka status fields found
			status = result.message.status || 'ok';
			kafkaStatus = 'unconnected';
		} else {
			// Non-kafka containers
			status = result.message.status || (result.error === 0 ? 'ok' : 'unknown');
			kafkaStatus = 'unconnected';
		}
	} else if (result.error === 0) {
		status = 'ok';
		kafkaStatus = isKafkaEnabled ? 'unconnected' : 'unconnected';
	}
	
	return {
		id: containerName,
		imageName: 'microservice',
		containerName: containerName,
		status: mapStatus(status),
		kafkaConnection: mapKafkaConnection(kafkaStatus),
		version: result.message?.version || '1.0.0',
		containerStatus: status,
		lastActivity: new Date().toISOString(),
		lastHeartbeat: new Date().toISOString(),
		activityLogs: [],
		totalLogs: 0,
		port: result.message?.port || '8080',
		responseBody: result
	};
}

// Helper function to create failed container
function createFailedContainer(containerName: string, error: any): ContainerStatus {
	return {
		id: containerName,
		imageName: 'microservice',
		containerName: containerName,
		status: 'failed' as const,
		kafkaConnection: 'error' as const,
		version: '1.0.0',
		containerStatus: 'failed',
		lastActivity: new Date().toISOString(),
		lastHeartbeat: new Date().toISOString(),
		activityLogs: [],
		totalLogs: 0,
		port: '8080',
		responseBody: { error: error instanceof Error ? error.message : String(error) }
	};
}

// Helper function to map status values
function mapStatus(status: string): 'ok' | 'failed' | 'unknown' | 'request timeout' | 'connected' {
	const normalizedStatus = status.toLowerCase();
	if (normalizedStatus.includes('healthy') || normalizedStatus.includes('running') || normalizedStatus === 'ok') {
		return 'ok';
	} else if (normalizedStatus.includes('unhealthy') || normalizedStatus.includes('failed') || normalizedStatus.includes('error')) {
		return 'failed';
	} else if (normalizedStatus.includes('timeout')) {
		return 'request timeout';
	} else if (normalizedStatus.includes('connected')) {
		return 'connected';
	}
	return 'unknown';
}

// Helper function to map kafka connection status
function mapKafkaConnection(status: string): 'connected' | 'unconnected' | 'disconnected' | 'error' | '' {
	const normalizedStatus = status.toLowerCase();
	if (normalizedStatus.includes('connected') || normalizedStatus === 'up' || normalizedStatus === 'active') {
		return 'connected';
	} else if (normalizedStatus.includes('disconnected') || normalizedStatus === 'down' || normalizedStatus === 'inactive') {
		return 'disconnected';
	} else if (normalizedStatus.includes('error') || normalizedStatus.includes('failed') || normalizedStatus.includes('timeout')) {
		return 'error';
	} else if (normalizedStatus.includes('unconnected') || normalizedStatus === '' || normalizedStatus === 'unknown') {
		return 'unconnected';
	}
	return 'unconnected'; // Default fallback
}

// SIMPLE Hook untuk mendapatkan detail container individual
export function useContainerDetail(containerName: string) {
	const [data, setData] = useState<ContainerApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchDetail = useCallback(async () => {
		if (!containerName) return;
		
		const accessToken = getStoredAccessToken();
		if (!accessToken) {
			setError('Access token not available. Please login first.');
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			const result = await fetchWithAuth(`${BASE_URL}/microservice/container/${encodeURIComponent(containerName)}`);
			setData(result);
			
		} catch (error) {
			console.error('Error fetching container detail:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, [containerName]);

	useEffect(() => {
		fetchDetail();
	}, [fetchDetail]);

	return {
		data,
		loading,
		error,
		refetch: fetchDetail
	};
}

// SIMPLE Hook untuk refresh data container
export function useRefreshContainerData() {
	const [loading, setLoading] = useState(false);

	const refresh = useCallback(async () => {
		setLoading(true);
		// Trigger re-fetch by dispatching custom event
		window.dispatchEvent(new CustomEvent('refreshContainers'));
		setLoading(false);
		console.log('Container data refresh triggered');
	}, []);

	return {
		refresh,
		loading
	};
}

// SIMPLE Dashboard hooks
export function useActivityLogs() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchLogs = useCallback(async () => {
		const accessToken = getStoredAccessToken();
		if (!accessToken) {
			setError('Access token not available. Please login first.');
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			// Try different endpoints for activity logs
			const endpoints = ['/api/logs', '/api/activity-logs', '/api/activities'];
			
			for (const endpoint of endpoints) {
				try {
					const result = await fetchWithAuth(`${BASE_URL}${endpoint}`);
					if (Array.isArray(result)) {
						setData(result);
						return;
					} else if (result.data && Array.isArray(result.data)) {
						setData(result.data);
						return;
					}
				} catch (error) {
					continue; // Try next endpoint
				}
			}
			
			// If all failed, set empty array
			setData([]);
			
		} catch (error) {
			console.error('Error fetching activity logs:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchLogs();
	}, [fetchLogs]);

	return {
		data,
		loading,
		error,
		refetch: fetchLogs
	};
}

export function useWebhookUrls() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchWebhooks = useCallback(async () => {
		const accessToken = getStoredAccessToken();
		if (!accessToken) {
			setError('Access token not available. Please login first.');
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			// Try different endpoints for webhooks
			const endpoints = ['/api/webhooks', '/api/webhook-urls', '/api/hooks'];
			
			for (const endpoint of endpoints) {
				try {
					const result = await fetchWithAuth(`${BASE_URL}${endpoint}`);
					if (Array.isArray(result)) {
						setData(result);
						return;
					} else if (result.data && Array.isArray(result.data)) {
						setData(result.data);
						return;
					}
				} catch (error) {
					continue; // Try next endpoint
				}
			}
			
			// If all failed, set empty array
			setData([]);
			
		} catch (error) {
			console.error('Error fetching webhook URLs:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchWebhooks();
	}, [fetchWebhooks]);

	return {
		data,
		loading,
		error,
		refetch: fetchWebhooks
	};
}

export function useConsumers() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchConsumers = useCallback(async () => {
		const accessToken = getStoredAccessToken();
		if (!accessToken) {
			setError('Access token not available. Please login first.');
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			
			// Try different endpoints for consumers
			const endpoints = ['/api/consumers', '/api/kafka/consumers', '/api/consumer-groups'];
			
			for (const endpoint of endpoints) {
				try {
					const result = await fetchWithAuth(`${BASE_URL}${endpoint}`);
					if (Array.isArray(result)) {
						setData(result);
						return;
					} else if (result.data && Array.isArray(result.data)) {
						setData(result.data);
						return;
					}
				} catch (error) {
					continue; // Try next endpoint
				}
			}
			
			// If all failed, set empty array
			setData([]);
			
		} catch (error) {
			console.error('Error fetching consumers:', error);
			setError(error instanceof Error ? error.message : 'Unknown error');
			setData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchConsumers();
	}, [fetchConsumers]);

	return {
		data,
		loading,
		error,
		refetch: fetchConsumers
	};
}

// Enhanced Dashboard data with container status tracking
export function useDashboardData() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [containerStatuses, setContainerStatuses] = useState<Record<string, {
		status: 'loading' | 'success' | 'error' | 'timeout' | 'maintenance';
		responseTime?: number;
		errorMessage?: string;
		lastUpdated?: Date;
	}>>({});

	const fetchContainerData = useCallback(async () => {
		setLoading(true);
		setError(null);
		
		try {
			console.log('🎯 Fetching enhanced dashboard data...');
			
			// List of containers to check
			const containerNames = [
				'evnative', 'airflow', 'zookeeper', 'clickhouse', 'kafka', 
				'nats', 'postgres', 'redis', 'kowl', 'evnative-ui',
				'nginx', 'certbot', 'prometheus', 'grafana', 'node-exporter',
				'systemapp', 'evbackup', 'evrestore'
			];
			
			// Initialize container statuses
			const initialStatuses: Record<string, any> = {};
			containerNames.forEach(name => {
				initialStatuses[name] = {
					status: 'loading',
					lastUpdated: new Date()
				};
			});
			setContainerStatuses(initialStatuses);
			
			// Fetch individual container data with enhanced status tracking
			const containerPromises = containerNames.map(async (containerName) => {
				const startTime = performance.now();
				try {
					const containerData = await fetchWithAuth(`${BASE_URL}/api/service/container/${containerName}`);
					const responseTime = performance.now() - startTime;
					
					// Update status to success
					setContainerStatuses(prev => ({
						...prev,
						[containerName]: {
							status: 'success',
							responseTime,
							lastUpdated: new Date()
						}
					}));
					
					return {
						name: containerName,
						data: containerData,
						responseTime,
						status: 'success'
					};
				} catch (err) {
					const responseTime = performance.now() - startTime;
					let status: 'error' | 'timeout' | 'maintenance' = 'error';
					let errorMessage = err instanceof Error ? err.message : 'Unknown error';
					
					// Determine if this is a timeout or maintenance
					const problematicContainers = ['evbackup', 'systemapp', 'evrestore'];
					const isProblematicContainer = problematicContainers.includes(containerName.toLowerCase());
					
					if (err instanceof Error && err.name === 'AbortError') {
						status = isProblematicContainer ? 'maintenance' : 'timeout';
						errorMessage = isProblematicContainer 
							? 'Service under maintenance' 
							: 'Request timeout - service may be slow';
					}
					
					// Update status to error/timeout/maintenance
					setContainerStatuses(prev => ({
						...prev,
						[containerName]: {
							status,
							responseTime,
							errorMessage,
							lastUpdated: new Date()
						}
					}));
					
					console.warn(`Container ${containerName} failed:`, errorMessage);
					return {
						name: containerName,
						error: errorMessage,
						responseTime,
						status
					};
				}
			});
			
			const containerResults = await Promise.all(containerPromises);
			
			// Calculate summary statistics
			const totalContainers = containerNames.length;
			const connectedContainers = containerResults.filter(c => c.status === 'success').length;
			const failedContainers = containerResults.filter(c => c.status === 'error').length;
			const maintenanceContainers = containerResults.filter(c => c.status === 'maintenance').length;
			const timeoutContainers = containerResults.filter(c => c.status === 'timeout').length;
			
			const dashboardData = {
				containers: containerResults,
				totalContainers,
				connectedContainers,
				failedContainers,
				maintenanceContainers,
				timeoutContainers,
				summary: {
					healthy: connectedContainers,
					failed: failedContainers,
					maintenance: maintenanceContainers,
					timeout: timeoutContainers
				}
			};
			
			setData(dashboardData);
			console.log('✅ Enhanced dashboard data loaded successfully');
			
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
			setError(errorMessage);
			console.error('❌ Dashboard data fetch failed:', errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	const refetch = useCallback(() => {
		return fetchContainerData();
	}, [fetchContainerData]);

	useEffect(() => {
		fetchContainerData();
	}, [fetchContainerData]);

	return { 
		data, 
		loading, 
		error, 
		refetch,
		containerStatuses
	};
}

// SIMPLE Refresh dashboard data
export function useRefreshDashboardData() {
	const [loading, setLoading] = useState(false);

	const refresh = useCallback(async () => {
		setLoading(true);
		// Trigger re-fetch by dispatching custom event
		window.dispatchEvent(new CustomEvent('refreshDashboard'));
		setLoading(false);
		console.log('Dashboard data refresh triggered');
	}, []);

	return {
		refresh,
		loading
	};
}

// SIMPLE API connection test
export function useTestApiConnection() {
	const [testing, setTesting] = useState(false);
	const [result, setResult] = useState<any>(null);

	const testConnection = useCallback(async () => {
		setTesting(true);
		setResult(null);

		try {
			const accessToken = getStoredAccessToken();
			if (!accessToken) {
				setResult({ error: 'No access token available', hasToken: false });
				return;
			}

			// Test a simple endpoint
			const testUrl = `${BASE_URL}/gps/api/v4/gps02/containerstatus/systemapp`;
			await fetchWithAuth(testUrl);
			
			setResult({
				success: true,
				message: 'API connection successful',
				hasToken: true,
				testedEndpoint: testUrl
			});

		} catch (error) {
			setResult({
				error: error instanceof Error ? error.message : 'Test failed',
				hasToken: !!getStoredAccessToken()
			});
		} finally {
			setTesting(false);
		}
	}, []);

	return {
		testConnection,
		testing,
		result
	};
}

// Export auth functions for external use
export { getAccessToken, setAccessToken, getStoredAccessToken };
