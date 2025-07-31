import React, { createContext, useContext, useState, ReactElement, ReactNode } from 'react';

type MessageVariant = 'success' | 'error' | 'warning' | 'info';

interface MessageOptions {
	variant: MessageVariant;
	anchorOrigin: {
		vertical: 'top' | 'bottom';
		horizontal: 'left' | 'center' | 'right';
	};
	autoHideDuration: number | null;
	message: ReactElement | string;
}

interface MessageState {
	state: boolean;
	options: MessageOptions;
}

interface MessageContextType {
	messageState: MessageState;
	showMessage: (options: Partial<MessageOptions>) => void;
	hideMessage: () => void;
}

const defaultOptions: MessageOptions = {
	variant: 'info',
	anchorOrigin: { vertical: 'top', horizontal: 'center' },
	autoHideDuration: 2000,
	message: 'Hi'
};

const FuseMessageContext = createContext<MessageContextType | undefined>(undefined);

export const FuseMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [messageState, setMessageState] = useState<MessageState>({
		state: false,
		options: defaultOptions
	});

	const showMessage = (options: Partial<MessageOptions>) => {
		setMessageState({
			state: true,
			options: { ...defaultOptions, ...options }
		});
	};

	const hideMessage = () => {
		setMessageState((prev) => ({ ...prev, state: false }));
	};

	return (
		<FuseMessageContext.Provider value={{ messageState, showMessage, hideMessage }}>
			{children}
		</FuseMessageContext.Provider>
	);
};

export const useFuseMessage = () => {
	const context = useContext(FuseMessageContext);

	if (!context) {
		throw new Error('useFuseMessage must be used within FuseMessageProvider');
	}

	return context;
};

// Legacy exports for backward compatibility
export const selectFuseMessageState = (messageState: MessageState) => messageState.state;
export const selectFuseMessageOptions = (messageState: MessageState) => messageState.options;
