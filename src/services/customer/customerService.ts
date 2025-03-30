import FuseUtils from '@fuse/utils/FuseUtils';
import customerResponseJson from './customer.json';
import axios from 'axios';
import { date } from 'zod';
const MOCK_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

class CustomerService extends FuseUtils.EventEmitter {
	getCustomer = async (params: any) => {
		try {
			const customer = await axios.get(MOCK_URL);
			return customer.data; // Return only the data part of the response
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; // Rethrow the error to be handled by the caller
		}
	};

	// add new customer
	addNewCustomer = async (body: any) => {
		try {
			const {data} = await axios.post(MOCK_URL, body.data);
			return data; // Return only the data part of the response
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; // Rethrow the error to be handled by the caller
		}
	};

	// delete customer by id
	deleteCustomer = async (params: any) => {
		try {
			const {data} = await axios.delete(`${MOCK_URL}/${params.customerId}`);
			return data; // Return only the data part of the response
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; // Rethrow the error to be handled by the caller
		}
	};

	// update customer by id
	updateCustomer = async (params: any) => {
		try {
			const {data} = await axios.put(`${MOCK_URL}/${params.customerId}`, params.customer);
			// console.log(data)
			return data; // Return only the data part of the response
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; // Rethrow the error to be handled by the caller
		}
	};

	searchCustomerByName = async (params: any) => {
		try {
			const {data} = await axios.get(`${MOCK_URL}?name=${params.customerName}`);
			// console.log(data)
			return data; // Return only the data part of the response
		} catch (error) {
			console.error('Error fetching customer:', error);
			throw error; // Rethrow the error to be handled by the caller
		}
	};
}

const instance = new CustomerService();

export default instance;
