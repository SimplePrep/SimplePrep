import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      // Add your smoothScroll function or logic here
    }
  };

  useEffect(() => {
    const handleFooterPosition = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    handleFooterPosition();
    window.addEventListener('resize', handleFooterPosition);
    return () => window.removeEventListener('resize', handleFooterPosition);
  }, []);

  return (
    <footer className={`bg-gray-800 text-white py-8 ${isSticky ? 'fixed bottom-0 left-0 w-full' : 'relative'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <p className="text-gray-400">Email: alijon@beta-simpleprep.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <button onClick={() => handleScroll('/product')} className="hover:underline">
                  Product
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => handleScroll('/our-vision')} className="hover:underline">
                  Our Vision
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => handleScroll('/testimonials')} className="hover:underline">
                  Customers
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => handleScroll('/blogs')} className="hover:underline">
                  Blog
                </button>
              </li>
              <li className="mb-2">
                <button onClick={() => handleScroll('/demo')} className="hover:underline">
                  Demo
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md text-black mb-2 sm:mb-0 sm:mr-2"
              />
              <button
                type="submit"
                className="p-2 bg-[#00df9a] text-black rounded-md hover:bg-[#00bfa5]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Simple Prep. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
