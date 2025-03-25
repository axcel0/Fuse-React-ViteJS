import { setupWorker } from 'msw/browser';
import authApi from './api/authApi';
import productApi from '@mock-utils/api/productApi';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...[...authApi, ...productApi]);
