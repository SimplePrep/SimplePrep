import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotFound from '../components/assets/404.png';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-20 h-screen bg-gray-200 font-roboto">
        <motion.img 
            src={NotFound} 
            alt="404 Not Found" 
            className="w-1/2 max-w-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            />
        <h1 className="text-6xl font-bold text-purple-600 mt-8">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
            We're sorry, the page you requested could not be found!
        </p>
        <p className="text-lg text-gray-500">
            please go back to the dashboard.
        </p>
        <div className='mt-5'>
            <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/" className="mt-6 px-4 py-2 bg-purple-600 text-white rounded">
                Dashboard
                </Link>
            </motion.div>
        </div>
    </div>
  );
};

export default NotFoundPage;
