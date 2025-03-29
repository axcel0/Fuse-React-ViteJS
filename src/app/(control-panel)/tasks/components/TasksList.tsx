import { Box, List } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import { useEffect, useState } from 'react';
import TaskListItem from './TaskListItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getTasks } from '@/store/slices/taskSlice';
import { useSelector } from 'react-redux';

const TasksList = (props: any) => {
	const dispatch = useDispatch<AppDispatch>();
	const taskStore = useSelector((state: any) => state?.tasks?.tasks);
	const tasks = taskStore?.data || [];
	const loading = taskStore?.loading;

	useEffect(() => {
		dispatch(getTasks());
	}, []);

	if (!tasks || loading) {
		return <FuseLoading></FuseLoading>;
	}

	console.log(taskStore);

	return (
		<Box>
			{tasks?.map((item: any, index: number) => (
				<TaskListItem
					task={item}
					index={index}
					key={item?._id}
				/>
			))}
		</Box>
	);
};

export default TasksList;
