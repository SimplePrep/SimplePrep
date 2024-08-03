import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { auth } from '../../../../auth_utils/firebaseConfig';
import { updateProfile } from 'firebase/auth';

interface AccountSettingsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AccountSettingsPopup: React.FC<AccountSettingsPopupProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');

  const handleSave = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, { displayName })
        .then(() => {
          alert('Display name updated successfully');
          onClose();
        })
        .catch((error) => {
          alert('Error updating display name: ' + error.message);
        });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className={`p-4 rounded-lg w-11/12 max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Account Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full">
                <IoClose size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`w-full p-2 border ${isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-gray-100 text-gray-800'} rounded-lg`}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className={`py-2 px-4 rounded ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700`}
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountSettingsPopup;
