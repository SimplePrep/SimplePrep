import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { auth, db } from '../../../../auth_utils/firebaseConfig';
import { updateProfile, deleteUser } from 'firebase/auth';
import { getUserDetails, updateUserDetails } from '../../../../auth_utils/axios/axiosServices';
import Silver from '../../../../assets/silverIcon.png';
import Gold from '../../../../assets/goldIcon.png';
import Platinum from '../../../../assets/platinumIcon.png';
import { MdDataSaverOff } from 'react-icons/md';
import axios, { AxiosError } from 'axios';

interface AccountSettingsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AccountSettingsPopup: React.FC<AccountSettingsPopupProps> = ({ isVisible, onClose, isDarkMode }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [memberSince, setMemberSince] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserDetails();
        setUserDetails(userData);
        setMemberSince(new Date(userData.created_at).toLocaleDateString());
        setSubscriptionPlan(userData.subscription_type);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName });
        const [firstName, lastName] = displayName.split(' ');
        await updateUserDetails({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        });
        alert('Display name updated successfully');
        onClose();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error updating display name:', error.response?.data || error.message);
          alert('Error updating display name: ' + (error.response?.data?.message || error.message));
        } else {
          console.error('Unexpected error:', error);
          alert('An unexpected error occurred');
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        alert('Account deleted successfully');
        onClose();
      } catch (error) {
        if (error instanceof AxiosError){
          alert('Error deleting account: ' + error.message);
        }
      }
    }
  };

  const getSubscriptionIcon = (plan: string) => {
    switch (plan) {
      case 'Free':
        return Silver;
      case 'Nova+':
        return Gold;
      case 'Nova Pro':
        return Platinum;
      default:
        return null;
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
          <div className={`rounded-lg w-[800px] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-4 bg-[#2d3855] p-3 rounded-t-lg">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-blue-500">
                <IoClose size={24} />
              </button>
            </div>
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
                  <p className="text-sm font-medium">Member since: {memberSince}</p>
                </div>
              </div>
              <div className='w-1/2 flex flex-col gap-3'>
                <h1 className='font-bold text-lg'>Subscription Details</h1>
                <hr className='border-slate-400'/>
                <div className="mb-4 flex items-center">
                  <p className="text-sm font-medium">Subscription plan: {subscriptionPlan}</p>
                  {subscriptionPlan && (
                    <img
                      src={getSubscriptionIcon(subscriptionPlan)}
                      alt={`${subscriptionPlan} icon`}
                      className="w-8 h-8 ml-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-10 p-5">
              <button
                onClick={handleDeleteAccount}
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
                Save Change
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountSettingsPopup;
