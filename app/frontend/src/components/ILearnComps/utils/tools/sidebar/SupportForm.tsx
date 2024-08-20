import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSendSharp } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaPaperPlane, FaFileUpload, FaEye, FaEyeSlash, FaTimesCircle } from 'react-icons/fa';
import { getUserDetails, sendSupportEmail } from '../../../../auth_utils/axios/axiosServices';

interface SupportFormData {
  name: string;
  email: string;
  message: string;
  files?: File[];
}

interface SupportFormProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const SupportForm: React.FC<SupportFormProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [formState, setFormState] = useState<SupportFormData>({ name: '', email: '', message: '', files: [] });
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [showPreviews, setShowPreviews] = useState<boolean[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setFormState({
          name: `${userDetails.user.first_name} ${userDetails.user.last_name}` || '',
          email: userDetails.user.email || '',
          message: '',
          files: [],
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormState(prevState => ({
        ...prevState,
        files: prevState.files ? [...prevState.files, ...newFiles] : newFiles
      }));
      const previews = newFiles.map(file => URL.createObjectURL(file));
      setFilePreviews(prevState => [...prevState, ...previews]);
      setShowPreviews(prevState => [...prevState, ...new Array(newFiles.length).fill(false)]);
    }
  };

  const togglePreview = (index: number) => {
    setShowPreviews(prev => {
      const newPreviews = [...prev];
      newPreviews[index] = !newPreviews[index];
      return newPreviews;
    });
  };

  const handleRemoveFile = (index: number) => {
    setFormState(prevState => {
      const newFiles = prevState.files ? prevState.files.filter((_, i) => i !== index) : [];
      return { ...prevState, files: newFiles };
    });
    setFilePreviews(prevState => prevState.filter((_, i) => i !== index));
    setShowPreviews(prevState => prevState.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);
    if (formState.files) {
      formState.files.forEach(file => {
        formData.append('files', file, file.name);
      });
    }

    try {
      await sendSupportEmail(formData);
      setShowNotification(true);
      resetFormState();
      setTimeout(() => {
        setShowNotification(false);
        onClose();
      }, 3000);
    } catch (error) {
      alert('Failed to send support email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setFormState({
      name: '',
      email: '',
      message: '',
      files: []
    });
    setFilePreviews([]);
    setShowPreviews([]);
  };

  const handleFormClose = () => {
    resetFormState();
    onClose();
  };

  const renderFilePreview = (file: File, index: number) => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return (
          <img 
            src={filePreviews[index]} 
            alt={file.name} 
            className="w-full h-auto max-h-96 object-contain bg-white rounded-lg" 
          />
        );
      case 'video':
        return (
          <video 
            src={filePreviews[index]} 
            controls 
            className="w-full h-auto max-h-48 rounded-lg" 
          />
        );
      case 'audio':
        return (
          <audio 
            src={filePreviews[index]} 
            controls 
            className="w-full" 
          />
        );
      default:
        return (
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p>File type not supported for preview.</p>
            <p>Filename: {file.name}</p>
            <p>File type: {file.type || 'Unknown'}</p>
            <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-nunito p-4"
        >
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 w-1/2 h-full ${
              isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-900'
            } shadow-2xl z-50 overflow-hidden flex flex-col`}
          >
            <div className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                We're Here to Help
              </h2>
              <button onClick={handleFormClose} className={`p-2 rounded-full transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <IoClose size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We value your feedback and are committed to providing excellent support. Please fill out the form below, and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FaUser className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input type="text" name="name" value={formState.name} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'}`} placeholder="Your Name" required />
                </div>

                <div className="relative">
                  <FaEnvelope className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input type="email" name="email" value={formState.email} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'}`} placeholder="Your Email" required />
                </div>

                <div className="relative">
                  <FaPaperPlane className={`absolute top-3 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <textarea name="message" value={formState.message} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'}`} placeholder="Your Message" rows={5} required></textarea>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <FaFileUpload className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input type="file" name="files" multiple onChange={handleFileChange} className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'}`} />
                  </div>

                  {formState.files && (
                    <div className="space-y-4">
                      {Array.from(formState.files).map((file, index) => (
                        <div key={index} className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                          <div className={`flex items-center justify-between p-2 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                            <span className="truncate">{file.name}</span>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => togglePreview(index)}
                                className={`ml-2 p-1 rounded-full transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                              >
                                {showPreviews[index] ? <FaEyeSlash /> : <FaEye />}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className={`ml-2 p-1 rounded-full transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-red-500' : 'hover:bg-gray-200 text-red-600'}`}
                              >
                                <FaTimesCircle />
                              </button>
                            </div>
                          </div>
                          {showPreviews[index] && (
                            <div className="p-2">
                              {renderFilePreview(file, index)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <motion.button type="submit" className={`w-full flex flex-row py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 items-center justify-end ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isSubmitting}>
                    <span className=''>Send Message</span>
                    <motion.div className="w-1/2 justify-end" animate={isSubmitting ? { x: '120%', scale: 1.6 } : {}} transition={{ duration: 1.0 }}>
                      <IoSendSharp className="ml-2" />
                    </motion.div>
                  </motion.button>
                </div>
              </form>
            </div>

            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mt-auto`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.</p>
            </div>

            {showNotification && (
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.3 }} className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                Form submitted successfully!
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportForm;
