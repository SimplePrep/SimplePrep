import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSendSharp } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaPaperPlane, FaFileUpload, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUserDetails } from '../../../../auth_utils/axios/axiosServices';
import { sendSupportEmail } from '../../../../auth_utils/axios/axiosServices';

interface SupportFormProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const SupportForm: React.FC<SupportFormProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [showPreviews, setShowPreviews] = useState<boolean[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setFormState({
          name: userDetails.user.first_name + ' ' + userDetails.user.last_name || '',
          email: userDetails.user.email || '',
          message: ''
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
      setSelectedFiles(files);
      const previews = Array.from(files).map(file => URL.createObjectURL(file));
      setFilePreviews(previews);
      setShowPreviews(new Array(files.length).fill(false));
    }
  };

  const togglePreview = (index: number) => {
    setShowPreviews(prev => {
      const newPreviews = [...prev];
      newPreviews[index] = !newPreviews[index];
      return newPreviews;
    });
  };

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        await sendSupportEmail({ ...formState, files: selectedFiles });
        setIsSubmitting(false);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            onClose();
        }, 3000);
    } catch (error) {
        setIsSubmitting(false);
        alert('Failed to send support email.');
    }
  };

  const renderFilePreview = (file: File, index: number) => {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      return <img src={filePreviews[index]} alt={file.name} className="w-full h-full bg-white object-cover rounded-lg" />;
    } else if (fileType === 'video') {
      return <video src={filePreviews[index]} controls className="w-full h-full rounded-lg" />;
    } else {
      return <span className="truncate">{file.name}</span>;
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
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We value your feedback and are committed to providing excellent support.
                Please fill out the form below, and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FaUser className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
                    }`}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
                    }`}
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="relative">
                  <FaPaperPlane className={`absolute top-3 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500'
                        : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
                    }`}
                    placeholder="Your Message"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <FaFileUpload className={`absolute top-4 left-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="file"
                      name="files"
                      multiple
                      onChange={handleFileChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-shadow duration-200 ${
                        isDarkMode
                          ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500'
                          : 'bg-white text-gray-900 border-gray-300 focus:ring-purple-500'
                      }`}
                    />
                  </div>

                  {selectedFiles && (
                    <div className="space-y-2">
                      {Array.from(selectedFiles).map((file, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}>
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => togglePreview(index)}
                            className={`ml-2 p-1 rounded-full transition-colors duration-200 ${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            }`}
                          >
                            {showPreviews[index] ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedFiles && (
                    <div className="space-y-4">
                      {Array.from(selectedFiles).map((file, index) => (
                        showPreviews[index] && (
                          <div key={`preview-${index}`} className="border rounded-lg p-2">
                            {renderFilePreview(file, index)}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <motion.button
                    type="submit"
                    className={`w-full flex flex-row py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 items-center justify-end ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    <span className=''>Send Message</span>
                    <motion.div
                      className="w-1/2 justify-end"
                      animate={isSubmitting ? { x: '120%', scale: 1.6 } : {}}
                      transition={{ duration: 1.0 }}
                    >
                      <IoSendSharp className="ml-2" />
                    </motion.div>
                  </motion.button>
                </div>
              </form>
            </div>

            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mt-auto`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
              </p>
            </div>
            {showNotification && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"
              >
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
