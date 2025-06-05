import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronDown, ChevronUp, Eye, Shield, HelpCircle, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What eye diseases can EyeInsight detect?',
    answer: 'EyeInsight can detect signs of several common eye conditions including diabetic retinopathy, glaucoma, age-related macular degeneration (AMD), and cataracts. Our AI models are trained on vast datasets of retinal images to identify patterns associated with these conditions.'
  },
  {
    question: 'How accurate are the predictions?',
    answer: 'Our AI models have been trained on large datasets and validated with clinical tests. While accuracy varies by condition, our system generally achieves 85-95% accuracy in detecting major eye diseases. However, results should always be confirmed by a healthcare professional.'
  },
  {
    question: 'What type of eye scan images should I upload?',
    answer: 'For best results, upload high-quality fundus or retinal scan images. These are typically taken by ophthalmologists or optometrists using specialized equipment. The image should be clear, well-lit, and show the entire retina including the optic disc and macula.'
  },
  {
    question: 'How do I interpret my results?',
    answer: 'Your results will show the detected condition (if any) along with a confidence score. The system may detect multiple possible conditions with varying probabilities. Always consult with an eye care professional to interpret these results properly.'
  },
  {
    question: 'Is my medical data secure?',
    answer: 'Yes, we take data security very seriously. All images and personal information are encrypted both in transit and at rest. We comply with healthcare privacy regulations and never share your data with third parties without explicit consent.'
  },
  {
    question: 'Can EyeInsight replace regular eye exams?',
    answer: 'No, EyeInsight is designed to be a supplementary tool for early detection and should not replace comprehensive eye examinations by healthcare professionals. Regular eye exams remain essential for complete eye health evaluation.'
  },
  {
    question: 'How often should I upload a new scan?',
    answer: 'This depends on your specific health situation. Generally, we recommend following your eye doctor\'s advice about the frequency of eye examinations. For those at higher risk for eye diseases (e.g., diabetics), more frequent monitoring may be beneficial.'
  },
  {
    question: 'Can I share my results with my doctor?',
    answer: 'Yes, you can download or print your results to share with your healthcare provider. The reports include detailed information about the scan and prediction results that can be useful for your doctor.'
  }
];

const HelpPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data
    alert('Message sent! We will get back to you soon.');
    setContactFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Help & Information
        </h1>
        <p className="text-gray-600">
          Learn more about eye diseases, how to use EyeInsight, and get support
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Eye Diseases */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Common Eye Diseases</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Diabetic Retinopathy</h3>
                  <p className="text-gray-600 mb-3">
                    A diabetes complication that affects the eyes. It's caused by damage to the blood vessels in the retina.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Signs to watch for:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Floaters or dark spots in vision</li>
                      <li>Blurred vision</li>
                      <li>Fluctuating vision</li>
                      <li>Impaired color vision</li>
                      <li>Dark or empty areas in vision</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Glaucoma</h3>
                  <p className="text-gray-600 mb-3">
                    A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Signs to watch for:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Patchy blind spots in peripheral vision</li>
                      <li>Tunnel vision in advanced stages</li>
                      <li>Severe headache</li>
                      <li>Eye pain</li>
                      <li>Nausea and vomiting</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Age-related Macular Degeneration (AMD)</h3>
                  <p className="text-gray-600 mb-3">
                    A condition that affects the macula, the part of the eye that's responsible for central vision.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Signs to watch for:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Blurred or reduced central vision</li>
                      <li>Visual distortions (straight lines appearing wavy)</li>
                      <li>Difficulty adapting to low light</li>
                      <li>Decreased intensity of colors</li>
                      <li>Blind spot in the center of vision</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <strong>Important:</strong> Early detection is crucial for effective treatment of eye diseases. Regular eye check-ups with a healthcare professional are recommended even if you're using AI-based detection tools.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Taking good scans */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">How to Take a Good Eye Scan</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                The quality of your eye scan directly affects the accuracy of our AI predictions. Here are some guidelines for obtaining high-quality scans:
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Use professional equipment</h3>
                    <p className="text-sm text-gray-600">
                      Retinal scans should ideally be taken by an ophthalmologist or optometrist using a fundus camera or similar professional equipment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Ensure proper lighting</h3>
                    <p className="text-sm text-gray-600">
                      The scan should be well-lit with good contrast, showing the retinal details clearly.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Center the image properly</h3>
                    <p className="text-sm text-gray-600">
                      The optic disc and macula should be clearly visible and well-centered in the image.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Focus is critical</h3>
                    <p className="text-sm text-gray-600">
                      The image should be in sharp focus, with clear visibility of retinal blood vessels and other structures.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Use appropriate file formats</h3>
                    <p className="text-sm text-gray-600">
                      Save and upload the scan as a high-quality JPG, PNG, or TIFF file with minimal compression.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-primary-50 border border-primary-100 rounded-md p-4">
                <h3 className="font-medium text-primary-700 mb-2">Sample high-quality retinal scan:</h3>
                <div className="flex justify-center">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-sm">
                    <img 
                      src="https://images.pexels.com/photos/5752300/pexels-photo-5752300.jpeg" 
                      alt="Sample retinal scan" 
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm text-primary-700">
                  Notice the clear visibility of the optic disc (bright circular area) and blood vessels radiating outward.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* FAQs */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-base font-medium text-gray-900">{faq.question}</h3>
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-gray-600"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contact support */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleContactFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">support@eyeinsight.com</span>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Resources */}
          <motion.div 
            className="bg-white shadow-card rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Helpful Resources</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#"
                    className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">User Guide</h3>
                      <p className="text-xs text-gray-500">
                        Complete guide to using EyeInsight platform
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Shield className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Privacy & Security</h3>
                      <p className="text-xs text-gray-500">
                        How we protect your medical data
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Video Tutorials</h3>
                      <p className="text-xs text-gray-500">
                        Step-by-step guides for using the platform
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;