import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ChevronLeft, AlertTriangle, Info, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';
import axios from 'axios';


interface PredictionResult {
  id: string;
  dateCreated: string;
  imageUrl: string;
  primaryDiagnosis: string;
  primaryConfidence: number;
  severity?: string;
  recommendation: string;
}



const PredictionResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch results
    const fetchResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token")
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // const res = await axios.get('http://localhost:5000/api/scans/'+id,{
        const res = await axios.get('https://sdpproject-backend.onrender.com/api/scans/'+id,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(res);
        const mockResults: Record<string, PredictionResult> = {
            'id' : {
              id: res.data.id,
              dateCreated: '2025-05-10T14:30:00',
              imageUrl: res.data.imagepath,
              primaryDiagnosis: res.data.prediction,
              primaryConfidence: res.data.conf,
              recommendation: 'Your retinal scan appears normal. Continue with regular annual eye check-ups.',
            }
          }
        if (id && mockResults['id']) {
          setResult(mockResults['id']);
        } else {
          setError('Result not found');
        }
      } catch (err) {
        setError('Failed to load prediction results');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [id]);
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading prediction results...</p>
        </div>
      </div>
    );
  }
  
  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-card rounded-lg p-8 text-center">
          <div className="text-error-500 mb-4">
            <AlertTriangle className="h-12 w-12 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Result Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The requested prediction result could not be found.'}
          </p>
          <Button asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Define status color based on diagnosis
  const getStatusColor = (diagnosis: string) => {
    if (diagnosis === 'Normal') return 'success';
    if (diagnosis.includes('Mild') || diagnosis.includes('Early')) return 'warning';
    return 'error';
  };
  
  const statusColor = getStatusColor(result.primaryDiagnosis + (result.severity ? ` (${result.severity})` : ''));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white shadow-card rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex flex-wrap justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Prediction Result</h1>
            <span className="text-sm text-gray-500">
              {formatDate(result.dateCreated)}
            </span>
          </div>
          
          {/* Main content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image and primary diagnosis */}
              <div>
                <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
                  <img 
                    src={result.imageUrl} 
                    alt="Retinal scan" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Primary Diagnosis</h2>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
                  </Button>
                </div>
                
                <div className={`rounded-lg p-6 bg-${statusColor}-50 border border-${statusColor}-200`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full bg-${statusColor}-100 flex items-center justify-center mr-4`}>
                        <Eye className={`h-6 w-6 text-${statusColor}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {result.primaryDiagnosis}
                          {result.severity && <span> ({result.severity})</span>}
                        </h3>
                        <p className={`text-sm text-${statusColor}-700`}>
                          {result.primaryConfidence * 100}% confidence
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                    <p className="text-gray-700">{result.recommendation}</p>
                  </div>
                </div>
              </div>
              
              {/* Detailed results */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Detailed Analysis</h2>
                
                {/* Confidence bars */}
                <div className="space-y-4 mb-8">
                  {/* {result.allResults.map((diseaseResult, index) => (
                    <motion.div 
                      key={diseaseResult.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {diseaseResult.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(diseaseResult.probability * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          className={`h-2.5 rounded-full ${
                            index === 0 ? `bg-${statusColor}-500` : 'bg-gray-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${diseaseResult.probability * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        ></motion.div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {diseaseResult.description}
                      </p>
                    </motion.div>
                  ))} */}
                </div>
                
                {/* Additional information */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Understanding Your Results
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        These results are generated by an AI algorithm and should be used as a screening tool only. 
                        They are not a definitive medical diagnosis.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Next steps:</span> Share these results with your eye care professional.
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Follow-up:</span> Even with normal results, regular eye check-ups are recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/reports">View All Reports</Link>
          </Button>
          <Button asChild>
            <Link to="/upload">Upload New Scan</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultPage;