import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { Box } from '@mui/material';

const Tasks = lazy(() => import('./Tasks'));

/**
 * The Example page route.
 */
const TasksRoute: FuseRouteItemType = {
  path: 'tasks',
  element:  <Tasks />
};

export default TasksRoute;
