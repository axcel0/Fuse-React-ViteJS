import FuseUtils from '@fuse/utils/FuseUtils';
import customerResponseJson from '../customer/customer.json';
import companyResponseJson from './company.json';

class CustomerDetailService extends FuseUtils.EventEmitter {
	// get task by id
	getCustomerById = (params: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			const customer = customerResponseJson.data.content.find((data) => data.id === Number(params.customerId));

			if (customer) {
				resolve({ data: customer });
			} else {
				reject(new Error(`Customer with ID ${params.customerId} not found`));
			}
		});
	};

	// get company
	getCompany = (params: any) => {
		return new Promise((resolve, reject) => {
			resolve(companyResponseJson);
			//   axios get request ...
		});
	};

	// ...
}

const instance = new CustomerDetailService();

export default instance;
