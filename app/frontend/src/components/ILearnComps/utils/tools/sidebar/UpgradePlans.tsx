import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { auth } from '../../../../auth_utils/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { IoMdCheckmark } from "react-icons/io";
import Nova from '../../../../assets/nova_owl.png';
import { getUserDetails, updateUserDetails } from '../../../../auth_utils/axios/axiosServices';
import { BsFillLightningChargeFill, BsTrophy } from 'react-icons/bs';
import { LuCrown } from 'react-icons/lu';

const UpgradePlan: React.FC<{ isVisible: boolean; onClose: () => void; isDarkMode: boolean }> = ({ isVisible, onClose, isDarkMode }) => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserDetails();
        setSubscriptionPlan(userData.user.subscription_type);
      } catch (error) {
        console.error('Error fetching user subscription plan:', error);
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-montserrat p-4"
        >
          <div className={`w-full max-w-[800px] rounded-lg ${isDarkMode ? 'bg-[#1d263b] text-white' : 'bg-white text-gray-800'} max-h-[90vh] overflow-y-auto`}>
            <div className={`px-4 py-3 rounded-t-lg flex justify-between items-center  ${isDarkMode ? 'bg-[#2d3855]' : 'bg-gray-200'} sticky top-0 z-10`}>
              <h2 className="text-xl font-bold">Upgrade your plan</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-blue-500">
                <IoClose size={24} />
              </button>
            </div>
            <div className={` p-5 ${isDarkMode ? 'bg-[#1d263b]' : 'bg-gray-50'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
              {['Free', 'Nova+', 'Nova Pro'].map((plan) => (
                <div key={plan} className={`p-4 border ${isDarkMode ? ' border-slate-500' : 'border'} rounded-lg ${subscriptionPlan === plan ? (isDarkMode ? 'bg-[#2d3855]' : 'bg-blue-100') : ''} lg:max-w-full  sm:max-w-[150px]`}>
                  <div className='flex flex-row gap-3 items-center'>
                    {plan === 'Free' ? <BsFillLightningChargeFill size={22} color={'#00c088'} />
                        : plan === 'Nova+' ? <BsTrophy size={22} color={'#FFD700'}  />
                        : <LuCrown  size={25} color={'#fe5112'}  />}
                    <h1 className='text-lg font-bold'>
                      {subscriptionPlan === plan ? 'Current plan: ' : ''}
                      {plan}
                    </h1>
                  </div>
                  <p className={`text-sm ${isDarkMode ?  'text-slate-400' : 'text-slate-600'}`}>
                    {plan === 'Free' ? 'USD $0/month' : plan === 'Nova+' ? 'USD $12.99/month' : 'USD $24.99/month'}
                  </p>
                  {plan !== 'Free' && (
                    <button className='w-full mt-2 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold'>
                      {plan === 'Nova+' ? 'Purchase Nova+' : 'Coming soon!'}
                    </button>
                  )}
                  <div className='mt-5 flex flex-col gap-3'>
                    <p className='font-semibold'>What's included</p>
                    {/* Plan-specific features */}
                    {(plan === 'Free' ? [
                      'Access to Fremium Content',
                      'Limited Practice-based Learning',
                      'Limited Test Report Analysis use'
                    ] : plan === 'Nova+' ? [
                      'Unlimited Personalized learning',
                      'Practice-based learning',
                      'Access to freemium and premium tests',
                      'Unlimited Test Report Analysis use'
                    ] : [
                      'Everything in Nova+',
                      'Early Access to the latest features',
                      'Unlimited Nova use',
                      'Video Tutorials',
                      'Weekly Mock Exams'
                    ]).map((feature, index) => (
                      <div key={index} className='flex flex-row gap-3 items-center'>
                        <IoMdCheckmark size={20} />
                        <p className='text-sm'>{feature}</p>
                      </div>
                    ))}
                  </div>
                  {plan === 'Free' && (
                    <div className='flex flex-row items-center gap-3 mt-3'>
                      <img src={Nova} className='w-24 h-24' alt="" />
                      <p className='text-sm'>Introducing Nova, your SAT Prep Assistant</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradePlan;
