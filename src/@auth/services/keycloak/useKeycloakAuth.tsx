import { useContext } from 'react';
import KeycloakAuthContext from './KeycloakAuthContext';

export const useKeycloakAuth = () => {
	const context = useContext(KeycloakAuthContext);

	if (context === undefined) {
		throw new Error('useKeycloakAuth must be used within a KeycloakAuthProvider');
	}

	return context;
};

export default useKeycloakAuth;
