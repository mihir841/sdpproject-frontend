import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Eye } from 'lucide-react';
import LoadingScreen from '../components/ui/LoadingScreen';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard\" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <motion.div
          className="w-full max-w-md"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          key={pathname}
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-primary-700">EyeInsight</span>
            </div>
            <Outlet />
          </div>
        </motion.div>
      </div>
      
      <div className="hidden md:flex md:w-1/2 bg-primary-600 justify-center items-center">
        <div className="p-12 max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6">Early Detection Saves Sight</h2>
          <p className="mb-4">
            EyeInsight uses advanced AI to detect signs of eye diseases from retinal scans, 
            helping with early diagnosis and treatment.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              Early detection of diabetic retinopathy
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              Glaucoma screening
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              Age-related macular degeneration detection
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;