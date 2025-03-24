import { setupWorker } from 'msw/browser';
import authApi from './api/authApi';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...[...authApi]);
