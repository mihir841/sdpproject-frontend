import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const MainLayout = () => {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <motion.main 
        className="flex-grow"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        key={pathname}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;