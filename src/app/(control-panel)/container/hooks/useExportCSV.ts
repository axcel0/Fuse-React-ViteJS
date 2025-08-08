import { useCallback } from 'react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ContainerStatus } from '../types';

// Constants for CSV export
const CSV_HEADERS = ['no', 'container', 'kafkaConnection', 'version', 'containerStatus'];

export const useExportCSV = () => {
	const downloadCSV = useCallback((data: ContainerStatus[], filename: string = 'container-status') => {
		const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss', { locale: localeId });

		const csvData = data.map((container, index) => [
			(index + 1).toString(),
			container.containerName,
			container.kafkaConnection,
			container.version,
			container.containerStatus
		]);

		const csvContent = [
			CSV_HEADERS.map(header => `"${header}"`).join(','),
			...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `${filename}-${timestamp}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url); // Clean up memory
	}, []);

	return { downloadCSV };
};
