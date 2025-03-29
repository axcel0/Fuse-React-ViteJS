import FuseUtils from '@fuse/utils/FuseUtils';
import customerResponseJson from './customer.json';

class CustomerService extends FuseUtils.EventEmitter {
	getCustomer = (params: any) => {
		return new Promise((resolve, reject) => {
			resolve(customerResponseJson);
			//   axios get request ...
		});
	};

	// get task by id
	getCustomerById = (params: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			const customer = customerResponseJson.data.content.find((data) => data.id === Number(params.customerId));

			if (customer) {
				resolve({data: customer});
			} else {
				reject(new Error(`Customer with ID ${params.customerId} not found`));
			}
		});
	};

	// update task by id

	// ...
}

const instance = new CustomerService();

export default instance;
