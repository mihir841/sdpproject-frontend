import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy-loaded pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage'));
const UploadScanPage = lazy(() => import('./pages/app/UploadScanPage'));
const PredictionResultPage = lazy(() => import('./pages/app/PredictionResultPage'));
const ReportsPage = lazy(() => import('./pages/app/ReportsPage'));
const HelpPage = lazy(() => import('./pages/app/HelpPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
          
          {/* Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="upload" element={<UploadScanPage />} />
            <Route path="result/:id" element={<PredictionResultPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;