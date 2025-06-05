import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Search, ChevronDown, Filter, Calendar, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import axios from 'axios';
import { data } from 'framer-motion/client';

interface ScanReport {
  id: string;
  date: string;
  prediction: string;
  confidence: number;
  severity?: string;
  imageUrl: string;
}




const ReportsPage = () => {
  const [reports, setReports] = useState<ScanReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  useEffect(() => {
    // Simulate API call to fetch reports
    const fetchReports = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const res = await axios.get('http://localhost:5000/api/scans',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        var rep: ScanReport[] = []
        for (var i in res.data.scans){
          const mr: ScanReport = {
            id: res.data.scans[i].id,
            date: res.data.scans[i].datetime,
            prediction: res.data.scans[i].pred,
            confidence: res.data.scans[i].confidence,
            severity: res.data.scans[i].severity,
            imageUrl: res.data.scans[i].imagepath
          }
          rep.push(mr);
        }
        setReports(rep);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  // Filter reports based on search term and filter type
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.prediction.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'normal') return matchesSearch && report.prediction === 'Normal';
    if (filterType === 'abnormal') return matchesSearch && report.prediction !== 'Normal';
    
    return matchesSearch;
  });
  
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
  
  // Get status color based on prediction
  const getStatusColor = (prediction: string, severity?: string) => {
    if (prediction === 'Normal') return 'bg-success-100 text-success-800 border-success-200';
    if (severity?.includes('Mild') || severity?.includes('Early')) return 'bg-warning-100 text-warning-800 border-warning-200';
    return 'bg-error-100 text-error-800 border-error-200';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reports</h1>
        <p className="text-gray-600">
          View and manage your scan history and prediction results
        </p>
      </div>
      
      <motion.div 
        className="bg-white shadow-card rounded-lg overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Filters and search */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block w-full pl-3 pr-8 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 appearance-none"
                  >
                    <option value="all">All Reports</option>
                    <option value="normal">Normal</option>
                    <option value="abnormal">Abnormal</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/upload">
                  New Scan
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Reports list */}
        <div>
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600 mb-2"></div>
              <p className="text-gray-500">Loading your reports...</p>
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredReports.map((report, index) => (
                <motion.div 
                  key={report.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          src={report.imageUrl} 
                          alt="Retinal scan" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Diagnosis</h3>
                        <div className="mt-1 flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(report.prediction, report.severity)}`}>
                            {report.prediction}
                            {report.severity && ` (${report.severity})`}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                        <p className="mt-1 flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(report.date)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Confidence</h3>
                        <p className="mt-1 text-sm text-gray-900">
                          {Math.round(report.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 md:mt-0 space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={`/result/${report.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <Eye className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No reports found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No results matching "${searchTerm}"`
                  : 'You haven\'t uploaded any scans yet.'}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link to="/upload">Upload Your First Scan</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsPage;