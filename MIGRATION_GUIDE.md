# Fuse React v16.0.0 Migration Guide

This guide will help you migrate your Fuse React application from v14 to v16.

## Major Changes Summary

- ✅ **State Management**: Redux → TanStack Query
- ✅ **Icons**: Hero Icons → Lucide Icons  
- ✅ **Font**: Inter → Geist
- ✅ **HTTP Client**: fetch/axios → ky
- ✅ **Directory Structure**: Reorganized for better maintainability

## 1. State Management Migration (Redux → TanStack Query)

### Before (Redux)
```typescript
// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/user');
  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

// Component usage
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUser } from '@/store/userSlice';

function UserProfile() {
  const dispatch = useAppDispatch();
  const { data: user, loading, error } = useAppSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### After (TanStack Query)
```typescript
// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';

export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await httpClient.get('user/me');
      return response.json();
    },
  });
}

// Component usage
import { useUser } from '@/hooks/useUser';

function UserProfile() {
  const { data: user, isLoading, error } = useUser();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user?.name}</div>;
}
```

### Migration Steps:

1. **Remove Redux dependencies** (already done):
   - `@reduxjs/toolkit`
   - `react-redux`

2. **Add TanStack Query** (already done):
   - `@tanstack/react-query`
   - `@tanstack/react-query-devtools`

3. **Replace Redux store with QueryClient**:
   - Remove `Provider` from App.tsx
   - Add `QueryClientProvider`

4. **Convert slices to query hooks**:
   - Replace `createSlice` with `useQuery`/`useMutation`
   - Replace `createAsyncThunk` with query functions
   - Use query keys for cache management

## 2. Icon Migration (Hero Icons → Lucide Icons)

### Before (Hero Icons)
```typescript
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

function Navigation() {
  return (
    <div>
      <Bars3Icon className="w-6 h-6" />
      <XMarkIcon className="w-6 h-6" />
      <UserIcon className="w-6 h-6" />
    </div>
  );
}
```

### After (Lucide Icons)
```typescript
import { Menu, X, User } from 'lucide-react';

function Navigation() {
  return (
    <div>
      <Menu size={24} />
      <X size={24} />
      <User size={24} />
    </div>
  );
}
```

### Migration Helper
Use the migration helper in `src/lib/icon-migration.ts`:

```typescript
import { getLucideIconName } from '@/lib/icon-migration';

// Convert Hero icon names to Lucide icon names
const lucideIconName = getLucideIconName('Bars3Icon'); // Returns 'Menu'
```

### Icon Mapping Reference:
- `Bars3Icon` → `Menu`
- `XMarkIcon` → `X`
- `UserIcon` → `User`
- `Cog6ToothIcon` → `Settings`
- `MagnifyingGlassIcon` → `Search`
- [See full mapping in icon-migration.ts]

## 3. Font Migration (Inter → Geist)

### Changes Made:
1. **Updated font-family in CSS** (already done):
   - `src/styles/app-base.css`: Updated html font-family
   - `src/@fuse/default-settings/FuseDefaultSettings.ts`: Updated typography

2. **Added Geist font files** (already done):
   - `public/assets/fonts/geist/geist.css`
   - Imported in `src/styles/index.css`

### If you have custom font references:
```css
/* Before */
font-family: 'Inter var', sans-serif;

