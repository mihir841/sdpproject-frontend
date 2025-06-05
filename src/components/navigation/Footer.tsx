import { Link } from 'react-router-dom';
import { Eye, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Eye className="h-6 w-6 text-primary-600" />
              <span className="ml-2 font-bold text-xl text-primary-700">
                EyeInsight
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Advanced AI-powered eye disease prediction system for early detection and treatment.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} EyeInsight. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;