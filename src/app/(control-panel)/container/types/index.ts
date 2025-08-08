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
	kafkaConnection: 'connected' | 'unconnected' | '';
	version: string;
	containerStatus: string;
	lastActivity: string;
	lastHeartbeat: string;
	activityLogs: ActivityLog[];
	totalLogs: number;
	port?: string;
	responseBody?: any;
}

export interface ContainerStats {
	total: number;
	connected: number;
	ok: number;
	failed: number;
}
