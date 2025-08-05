import React, { ReactNode } from 'react';
import KeycloakAuthContext, { KeycloakAuthContextType } from './KeycloakAuthContext';

interface KeycloakAuthProviderWrapperProps {
    children: ReactNode;
    authState: KeycloakAuthContextType;
}

function KeycloakAuthProviderWrapper({ children, authState }: KeycloakAuthProviderWrapperProps) {
    return (
        <KeycloakAuthContext.Provider value={authState}>
            {children}
        </KeycloakAuthContext.Provider>
    );
}

export default KeycloakAuthProviderWrapper;
