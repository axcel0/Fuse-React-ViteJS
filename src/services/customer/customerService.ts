import FuseUtils from '@fuse/utils/FuseUtils';
import customerResponseJson from './customer.json';
import axios from 'axios';
import { date } from 'zod';
const MOCK_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

class CustomerService extends FuseUtils.EventEmitter {
	getCustomer = async (params: any) => {
		try {
			const customer = await axios.get(MOCK_URL);
			return customer.data;
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error;
		}
	};

	// add new customer
	addNewCustomer = async (body: any) => {
		try {
			const { data } = await axios.post(MOCK_URL, body.data);
			return data;
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error;
		}
	};

	// delete customer by id
	deleteCustomer = async (params: any) => {
		try {
			const { data } = await axios.delete(`${MOCK_URL}/${params.customerId}`);
			return data;
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error;
		}
	};

	// update customer by id
	updateCustomer = async (params: any) => {
		try {
			const { data } = await axios.put(`${MOCK_URL}/${params.customerId}`, params.customer);
			// console.log(data)
			return data;
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error;
		}
	};

	searchCustomerByName = async (params: any) => {
		try {
			const { data } = await axios.get(`${MOCK_URL}?name=${params.customerName}`);
			// console.log(data)
			return data;
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error;
		}
	};
}

const instance = new CustomerService();

export default instance;
