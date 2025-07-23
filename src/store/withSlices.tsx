// Migration: Redux removed, this file provides compatibility exports
// This HOC is deprecated and should be removed from components

import React from 'react';

export default function withSlices(...slices: any[]) {
  return function<T extends React.ComponentType<any>>(Component: T): T {
    console.warn('withSlices HOC is deprecated. Please remove this wrapper and migrate to React Context or TanStack Query.');
    
    const WrappedComponent = (props: any) => {
      return React.createElement(Component, props);
    };
    
    WrappedComponent.displayName = `withSlices(${Component.displayName || Component.name})`;
    
    return WrappedComponent as T;
  };
}
