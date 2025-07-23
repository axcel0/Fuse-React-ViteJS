import React, { createContext, useContext, useState, ReactElement, ReactNode } from 'react';

interface DialogState {
  open: boolean;
  children: ReactElement | string;
}

interface DialogContextType {
  dialogState: DialogState;
  openDialog: (children: ReactElement | string) => void;
  closeDialog: () => void;
}

const FuseDialogContext = createContext<DialogContextType | undefined>(undefined);

export const FuseDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    children: ''
  });

  const openDialog = (children: ReactElement | string) => {
    setDialogState({ open: true, children });
  };

  const closeDialog = () => {
    setDialogState({ open: false, children: '' });
  };

  return (
    <FuseDialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
    </FuseDialogContext.Provider>
  );
};

export const useFuseDialog = () => {
  const context = useContext(FuseDialogContext);
  if (!context) {
    throw new Error('useFuseDialog must be used within FuseDialogProvider');
  }
  return context;
};

// Legacy exports for backward compatibility
export const selectFuseDialogState = (dialogState: DialogState) => dialogState.open;
export const selectFuseDialogProps = (dialogState: DialogState) => dialogState;
