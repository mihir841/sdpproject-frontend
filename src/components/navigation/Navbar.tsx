import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Eye className={`h-6 w-6 ${scrolled ? 'text-primary-600' : 'text-primary-600'}`} />
            <span className={`ml-2 font-bold text-xl ${scrolled ? 'text-primary-700' : 'text-primary-700'}`}>
              EyeInsight
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/upload">Upload Scan</NavLink>
                <NavLink to="/reports">Reports</NavLink>
                <NavLink to="/help">Help</NavLink>
                <div className="ml-4 flex items-center">
                  <span className="text-sm text-gray-600 mr-3">
                    Hi, {user?.username || 'User'}
                  </span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/help">Help</NavLink>
                <div className="ml-4 flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-primary-600 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
                  <MobileNavLink to="/upload">Upload Scan</MobileNavLink>
                  <MobileNavLink to="/reports">Reports</MobileNavLink>
                  <MobileNavLink to="/help">Help</MobileNavLink>
                  <hr className="my-2" />
                  <div className="pt-2">
                    <Button fullWidth onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="/help">Help</MobileNavLink>
                  <hr className="my-2" />
                  <div className="pt-2 space-y-2">
                    <Button variant="outline" fullWidth asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button fullWidth asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'text-primary-700 bg-primary-50' 
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
        isActive 
          ? 'text-primary-700 bg-primary-50' 
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;