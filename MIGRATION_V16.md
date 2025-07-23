# Fuse React v16.0.0 Migration Guide

## Overview

Fuse React v16.0.0 introduces significant architectural changes, primarily migrating from Redux to TanStack Query for better state management. This guide will help you migrate your existing v14 project to v16.

## ⚠️ Breaking Changes

### 1. State Management: Redux → TanStack Query

**Before (Redux):**
```typescript
// Store slice
const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Component usage
const users = useSelector(state => state.users.users);
const loading = useSelector(state => state.users.loading);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(setLoading(true));
  fetchUsers().then(data => {
    dispatch(setUsers(data));
    dispatch(setLoading(false));
  });
}, []);
```

**After (TanStack Query):**
```typescript
// Custom hook
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => httpClient.get('users').json(),
  });
};

// Component usage
const { data: users, isLoading, error } = useUsers();
```

### 2. Icon System: Hero Icons → Lucide Icons

**Before:**
```typescript
import { UserIcon } from '@heroicons/react/24/outline';

<UserIcon className="w-6 h-6" />
```

**After:**
```typescript
import { User } from 'lucide-react';

<User className="w-6 h-6" />
```

### 3. Font Change: Inter → Geist

The default font has been updated from Inter to Geist for improved readability.

### 4. Directory Structure

New feature-based organization:
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   ├── forms/           # Form components
│   └── data-display/    # Data visualization components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── types/               # TypeScript type definitions
└── contexts/            # React contexts (optional)
```

## Migration Steps

### Step 1: Update Dependencies

1. Install new dependencies:
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools ky lucide-react
```

2. Remove Redux dependencies:
```bash
npm uninstall @reduxjs/toolkit react-redux
```

### Step 2: Replace Redux Store with TanStack Query

1. Remove Redux store configuration
2. Add TanStack Query client configuration:

```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

3. Update App.tsx:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app content */}
    </QueryClientProvider>
  );
}
```

### Step 3: Migrate API Calls

1. Create HTTP client:

```typescript
// src/lib/http-client.ts
import ky from 'ky';

export const httpClient = ky.create({
  prefixUrl: process.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
```

2. Create custom hooks for each data entity:

```typescript
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/lib/http-client';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => httpClient.get('users').json(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData) => httpClient.post('users', { json: userData }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)
- [Geist Font](https://vercel.com/font)
- [ky HTTP Client](https://github.com/sindresorhus/ky)
