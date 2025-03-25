import FuseUtils from '@fuse/utils/FuseUtils';
import taskResponseJson from './tasks.json';

class TaskService extends FuseUtils.EventEmitter {
  getTasks = (params: any) => {
    return new Promise((resolve, reject) => {
      resolve(taskResponseJson);
    //   axios get request ...
    });
  };

  // get task by id

  // update task by id

  // ...
}

const instance = new TaskService();

export default instance;
