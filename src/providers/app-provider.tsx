import { Loader } from 'lucide-react';
import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRoutes } from 'react-router-dom';
import { ReactQueryProvider } from 'src/providers/query-provider';
import ErrorFallback from 'src/components/error-fallback';

interface IAppProviderProps {
  children: ReactNode
}

function AppProvider(props: IAppProviderProps) {
  const { children } = props;

  return (
    <React.Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default React.memo(AppProvider);
