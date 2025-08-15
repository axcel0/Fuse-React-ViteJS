import {
	Card,
	CardContent,
	Box,
	Skeleton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';

export default function ContainerTableSkeleton() {
	const skeletonRows = Array.from({ length: 8 }, (_, index) => (
		<TableRow key={index}>
			{/* Row Number */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="text" 
					width={30}
					height={20}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Image Name */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="text" 
					width="80%"
					height={20}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Container Name */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="text" 
					width="70%"
					height={20}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Status Chip */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="rounded" 
					width={60}
					height={24}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						borderRadius: 3,
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Version */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="text" 
					width="60%"
					height={20}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Kafka Connection */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="rounded" 
					width={80}
					height={24}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						borderRadius: 3,
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Last Update */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="text" 
					width="90%"
					height={20}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						transform: 'none'
					}}
				/>
			</TableCell>

			{/* Actions */}
			<TableCell sx={{ py: 2 }}>
				<Skeleton 
					variant="rounded" 
					width={80}
					height={32}
					sx={{ 
						bgcolor: 'rgba(0,0,0,0.05)',
						borderRadius: 1,
						transform: 'none'
					}}
				/>
			</TableCell>
		</TableRow>
	));

	return (
		<Card
			sx={{
				background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255,255,255,0.2)',
				borderRadius: 3,
				overflow: 'hidden'
			}}
		>
			<CardContent sx={{ p: 0 }}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
								{['No', 'Image Name', 'Container Name', 'Status', 'Version', 'Kafka', 'Last Update', 'Actions'].map((header, index) => (
									<TableCell key={index} sx={{ py: 2, fontWeight: 600 }}>
										<Skeleton 
											variant="text" 
											width="70%"
											height={16}
											sx={{ 
												bgcolor: 'rgba(0,0,0,0.08)',
												transform: 'none'
											}}
										/>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{skeletonRows}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	);
}
