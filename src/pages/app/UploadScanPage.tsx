import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image, X, AlertCircle, Info } from 'lucide-react';
import Button from '../../components/ui/Button';
import axios from 'axios';

const UploadScanPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setError('Please upload an image file.');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff']
    },
    maxFiles: 1
  });
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('filePath',previewUrl)
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:5000/api/upload', 
        formData ,{
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate successful upload and redirect to results
      navigate('/result/'+response.data.scan.id);
    } catch (error) {
      setError('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Retinal Scan</h1>
          <p className="text-gray-600">
            Upload a clear, high-quality fundus or retinal scan image for analysis
          </p>
        </div>
        
        {/* Upload Area */}
        <motion.div 
          className="bg-white shadow-card rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Instructions */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Scan Upload</h2>
          </div>
          
          <div className="p-6">
            {error && (
              <motion.div 
                className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md mb-6 flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
            
            <div className="bg-primary-50 border border-primary-200 rounded-md p-4 mb-6 flex items-start">
              <Info className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-primary-700 mb-1">For best results:</h3>
                <ul className="text-sm text-primary-800 space-y-1 list-disc list-inside">
                  <li>Use a clear, focused image of the retina</li>
                  <li>Ensure the entire retina is visible in the frame</li>
                  <li>Use images taken by professional equipment when possible</li>
                  <li>Upload in JPG, PNG, or TIFF format (max 10MB)</li>
                </ul>
              </div>
            </div>
            
            {!selectedFile ? (
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="mb-4">
                  <div className="rounded-full bg-primary-100 p-3 mx-auto">
                    <Upload className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <p className="text-center mb-2 font-medium text-gray-700">
                  {isDragActive ? 'Drop the image here' : 'Drag and drop your retinal scan image'}
                </p>
                <p className="text-center text-sm text-gray-500 mb-4">
                  or click to browse files
                </p>
                <Button type="button" variant="outline">
                  Select Image
                </Button>
              </div>
            ) : (
              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Image className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900">{selectedFile.name}</span>
                  </div>
                  <button 
                    onClick={removeSelectedFile} 
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Remove selected file"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {previewUrl && (
                  <div className="mb-4 flex justify-center">
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-md">
                      <img 
                        src={previewUrl} 
                        alt="Scan preview" 
                        className="max-w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <Button 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-8"
                  >
                    {isUploading ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                        Processing...
                      </>
                    ) : 'Analyze Scan'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Additional Info */}
        <motion.div 
          className="bg-white shadow-card rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">What Happens Next?</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Our AI will analyze your retinal scan to detect potential signs of eye diseases.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Results</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive a detailed report with predictions and confidence scores.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-medium mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Consultation</h3>
                  <p className="text-sm text-gray-600">
                    Share your results with your healthcare provider for proper medical evaluation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                <strong>Important:</strong> This tool is designed to assist in early detection and is not a replacement for professional medical diagnosis. Always consult with a healthcare provider regarding your results.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadScanPage;