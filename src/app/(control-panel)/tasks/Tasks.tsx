import FusePageSimple from '@fuse/core/FusePageSimple';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import TasksList from './components/TasksList';
import withReducer from '@/store/withReducer';
import reducer from './store/index';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tasks = (props: any) => {
  const pageLayout = useRef(null);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      <Root
        header={<></>}
        content={<TasksList />}
        ref={pageLayout}
        scroll={isMobile ? 'normal' : 'content'}
      />
    </>
  );
}

export default withReducer('tasks', reducer)(Tasks);