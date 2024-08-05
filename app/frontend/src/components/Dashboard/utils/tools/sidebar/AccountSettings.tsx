import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { auth } from '../../../../auth_utils/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import Silver from '../../../../assets/silverIcon.png';
import Gold from '../../../../assets/goldIcon.png';
import Platinum from '../../../../assets/platinumIcon.png';
import { MdDataSaverOff, MdErrorOutline } from 'react-icons/md';
import { getUserDetails, updateUserDetails, deleteUserProfile } from '../../../../auth_utils/axios/axiosServices';

interface AccountSettingsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AccountSettingsPopup: React.FC<AccountSettingsPopupProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [memberSince, setMemberSince] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [notification, setNotification] = useState('');
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.currentUser) {
        try {
          const userData = await getUserDetails();
          setUserDetails(userData.user);
          const createdAt = userData.user?.created_at;
          if (createdAt) {
            const parsedDate = new Date(createdAt);
            if (!isNaN(parsedDate.getTime())) {
              const options: Intl.DateTimeFormatOptions = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              };
              setMemberSince(parsedDate.toLocaleDateString('en-US', options));
            } else {
              console.error('Invalid date format for created_at:', createdAt);
            }
          } else {
            console.error('created_at is missing from user data');
          }
          setSubscriptionPlan(userData.user.subscription_type || 'Free');
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    if (!displayName.trim()) {
      setNotification('Profile Name cannot be empty');
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        // Update display name in Firebase Auth
        await updateProfile(user, { displayName });
        
        // Update backend database
        const [firstName, lastName] = displayName.split(' ');
        await updateUserDetails({ first_name: firstName, last_name: lastName, updated_at: new Date().toISOString() });
        
        // Show success popup
        setIsSuccessPopupVisible(true);
        setTimeout(() => {
          setIsSuccessPopupVisible(false);
          onClose();
        }, 3000);
      } catch (error) {
        // Handle the error appropriately
        alert('Error updating display name: ' + (error as Error).message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await deleteUserProfile();
        alert('Account deleted successfully');
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          alert('Error deleting profile: ' + error.message);
        } else {
          alert('An unexpected error occurred');
        }
      }
    }
  };

  const getSubscriptionIcon = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'free':
        return Silver;
      case 'nova+':
        return Gold;
      case 'nova pro':
        return Platinum;
      default:
        return null;
    }
  };

  const showDeleteConfirmation = () => {
    setIsDeleteConfirmVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setIsDeleteConfirmVisible(false);
  };

  const confirmDeleteAccount = () => {
    hideDeleteConfirmation();
    handleDeleteAccount();
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
          <div className={`rounded-lg w-[800px] ${isDarkMode ? 'bg-[#1d263b] text-white' : 'bg-slate-200 text-gray-800'}`}>
            <div className={`flex justify-between items-center mb-4  p-3 rounded-t-lg border-b-[1px] border-slate-400`}>
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-blue-500">
                <IoClose size={24} />
              </button>
            </div>
            <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-row items-center justify-center gap-3 max-w-xs mx-auto bg-slate-500 text-white p-2 mb-4 rounded"
                >
                  <MdErrorOutline size={20} />
                  {notification}
                </motion.div>
              )}
            </AnimatePresence>
            <div className='flex flex-row gap-10 p-4'>
              <div className='w-1/2 flex flex-col gap-3'>
                <h1 className='font-bold text-lg'>Personal Information</h1>
                <hr className='border-slate-400'/>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Profile Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`w-full p-2 border ${isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-gray-100 text-gray-800'} rounded-lg`}
                  />
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium">Member since</p>
                  <p className={`w-full p-2 border ${isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-gray-100 text-gray-800'} rounded-lg`}>
                    {memberSince}
                  </p>
                </div>
              </div>
              <div className='w-1/2 flex flex-col gap-3'>
                <h1 className='font-bold text-lg'>Subscription Details</h1>
                <hr className='border-slate-400'/>
                <div className="flex flex-col">
                  <p className="text-sm font-medium mb-2">Subscription plan</p>
                  <div className={`w-full flex flex-row gap-3 items-center p-2 border ${isDarkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-gray-100 text-gray-800'} rounded-lg`}>
                    {subscriptionPlan && (
                      <img
                        src={getSubscriptionIcon(subscriptionPlan)}
                        alt={`${subscriptionPlan} icon`}
                        className="w-8 h-8 ml-2"
                      />
                    )}
                    {subscriptionPlan}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-10 p-5">
              <button
                onClick={showDeleteConfirmation}
                className={`flex flex-row gap-1 items-center py-2 px-4 rounded ${isDarkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'} hover:bg-red-600`}
              >
                <IoTrashOutline size={20} />
                Delete account
              </button>
              <button
                onClick={handleSave}
                className={`flex flex-row gap-1 items-center py-2 px-4 rounded ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700`}
              >
                <MdDataSaverOff size={20} />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {isDeleteConfirmVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className={`rounded-lg w-[400px] ${isDarkMode ? 'bg-[#1d263b] text-white' : 'bg-slate-200 text-gray-800'}`}>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={confirmDeleteAccount}
                  className={`py-2 px-4 rounded ${isDarkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'} hover:bg-red-600 `}
                >
                  Delete Account
                </button>
                <button
                  onClick={hideDeleteConfirmation}
                  className={`py-2 px-4 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-gray-500`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {isSuccessPopupVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className={`rounded-lg w-[400px] ${isDarkMode ? 'bg-[#1d263b] text-white' : 'bg-slate-200 text-gray-800'}`}>
            <div className="p-4 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-500 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Congratulations</h2>
              <p className="mb-6">Profile has been updated successfully!</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsSuccessPopupVisible(false)}
                  className={`py-2 px-4 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-gray-700`}
                >
                  Got it
                </button>
                <button
                  onClick={onClose}
                  className={`py-2 px-4 rounded ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} hover:bg-blue-700`}
                >
                  Go home
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountSettingsPopup;
