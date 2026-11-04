import { lazy, Suspense } from 'react';
import { Outlet, createBrowserRouter, type RouteObject } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import AppErrorBoundary from './components/AppErrorBoundary';
import CookieBannerErrorBoundary from '@/components/CookieBannerErrorBoundary';
import RootLayout from './layouts/RootLayout';
import Spinner from './components/Spinner';
import { routes } from './routes';

const CookieBanner = lazy(() =>
  import('@/components/CookieBanner').catch((error) => {
    console.warn('Failed to load CookieBanner:', error);
    return { default: () => null };
  })
);

const SpinnerFallback = () => (
  <div className="flex justify-center py-8 h-screen items-center">
    <Spinner />
  </div>
);

const rootElement = (
  <Suspense fallback={<SpinnerFallback />}>
    <RootLayout>
      <Outlet />
    </RootLayout>
  </Suspense>
);

// Wrap the flat routes in one shared layout and catch route render errors before
// React Router replaces the route tree with its default error UI.
const routeTree: RouteObject[] = [
  {
    element:
      import.meta.env.MODE === 'development' ? (
        <AppErrorBoundary>{rootElement}</AppErrorBoundary>
      ) : (
        rootElement
      ),
    children: routes,
  },
];

const router = createBrowserRouter(routeTree);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/*
        CookieBanner reads document.cookie and subscribes to browser events.
        App.tsx is client-only (entry-server.tsx renders the route tree
        directly without importing App), so no SSR gate is needed here.
      */}
      <CookieBannerErrorBoundary>
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      </CookieBannerErrorBoundary>
    </>
  );
}
