export interface ActivityLog {
	id: string;
	source: string;
	sourceActor?: string;
	sourceApplication?: string;
	sourceServer?: string;
	consumerGroup: string;
	description: string;
	url: string;
	timeout: number;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	body?: any;
	// Display properties for UI
	action?: string;
	details?: string;
	timestamp?: string;
}

export interface ContainerStatus {
	id: string;
	imageName: string;
	containerName: string;
	status: 'ok' | 'failed' | 'request timeout' | 'unknown' | 'connected';
	// Kafka connection status extracted from kafkaStatus or details.kafka.status fields
	// Only specific containers can have 'connected' status: ev lock, consumer, ev vehicle report, nearme, ev sse app
	kafkaConnection: 'connected' | 'unconnected' | 'disconnected' | 'error' | '';
	version: string;
	containerStatus: string;
	lastActivity: string;
	lastHeartbeat: string;
	activityLogs: ActivityLog[];
	totalLogs: number;
	port?: string;
	responseBody?: {
		// Primary kafka status field from API response
		kafkaStatus?: string;
		// Fallback kafka status field from API response
		details?: {
			kafka?: {
				status?: string;
			};
		};
		// Legacy kafka connection array (for backward compatibility)
		kafkaConnection?: Array<{
			status?: string;
			state?: string;
		}>;
		[key: string]: any;
	};
}

export interface ContainerStats {
	total: number;
	connected: number;
	ok: number;
	failed: number;
}
