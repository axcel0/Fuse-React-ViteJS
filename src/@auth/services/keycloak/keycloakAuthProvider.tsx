import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { PartialDeep } from 'type-fest';
import {
    FuseAuthProviderComponentProps,
    FuseAuthProviderState,
    FuseAuthProviderMethods,
} from '@fuse/core/FuseAuthProvider/types/FuseAuthTypes';
import keycloak, { setupTokenRefreshHandler } from './keycloak';
import { User } from '@auth/user';
import KeycloakAuthContext, { KeycloakAuthContextType } from './KeycloakAuthContext';

let keycloakInitialized = false;

const KeycloakAuthProvider = forwardRef<FuseAuthProviderMethods, FuseAuthProviderComponentProps>(
    ({ onAuthStateChanged, children }, ref) => {
        const [authState, setAuthState] = useState<FuseAuthProviderState<User>>({
            authStatus: 'configuring',
            isAuthenticated: false,
            user: null,
        });

        const clearAuthStorage = () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('fuseReactAuthProvider');
        };

        useImperativeHandle(ref, () => ({
            updateUser: async (newUser: PartialDeep<User>) => {
                const updatedUser = { ...authState.user, ...newUser } as User;
                const newState = { ...authState, user: updatedUser };
                setAuthState(newState);
                onAuthStateChanged?.(newState);
                return new Response();
            },
            signOut: () => {
                keycloak.logout();
                clearAuthStorage();
                const newState: FuseAuthProviderState<User> = {
                    authStatus: 'unauthenticated',
                    isAuthenticated: false,
                    user: null,
                };
                setAuthState(newState);
                onAuthStateChanged?.(newState);
            },
        }), [authState, onAuthStateChanged]);

        const extractUserFromKeycloak = (): User => {
            const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT as string;
            const tokenParsed = keycloak.tokenParsed!;
            const resourceRoles: string[] = tokenParsed.resource_access?.[clientId]?.roles || [];
            
            // Debug log untuk melihat user dan role data
            console.log('Keycloak Token Data:', {
                clientId,
                tokenParsed,
                resourceRoles,
                realmRoles: tokenParsed.realm_access?.roles || []
            });
            
            return {
                id: tokenParsed.sub!,
                displayName: tokenParsed.name || tokenParsed.preferred_username,
                email: tokenParsed.email!,
                role: resourceRoles.length > 0 ? resourceRoles : ['user'], // fallback ke 'user' jika tidak ada role
            };
        };

        const updateAuthState = (isAuthenticated: boolean, user: User | null) => {
            const newState: FuseAuthProviderState<User> = {
                authStatus: isAuthenticated ? 'authenticated' : 'unauthenticated',
                isAuthenticated,
                user,
            };
            setAuthState(newState);
            onAuthStateChanged?.(newState);
        };

        const attemptKeycloakInit = async (): Promise<boolean> => {
            if (keycloakInitialized) {
                return keycloak.authenticated || (await keycloak.updateToken(30).catch(() => false));
            }
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'login-required',
                    pkceMethod: 'S256',
                    checkLoginIframe: true,
                    checkLoginIframeInterval: isNaN(Number(import.meta.env.VITE_KEYCLOAK_REFRESH))
                        ? 1800
                        : Number(import.meta.env.VITE_KEYCLOAK_REFRESH),
                });
                keycloakInitialized = true;
                return authenticated;
            } catch (error) {
                console.error('Keycloak initialization failed:', error);
                return false;
            }
        };

        useEffect(() => {
            const authenticate = async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    const provider = localStorage.getItem('fuseReactAuthProvider');
                    if (accessToken && provider === 'keycloak' && !keycloakInitialized) {
                        keycloak.token = accessToken;
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (refreshToken) keycloak.refreshToken = refreshToken;
                    }
                    const authenticated = await attemptKeycloakInit();
                    if (authenticated) {
                        try {
                            const user = extractUserFromKeycloak();
                            localStorage.setItem('accessToken', keycloak.token ?? '');
                            localStorage.setItem('refreshToken', keycloak.refreshToken ?? '');
                            localStorage.setItem('fuseReactAuthProvider', 'keycloak');
                            setupTokenRefreshHandler(keycloak);
                            updateAuthState(true, user);
                        } catch (profileError) {
                            console.error('Failed to load user profile:', profileError);
                            updateAuthState(false, null);
                        }
                    } else {
                        updateAuthState(false, null);
                    }
                } catch (error) {
                    console.error('Authentication failed:', error);
                    updateAuthState(false, null);
                }
            };
            authenticate();
        }, [onAuthStateChanged]);

        const contextValue: KeycloakAuthContextType = {
            ...authState,
            updateUser: async (newUser: PartialDeep<User>) => {
                const updatedUser = { ...authState.user, ...newUser } as User;
                const newState = { ...authState, user: updatedUser };
                setAuthState(newState);
                onAuthStateChanged?.(newState);
                return new Response();
            },
            signOut: () => {
                keycloak.logout();
                clearAuthStorage();
                const newState: FuseAuthProviderState<User> = {
                    authStatus: 'unauthenticated',
                    isAuthenticated: false,
                    user: null,
                };
                setAuthState(newState);
                onAuthStateChanged?.(newState);
            },
        };

        return (
            <KeycloakAuthContext.Provider value={contextValue}>
                {children}
            </KeycloakAuthContext.Provider>
        );
    }
);

export default KeycloakAuthProvider;