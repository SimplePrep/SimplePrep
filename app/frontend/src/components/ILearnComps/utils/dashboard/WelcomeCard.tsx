import React, { useEffect, useState } from 'react';
import QuoteImg from '../../../assets/quoteImg.png';
import { getUserDetails } from '../../../auth_utils/axios/axiosServices';
import { UserDetails } from '../../../auth_utils/types';

const WelcomeCard = () => {
    const [displayedName, setDisplayedName] = useState<string>('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsResponse = await getUserDetails();
                const firstName = userDetailsResponse?.user?.first_name;
                
                if (firstName) {
                    typeFirstName(firstName);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    const typeFirstName = (name: string) => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < name.length) {
                setDisplayedName((prev) => prev + name[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    };

    return (
        <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-lg text-white'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold mb-4'>
                        Welcome Back, <span>{displayedName}</span>!
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