/* After */
font-family: 'Geist', 'Inter var', sans-serif;
```

## 4. HTTP Client Migration (fetch/axios → ky)

### Before (fetch/axios)
```typescript
// Using fetch
const response = await fetch('/api/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
const data = await response.json();

// Using axios
const { data } = await axios.get('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

### After (ky)
```typescript
import httpClient from '@/lib/http-client';

// Simple GET request
const data = await httpClient.get('users').json();

// POST with data
const result = await httpClient.post('users', {
  json: { name: 'John', email: 'john@example.com' }
}).json();

// The httpClient already handles:
// - Authorization headers (from localStorage)
// - Error handling (401 redirects)
// - Retry logic
// - Base URL configuration
```

## 5. Component Updates

### Update Authentication Components

Replace Redux user state with TanStack Query:

```typescript
// Before
import { useAppSelector } from '@/store/hooks';

function useAuth() {
  const user = useAppSelector((state) => state.user.data);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return { user, isAuthenticated };
}

// After
import { useUser } from '@/hooks/useUser';

function useAuth() {
  const { data: user, isLoading } = useUser();
  const isAuthenticated = !!user && !isLoading;
  return { user, isAuthenticated, isLoading };
}
```

### Update Data Components

Replace Redux data fetching with queries:

```typescript
// Before
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/productSlice';

function ProductList() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <div>
      {loading ? 'Loading...' : products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// After
import { useProducts } from '@/hooks/useApi';

function ProductList() {
  const { data: products, isLoading } = useProducts();
  
  return (
    <div>
      {isLoading ? 'Loading...' : products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## 6. Directory Structure

### New Recommended Structure:
```
src/
├── app/                    # Route components and pages
├── components/             # Reusable UI components
│   ├── ui/                # Basic UI components (buttons, inputs, etc.)
│   ├── forms/             # Form components
│   └── layouts/           # Layout components
├── hooks/                 # Custom React hooks (including query hooks)
├── lib/                   # Utility libraries and configurations
│   ├── http-client.ts     # HTTP client configuration
│   ├── react-query.ts     # Query client configuration
│   └── icon-migration.ts  # Icon migration helpers
├── types/                 # TypeScript type definitions
├── contexts/              # React contexts
└── utils/                 # Utility functions
```

## 7. Testing Updates

Update tests to work with TanStack Query:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderWithQueryClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
}
```

## 8. Performance Optimizations

TanStack Query provides several performance benefits:

1. **Automatic caching**: Reduces duplicate API calls
2. **Background refetching**: Keeps data fresh
3. **Optimistic updates**: Better UX for mutations
4. **Request deduplication**: Prevents duplicate requests

```typescript
// Enable optimistic updates
function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProductApi,
    onMutate: async (newProduct) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['products', newProduct.id] });
      
      // Snapshot the previous value
      const previousProduct = queryClient.getQueryData(['products', newProduct.id]);
      
      // Optimistically update
      queryClient.setQueryData(['products', newProduct.id], newProduct);
      
      return { previousProduct };
    },
    onError: (err, newProduct, context) => {
      // Rollback on error
      queryClient.setQueryData(['products', newProduct.id], context?.previousProduct);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

## 9. Error Handling

TanStack Query provides better error handling:

```typescript
function ProductComponent() {
  const { data, error, isError, refetch } = useProducts();
  
  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  return <div>{/* render products */}</div>;
}
```

## 10. DevTools

The React Query DevTools are already configured for development. Access them by:

1. Opening your app in development mode
2. Look for the React Query DevTools icon in the bottom-left corner
3. Click to open and inspect queries, mutations, and cache

## Migration Checklist

- ✅ Updated package.json dependencies
- ✅ Replaced Redux store with QueryClient
- ✅ Updated App.tsx providers
- ✅ Added HTTP client configuration
- ✅ Added example query hooks
- ✅ Updated font configuration
- ✅ Added Lucide icons support
- ⏳ Update existing components to use new patterns
- ⏳ Replace Hero icons with Lucide icons
- ⏳ Remove old Redux files
- ⏳ Update tests

## Next Steps

1. **Gradually migrate components**: Start with new features, then migrate existing ones
2. **Remove Redux files**: Once all components are migrated, remove Redux-related files
3. **Update icons**: Replace Hero icons with Lucide icons throughout the app
4. **Test thoroughly**: Ensure all functionality works with the new architecture
5. **Optimize queries**: Use React Query DevTools to optimize query patterns

## Need Help?

- Check the TanStack Query documentation: https://tanstack.com/query
- Lucide icons reference: https://lucide.dev/
- Review the example hooks in `src/hooks/`
