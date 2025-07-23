import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuickPanelContextType {
  isOpen: boolean;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
}

const QuickPanelContext = createContext<QuickPanelContextType | undefined>(undefined);

export const QuickPanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(prev => !prev);
  const openPanel = () => setIsOpen(true);
  const closePanel = () => setIsOpen(false);

  return (
    <QuickPanelContext.Provider value={{ isOpen, togglePanel, openPanel, closePanel }}>
      {children}
    </QuickPanelContext.Provider>
  );
};

export const useQuickPanel = () => {
  const context = useContext(QuickPanelContext);
  if (!context) {
    throw new Error('useQuickPanel must be used within QuickPanelProvider');
  }
  return context;
};
