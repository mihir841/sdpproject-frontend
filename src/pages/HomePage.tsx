import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Shield, Clock, Award } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  {
    name: 'Advanced AI Detection',
    description: 'Our state-of-the-art AI models can detect early signs of common eye diseases with high accuracy.',
    icon: Eye,
  },
  {
    name: 'Private & Secure',
    description: 'Your medical data is encrypted and securely stored, with full compliance to healthcare privacy standards.',
    icon: Shield,
  },
  {
    name: 'Fast Results',
    description: 'Get prediction results within seconds, allowing for quicker medical decision-making.',
    icon: Clock,
  },
  {
    name: 'Clinically Validated',
    description: 'Our models have been validated through rigorous clinical testing with ophthalmologists.',
    icon: Award,
  },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Early Detection <span className="text-primary-600">Saves Sight</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                EyeInsight uses advanced AI to analyze retinal scans and detect early signs of eye diseases,
                helping doctors make faster, more accurate diagnoses.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/help">Learn More</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/5752287/pexels-photo-5752287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Eye scan analysis" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Eye Disease Detection
            </h2>
            <p className="text-xl text-gray-600">
              Our AI-powered platform helps detect early signs of common eye diseases before they cause irreversible damage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="bg-white rounded-lg shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              A simple three-step process to get accurate eye disease predictions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Scan',
                description: 'Upload a high-quality fundus or retinal scan image through our secure platform.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI algorithms analyze the image to detect signs of eye diseases.',
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive detailed results and recommendations that you can share with your doctor.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-primary-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Eye Health Journey Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their eye health with early detection.
          </p>
          <Button 
            variant="accent" 
            size="lg"
            asChild
          >
            <Link to="/signup">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;