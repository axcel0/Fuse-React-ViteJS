import React from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useKeycloakAuth from '@auth/services/keycloak/useKeycloakAuth';
import keycloak from '@auth/services/keycloak/keycloak';

function KeycloakSignInTab() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const { authStatus, isAuthenticated } = useKeycloakAuth();

    const handleLogin = () => {
        keycloak.login();
    };

    if (authStatus === 'configuring') {
        return (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CircularProgress size={40} />
                <Typography variant="body2" color="textSecondary">
                    Initializing authentication...
                </Typography>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Typography variant="h6" color="primary">
                    Already authenticated
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    You are logged in with Keycloak
                </Typography>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="text-center space-y-4">
                <Typography variant="h5" className="font-semibold">
                    Sign in with Polytron SSO
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Use your Polytron account to access the application
                </Typography>
            </div>

            <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleLogin}
                sx={{
                    height: 56,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: isDark 
                        ? 'linear-gradient(135deg, rgb(59 130 246) 0%, rgb(37 99 235) 100%)'
                        : 'linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%)',
                    '&:hover': {
                        background: isDark
                            ? 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(30 64 175) 100%)'
                            : 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(30 64 175) 100%)',
                    },
                }}
            >
                Continue with Polytron SSO
            </Button>

            <div className="text-center">
                <Typography variant="caption" color="textSecondary">
                    By continuing, you'll be redirected to Polytron's secure login page
                </Typography>
            </div>
        </div>
    );
}

export default KeycloakSignInTab;
