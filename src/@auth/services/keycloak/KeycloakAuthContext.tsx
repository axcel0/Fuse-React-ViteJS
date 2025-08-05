import { createContext } from 'react';
import { FuseAuthProviderState } from '@fuse/core/FuseAuthProvider/types/FuseAuthTypes';
import { User } from '@auth/user';
import { PartialDeep } from 'type-fest';

export type KeycloakAuthContextType = FuseAuthProviderState<User> & {
	updateUser: (newUser: PartialDeep<User>) => Promise<Response>;
	signOut: () => void;
};

const defaultAuthContext: KeycloakAuthContextType = {
	authStatus: 'configuring',
	isAuthenticated: false,
	user: null,
	updateUser: async () => new Response(),
	signOut: () => {},
};

const KeycloakAuthContext = createContext<KeycloakAuthContextType>(defaultAuthContext);

export default KeycloakAuthContext;
