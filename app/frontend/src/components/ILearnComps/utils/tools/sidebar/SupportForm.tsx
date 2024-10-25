import React, { useState, useEffect } from 'react';
import { X, Send, Upload, Eye, EyeOff, Trash2 } from 'lucide-react';
import { getUserDetails, sendSupportEmail } from '../../../../auth_utils/axios/axiosServices';

interface SupportFormProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

interface SupportFormData {
  name: string;
  email: string;
  message: string;
  files?: File[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/*', 'application/pdf', 'video/*', 'audio/*'];

const SupportForm = ({ isOpen, onClose, theme = 'light' }: SupportFormProps) => {
  const [formData, setFormData] = useState<SupportFormData>({
    name: '',
    email: '',
    message: '',
    files: []
  });
  const [previews, setPreviews] = useState<{ url: string; visible: boolean }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const { user } = await getUserDetails();
        setFormData(prev => ({
          ...prev,
          name: `${user.first_name} ${user.last_name}`.trim(),
          email: user.email
        }));
      } catch (error) {
        setNotification({
          show: true,
          type: 'error',
          message: 'Failed to load user details. Please fill in your information manually.'
        });
      }
    };

    if (isOpen) {
      loadUserDetails();
    }
  }, [isOpen]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidSize = file.size <= MAX_FILE_SIZE;
      const isValidType = ALLOWED_FILE_TYPES.some(type => {
        const [category] = type.split('/');
        return file.type.startsWith(category) || type === file.type;
      });

      if (!isValidSize || !isValidType) {
        setNotification({
          show: true,
          type: 'error',
          message: `${file.name} was rejected. Files must be under 5MB and of supported types.`
        });
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      files: [...(prev.files || []), ...validFiles]
    }));

    const newPreviews = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      visible: false
    }));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'files') {
          formDataToSend.append(key, value);
        }
      });
      
      formData.files?.forEach(file => {
        formDataToSend.append('files', file);
      });

      await sendSupportEmail(formDataToSend);
      setNotification({
        show: true,
        type: 'success',
        message: 'Your message has been sent successfully!'
      });

      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '', files: [] });
    setPreviews([]);
    setNotification({ show: false, type: 'success', message: '' });
  };

  const renderFilePreview = (file: File, previewUrl: string) => {
    const fileType = file.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return (
          <img 
            src={previewUrl} 
            alt={file.name} 
            className="w-full max-h-48 object-contain rounded-lg"
          />
        );
      case 'video':
        return (
          <video 
            src={previewUrl} 
            controls 
            className="w-full max-h-48 rounded-lg"
          />
        );
      case 'audio':
        return (
          <audio 
            src={previewUrl} 
            controls 
            className="w-full"
          />
        );
      default:
        return (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm">
              {file.name} ({(file.size / 1024).toFixed(1)}KB)
            </p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className={`w-full sm:max-w-xl h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-xl`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Contact Support</h2>
                <p className={`text-sm  mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  We're here to help. Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-base font-medium  mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    className={`w-full px-3 py-2   border border-gray-300 dark:border-gray-600 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500 '}`}
                  />
                </div>

                <div>
                  <label className={`block text-base font-medium  mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required
                    className={`w-full px-3 py-2   border border-gray-300 dark:border-gray-600 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500 '}`}
                  />
                </div>

                <div>
                  <label className={`block text-base font-medium  mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="How can we help you?"
                    required
                    className={`w-full px-3 py-2   border border-gray-300 dark:border-gray-600 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500 '}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium  mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Attachments</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      multiple
                      accept={ALLOWED_FILE_TYPES.join(',')}
                      className="hidden"
                      id="file-upload"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 
                      focus:ring-blue-500 transition-colors flex items-center gap-2
                       ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 ' : 'text-gray-700 hover:bg-gray-200 ' }`}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Files
                    </button>
                  </div>

                  {formData.files && formData.files.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className={`border  rounded-lg p-4  ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-400 bg-gray-100 '}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm truncate  ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{file.name}</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviews(prev =>
                                  prev.map((p, i) =>
                                    i === index ? { ...p, visible: !p.visible } : p
                                  )
                                )}
                                className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200 '}`}
                              >
                                {previews[index]?.visible ? 
                                  <EyeOff className="w-5 h-5" /> : 
                                  <Eye className="w-5 h-5" />
                                }
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    files: prev.files?.filter((_, i) => i !== index)
                                  }));
                                  setPreviews(prev => prev.filter((_, i) => i !== index));
                                }}
                                className={`p-2 rounded-full transition-colors text-red-500 ${theme === 'dark' ? 'hover:bg-gray-700 ' : 'hover:bg-gray-200 '}`}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          {previews[index]?.visible && (
                            <div className="mt-2">
                              {renderFilePreview(file, previews[index].url)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors
                disabled:opacity-70 disabled:cursor-not-allowed font-medium
                ${isSubmitting ? 'bg-blue-500' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {notification.show && (
              <div className={`mt-4 p-4 rounded-lg ${
                notification.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {notification.message}
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              By submitting this form, you agree to our{' '}
              <button className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button> and{' '}
              <button className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</button>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
