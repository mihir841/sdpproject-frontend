import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      await login(data.email, data.password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-gray-600 mb-8">
        Sign in to your account to continue
      </p>
      
      {loginError && (
        <motion.div 
          className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md mb-6 flex items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{loginError}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
              errors.email ? 'border-error-500' : 'border-gray-300'
            }`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                errors.password ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                }
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
          )}
          <div className="mt-2 text-right">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;