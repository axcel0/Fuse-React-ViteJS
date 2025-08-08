# Kafka Connection Status Update

## Summary
Updated the container status monitoring system to use the correct Kafka connection status fields from the API response body.

## Changes Made

### 1. Updated Field Mapping
- **Before**: Used simulated/demo kafka connection status
- **After**: Extract kafka status from response body fields:
  - `kafkaStatus` (primary field)
  - `details.kafka.status` (fallback field)

### 2. Container-Specific Connected Status
Based on the conversation with team, only specific containers should show "connected" status:
- **ev lock**
- **consumer** 
- **ev vehicle report**
- **nearme**
- **ev sse app**

### 3. Enhanced Status Handling
Updated ContainerDataTable.tsx to handle additional kafka connection states:
- `connected` - Green success chip
- `unconnected` / `disconnected` - Gray default chip  
- `error` / `failed` - Red error chip

### 4. Type Safety Improvements
Enhanced the `ContainerStatus` interface in `types/index.ts`:
```typescript
export interface ContainerStatus {
  // ... other fields
  kafkaConnection: 'connected' | 'unconnected' | 'disconnected' | 'error' | '';
  responseBody?: {
    kafkaStatus?: string;
    details?: {
      kafka?: {
        status?: string;
      };
    };
    [key: string]: any;
  };
}
```

### 5. CSV Export Consistency
Ensured that CSV export uses the same `kafkaConnection` field for consistency between table display and export functionality.

## Logic Flow

1. **API Response Processing**: 
   - Check `webhookUrl.body.kafkaStatus` first
   - Fallback to `webhookUrl.body.details.kafka.status`
   - Convert to lowercase and map to allowed values

2. **Container Type Validation**:
   - Check if container name matches known connected container types
   - Apply connected status only for specific container types

3. **Display & Export**:
   - Table shows color-coded chips based on status
   - CSV export includes the same status values
   - TypeScript ensures type safety across all components

## Files Modified
- `src/app/(control-panel)/container/Container.tsx` - Main logic update
- `src/app/(control-panel)/container/types/index.ts` - Type definitions
- `src/app/(control-panel)/container/components/ContainerDataTable.tsx` - Enhanced status display

## Testing
- ✅ TypeScript compilation passes
- ✅ Enhanced status visualization with proper color coding
- ✅ Maintains CSV export functionality
- ✅ Type safety maintained across all components
