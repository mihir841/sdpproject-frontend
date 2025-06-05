import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeOff, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-primary-100 p-6">
            <EyeOff className="h-16 w-16 text-primary-600" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold text-gray-900 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button asChild>
            <Link to="/" className="flex items-center justify-center">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;