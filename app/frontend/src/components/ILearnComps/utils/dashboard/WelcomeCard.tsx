import React, { useEffect, useState } from 'react';
import QuoteImg from '../../../assets/quoteImg.png';
import { getUserDetails } from '../../../auth_utils/axios/axiosServices';
import { UserDetails } from '../../../auth_utils/types';

const WelcomeCard = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsResponse = await getUserDetails();
                setFirstName(userDetailsResponse.user.first_name);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoaded(true); 
            }
        };
        fetchUserDetails();
    }, []);


    return (
        <div
            className={`bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white transition-opacity duration-700 `}
        >
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold mb-4'>
                        Welcome Back, <span>{firstName}</span>!
                    </h1>
                    <div className='bg-white/20 p-4 rounded-xl backdrop-blur-sm'>
                        <h2 className='font-bold text-lg mb-2'>Quote of the day</h2>
                        <p className='text-sm italic'>
                            "Success is not final; Failure is not fatal: It is the Courage to continue that counts" - Winston S. Churchill
                        </p>
                    </div>
                </div>
                <img src={QuoteImg} alt="Quote Image" className='w-40 h-40 object-cover rounded-xl' />
            </div>
        </div>
    );
};

export default WelcomeCard;
