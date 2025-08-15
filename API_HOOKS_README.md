# API Hooks Documentation

Dokumentasi untuk penggunaan API hooks yang telah diupdate tanpa mock data.

## Overview

API hooks telah diupdate untuk menggunakan **API real sepenuhnya** tanpa mock data. Semua data berasal dari backend asli dengan autentikasi Keycloak.

## Authentication

### 1. Login dengan Username/Password

```typescript
import { useAuth } from '@/hooks/useApi';

function LoginComponent() {
  const auth = useAuth();
  
  const handleLogin = async () => {
    try {
      await auth.login('your-email@polytron.co.id', 'your-password');
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {!auth.isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <p>Authenticated!</p>
      )}
    </div>
  );
}
```

### 2. Set Token Manual

```typescript
import { useAuth } from '@/hooks/useApi';

function TokenSetup() {
  const auth = useAuth();
  
  const handleSetToken = () => {
    const token = 'your-jwt-token-here';
    auth.setToken(token);
  };

  return <button onClick={handleSetToken}>Set Token</button>;
}
```

### 3. Menggunakan Helper Hook

```typescript
import { useApiAuthForm, EXAMPLE_TOKEN } from '@/hooks/useApiAuth';

function AuthForm() {
  const authForm = useApiAuthForm();

  return (
    <div>
      {authForm.showForm && (
        <div>
          <input 
            value={authForm.username}
            onChange={(e) => authForm.setUsername(e.target.value)}
            placeholder="Email"
          />
          <input 
            type="password"
            value={authForm.password}
            onChange={(e) => authForm.setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={authForm.handleLogin}>Login</button>
          
          {/* Quick token set untuk testing */}
          <button onClick={() => authForm.handleSetToken(EXAMPLE_TOKEN)}>
            Use Example Token
          </button>
        </div>
      )}
    </div>
  );
}
```

## Data Hooks

### Container Status

```typescript
import { useContainerStatus, useContainerDetail } from '@/hooks/useApi';

function ContainerManager() {
  const { data: containers, loading, error, refetch } = useContainerStatus();
  const { data: detail } = useContainerDetail('consumer');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {containers?.map(container => (
        <div key={container.id}>
          {container.containerName}: {container.status}
        </div>
      ))}
    </div>
  );
}
```

### Dashboard Data

```typescript
import { useDashboardData, useActivityLogs, useWebhookUrls, useConsumers } from '@/hooks/useApi';

function Dashboard() {
  const { data: dashboardData, loading } = useDashboardData();
  const { data: logs } = useActivityLogs();
  const { data: webhooks } = useWebhookUrls();
  const { data: consumers } = useConsumers();

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Containers: {dashboardData?.totalContainers}</p>
      <p>Activity Logs: {logs?.length}</p>
      <p>Webhook URLs: {webhooks?.length}</p>
      <p>Consumers: {consumers?.length}</p>
    </div>
  );
}
```

## API Endpoints

### Base Configuration

```
Base URL: https://dev-be-udms-pmcp-evsoft.polytron.local
```

### Authentication Endpoint

```
POST https://dev-ppsso.polytronev.id/realms/pmcp/protocol/openid-connect/token
```

### Data Endpoints

1. **Container Status**: `/gps/api/v4/gps02/containerstatus/{containerName}`
2. **Activity Logs**: `/api/webhook-notification/activity`
3. **Webhook URLs**: `/api/webhook-notification/webhookurl`
4. **Consumers**: `/api/webhook-notification/consumers`

## Error Handling

Semua hooks mengembalikan `error` state yang dapat digunakan untuk handling error:

```typescript
const { data, loading, error } = useContainerStatus();

if (error) {
  // Handle error - bisa karena:
  // - Token expired
  // - Network error  
  // - API server down
  // - Invalid credentials
  console.error('API Error:', error);
}
```

## Testing

Gunakan `useTestApiConnection` untuk testing konektivitas:

```typescript
import { useTestApiConnection } from '@/hooks/useApi';

function ApiTester() {
  const { testConnection, testing, result } = useTestApiConnection();

  return (
    <div>
      <button onClick={testConnection} disabled={testing}>
        {testing ? 'Testing...' : 'Test API'}
      </button>
      
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
```

## Manual cURL untuk Token

Jika perlu mendapatkan token manual:

```bash
curl -X POST \
https://dev-ppsso.polytronev.id/realms/pmcp/protocol/openid-connect/token \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=password" \
-d "client_id=be-ppsso-pmcp-rest-api" \
-d "client_secret=75ta3DN2Yf25u41bcg7eRQ0Sq4joE2x4" \
-d "username=your-email@polytron.co.id" \
-d "password=your-password"
```

## Migration Notes

- ✅ **Semua mock data dihapus**
- ✅ **Hanya menggunakan API real**
- ✅ **Authentication wajib untuk semua request**
- ✅ **Error handling untuk token tidak valid**
- ✅ **Keycloak integration complete**

## Container Names

18 containers yang didukung:
- baseappinterface
- ev-lock  
- consumer
- ev-vehicle-report
- nearme
- ev-sse-app
- ev-statistic
- ev-rest-gateway
- display-ev
- cqrs-gateway
- producer
- api-query
- search-app
- system-app
- terminal-gateway
- ev-backup
- ev-restore
- ev-rest-gateway-aes
