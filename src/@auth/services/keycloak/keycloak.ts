import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL as string,
    realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT as string,
};

// Debug log untuk melihat konfigurasi
console.log('Keycloak Config:', {
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
});

const keycloak = new Keycloak(keycloakConfig);

export const setupTokenRefreshHandler = (kc: Keycloak): void => {
    kc.onTokenExpired = () => {
        console.log('Token expired, trying to update...');
        kc.updateToken(300)
            .then((refreshed) => {
                if (refreshed) {
                    console.log('Token was refreshed');
                    localStorage.setItem('accessToken', kc.token ?? '');
                    localStorage.setItem('refreshToken', kc.refreshToken ?? '');
                }
            })
            .catch((error) => {
                console.error('Failed to refresh token:', error);
                kc.logout();
            });
    };
};

export default keycloak;