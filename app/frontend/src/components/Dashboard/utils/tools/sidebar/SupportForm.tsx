import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSendSharp } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaPaperPlane, FaFileUpload, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getUserDetails } from '../../../../auth_utils/axios/axiosServices';

interface SupportFormProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const SupportForm: React.FC<SupportFormProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [showPreviews, setShowPreviews] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log('User Details: ', userDetails);
        setFormState({
          name: userDetails.first_name + ' ' + userDetails.last_name || '',
          email: userDetails.email || '',
          message: ''
        });
        console.log('Form State: ', formState);
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState, selectedFiles);
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });
    }
  };

  const renderFilePreview = (file: File, index: number) => {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      return <img src={filePreviews[index]} alt={file.name} className="w-full h-full object-cover rounded-lg" />;
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
              isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
            } shadow-2xl z-50 overflow-hidden flex flex-col`}
          >
            <div className={`flex justify-between items-center p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
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

                <button
                  type="button"
                  onClick={() => setShowPreviews(!showPreviews)}
                  className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 flex items-center justify-center ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  {showPreviews ? (
                    <>
                      <span>Hide Previews</span>
                      <FaEyeSlash className="ml-2" />
                    </>
                  ) : (
                    <>
                      <span>Show Previews</span>
                      <FaEye className="ml-2" />
                    </>
                  )}
                </button>

                {showPreviews && selectedFiles && (
                  <div className="space-y-4">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="border rounded-lg p-2 flex items-center space-x-4">
                        {renderFilePreview(file, index)}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 flex items-center justify-center ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  <span>Send Message</span>
                  <IoSendSharp className="ml-2" />
                </button>
              </form>
            </div>

            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mt-auto`}>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportForm;
