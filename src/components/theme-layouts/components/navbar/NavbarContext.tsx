import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarState {
  open: boolean;
  mobileOpen: boolean;
  foldedOpen: boolean;
}

interface NavbarContextType {
  navbar: NavbarState;
  navbarToggle: () => void;
  navbarToggleMobile: () => void;
  navbarCloseMobile: () => void;
  navbarCloseFolded: () => void;
  navbarOpenFolded: () => void;
  resetNavbar: () => void;
}

const defaultNavbarState: NavbarState = {
  open: true,
  mobileOpen: false,
  foldedOpen: false
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navbar, setNavbar] = useState<NavbarState>(defaultNavbarState);

  const navbarToggle = () => {
    setNavbar(prev => ({ ...prev, open: !prev.open }));
  };

  const navbarToggleMobile = () => {
    setNavbar(prev => ({ ...prev, mobileOpen: !prev.mobileOpen }));
  };

  const navbarCloseMobile = () => {
    setNavbar(prev => ({ ...prev, mobileOpen: false }));
  };

  const navbarCloseFolded = () => {
    setNavbar(prev => ({ ...prev, foldedOpen: false }));
  };

  const navbarOpenFolded = () => {
    setNavbar(prev => ({ ...prev, foldedOpen: true }));
  };

  const resetNavbar = () => {
    setNavbar(defaultNavbarState);
  };

  return (
    <NavbarContext.Provider 
      value={{ 
        navbar, 
        navbarToggle, 
        navbarToggleMobile, 
        navbarCloseMobile,
        navbarCloseFolded,
        navbarOpenFolded,
        resetNavbar 
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within NavbarProvider');
  }
  return context;
};

// Legacy compatibility selector for components that haven't been migrated yet
export const selectFuseNavbar = (state: any) => {
  // This will be replaced by the useNavbar hook in components
  return defaultNavbarState;
};
