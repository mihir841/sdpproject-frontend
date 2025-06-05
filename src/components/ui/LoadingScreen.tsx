import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const loadingCircleTransition = {
  duration: 0.6,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="mb-6 flex items-center">
          <Eye className="h-8 w-8 text-primary-600 animate-pulse" />
          <span className="ml-2 text-xl font-bold text-primary-700">EyeInsight</span>
        </div>
        
        <motion.div
          className="flex space-x-2"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-primary-500"
              variants={loadingCircleVariants}
              transition={loadingCircleTransition}
            />
          ))}
        </motion.div>
        
        <p className="mt-4 text-sm text-gray-500">Loading your experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;