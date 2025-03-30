import FuseUtils from '@fuse/utils/FuseUtils';
import companyResponseJson from './company.json';
import axios from 'axios';
const MOCK_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;


class CustomerDetailService extends FuseUtils.EventEmitter {
	// get task by id
	getCustomerById = async (params: any) => {
		try {
			const customer = await axios.get(`${MOCK_URL}/${params.customerId}`);
			return customer.data; 
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; 
		}
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
