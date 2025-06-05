import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age?: number;
  gender?: string;
}

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<SignupFormData>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setSignupError(null);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = data;
      
      await signup(signupData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setSignupError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h1>
      <p className="text-gray-600 mb-8">
        Join EyeInsight and start tracking your eye health
      </p>
      
      {signupError && (
        <motion.div 
          className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md mb-6 flex items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{signupError}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
              errors.username ? 'border-error-500' : 'border-gray-300'
            }`}
            {...register('username', { 
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              }
            })}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-error-600">{errors.username.message}</p>
          )}
        </div>
        
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
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
              errors.confirmPassword ? 'border-error-500' : 'border-gray-300'
            }`}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age (optional)
            </label>
            <input
              id="age"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              {...register('age', { 
                min: {
                  value: 1,
                  message: 'Age must be positive',
                },
                max: {
                  value: 120,
                  message: 'Invalid age',
                }
              })}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-error-600">{errors.age.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender (optional)
            </label>
            <select
              id="gender"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              {...register('gender')}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;