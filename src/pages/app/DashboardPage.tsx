import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { Eye, Upload, ChevronRight, Calendar, Clock } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DashboardPage = () => {
  const { user } = useAuth();


  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username || 'User'}
        </h1>
        <p className="text-gray-600">
          Track your eye health and manage your retinal scans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/upload" 
                  className="flex items-center p-4 border border-primary-100 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  <div className="rounded-full bg-primary-100 p-3 mr-4">
                    <Upload className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Upload New Scan</h3>
                    <p className="text-sm text-gray-600">Submit a new retinal scan for analysis</p>
                  </div>
                </Link>
                
                <Link 
                  to="/reports" 
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="rounded-full bg-gray-100 p-3 mr-4">
                    <Eye className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">View All Reports</h3>
                    <p className="text-sm text-gray-600">Access your complete scan history</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
          
          
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-600">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{user?.username || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Account Information</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Member since</span>
                    <span className="text-gray-900 font-medium">May 2025</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Upcoming Appointments */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Reminders</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center p-3 bg-primary-50 rounded-lg mb-4">
                <Clock className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Regular eye checkup recommended</p>
                  <p className="text-xs text-gray-500">It's been 6 months since your last upload</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Remember to schedule regular eye exams with your ophthalmologist for comprehensive eye health monitoring.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;