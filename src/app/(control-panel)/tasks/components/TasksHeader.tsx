import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Tab, Tabs, Typography } from '@mui/material';

function TasksHeader(props) {
  const { tabValue, handleTabChange, setRightSidebarOpen } = props;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start space-y-16 sm:space-y-0 p-24 sm:p-6 w-full border-b-1 justify-between">
        <div className="flex flex-col">
        <Typography fontSize={22} fontWeight={700}>  
            Tasks
          </Typography>
          <Typography
            className="text-14"
            color="text.secondary"
          >
            4 Remaining Tasks 
          </Typography>
        </div>

        <div className="flex items-center -mx-8">
          <Button
            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="secondary"
            onClick={() => setRightSidebarOpen(true)}
          >
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
            <span className="mx-4">Tasks</span>
          </Button>
        </div>
      </div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons={false}
        classes={{ root: 'w-full h-10 border-b-1' }}
      >
        <Tab className="h-10" label="Open"/>
        <Tab className="h-10" label="Completed"/>
      </Tabs>
    </div>
  );
}

export default TasksHeader;
