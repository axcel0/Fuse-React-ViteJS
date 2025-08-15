import {
	Card,
	CardContent,
	Box,
	Skeleton,
	Stack
} from '@mui/material';

export default function ContainerStatsSkeleton() {
	const skeletonCards = Array.from({ length: 4 }, (_, index) => (
		<Card
			key={index}
			sx={{
				background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255,255,255,0.1)',
				borderRadius: 3,
				transition: 'all 0.3s ease',
				height: '120px'
			}}
		>
			<CardContent sx={{ p: 3 }}>
				<Stack direction="row" alignItems="center" spacing={2}>
					{/* Icon Skeleton */}
					<Box
						sx={{
							width: 56,
							height: 56,
							borderRadius: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Skeleton 
							variant="circular" 
							width={40} 
							height={40}
							sx={{ 
								bgcolor: 'rgba(255,255,255,0.1)',
								transform: 'none'
							}}
						/>
					</Box>

					{/* Content Skeleton */}
					<Box sx={{ flex: 1 }}>
						<Skeleton 
							variant="text" 
							width="60%"
							height={20}
							sx={{ 
								bgcolor: 'rgba(255,255,255,0.1)',
								mb: 1,
								transform: 'none'
							}}
						/>
						<Skeleton 
							variant="text" 
							width="40%"
							height={32}
							sx={{ 
								bgcolor: 'rgba(255,255,255,0.15)',
								transform: 'none'
							}}
						/>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	));

	return (
		<Box sx={{ mb: 3 }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr)',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(4, 1fr)'
					},
					gap: 2
				}}
			>
				{skeletonCards}
			</Box>
		</Box>
	);
}
