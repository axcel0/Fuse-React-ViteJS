import { createContext, useContext, useState, ReactNode } from 'react';

interface PageTitleContextType {
	pageTitle: string;
	setPageTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

interface PageTitleProviderProps {
	children: ReactNode;
}

export function PageTitleProvider({ children }: PageTitleProviderProps) {
	const [pageTitle, setPageTitle] = useState('FUSE REACT');

	return (
		<PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
			{children}
		</PageTitleContext.Provider>
	);
}

export function usePageTitle() {
	const context = useContext(PageTitleContext);
	if (context === undefined) {
		throw new Error('usePageTitle must be used within a PageTitleProvider');
	}
	return context;
}
