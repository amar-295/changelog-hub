// ── Node / library imports ──────────────────────────────────────────────────
import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader2 } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// ── App infrastructure ──────────────────────────────────────────────────────
import './index.css';
import { validateEnv } from './config/env.js';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// ── Eagerly loaded pages (small, on the critical path) ─────────────────────
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import LandingPage from './pages/landing/LandingPage.jsx';

// ── Route loaders (slim data-only file, safe to import eagerly) ────────────
import { releasesLoader, editReleaseLoader } from './pages/releases/loaders.js';

// ── Lazy-loaded pages (split into their own chunks) ─────────────────────────
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.jsx'));
const Releases = lazy(() => import('./pages/releases/Releases.jsx'));
const CreateReleasePage = lazy(
  () => import('./pages/releases/CreateReleasePage.jsx')
);
const PublicChangelog = lazy(
  () => import('./pages/public/PublicChangelog.jsx')
);
const Settings = lazy(() => import('./pages/dashboard/Settings.jsx'));
const Subscribers = lazy(() => import('./pages/dashboard/Subscribers.jsx'));

// Validate required env variables before any component renders
validateEnv();

// ── Shared fallback for all lazy routes ─────────────────────────────────────
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px] w-full">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent excessive refetching
      retry: 1,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Public landing page (no auth required) */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected app — dashboard lives at /dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="releases"
          loader={releasesLoader}
          element={
            <Suspense fallback={<PageLoader />}>
              <Releases />
            </Suspense>
          }
        />
        <Route
          path="subscribers"
          element={
            <Suspense fallback={<PageLoader />}>
              <Subscribers />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>

      {/* Full-screen release editor (outside DashboardLayout so sidebar/header don't show) */}
      <Route
        path="/releases/new"
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <CreateReleasePage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/releases/:id/edit"
        loader={editReleaseLoader}
        element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <CreateReleasePage />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Public Page Route - Catch all other subdomains */}
      <Route
        path="/:subdomain"
        element={
          <Suspense fallback={<PageLoader />}>
            <PublicChangelog />
          </Suspense>
        }
      />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider
            router={router}
            hydrateFallbackElement={<PageLoader />}
          />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-bg-tooltip)',
                color: 'var(--color-text-primary)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow:
                  '0 0 0 1px rgba(0, 0, 0, 0.05), 0 text-[13px] 24px -8px rgba(0, 0, 0, 0.8)',
                padding: '10px 14px',
              },
              success: {
                iconTheme: {
                  primary: '#38bdf8',
                  secondary: 'var(--color-bg-tooltip)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'var(--color-bg-tooltip)',
                },
              },
            }}
          />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
