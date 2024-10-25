import React, { useState, useEffect } from 'react';
import { Book, GraduationCap, Users, Mail } from 'lucide-react';
import SupportForm from '../ILearnComps/utils/tools/sidebar/SupportForm';

const Footer = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isSupportFormVisible, setIsSupportFormVisible] = useState(false); // Add state to control SupportForm visibility

  useEffect(() => {
    const handleFooterPosition = () => {
      setIsSticky(document.body.scrollHeight <= window.innerHeight);
    };

    handleFooterPosition();
    window.addEventListener('resize', handleFooterPosition);
    return () => window.removeEventListener('resize', handleFooterPosition);
  }, []);

  const handleDiscord = () => {
    window.open('https://discord.gg/HgKAgAhZZq', '_blank');
  };

  const toggleSupportForm = () => {
    setIsSupportFormVisible((prev) => !prev); // Toggle the visibility of SupportForm
  };

  return (
    <>
      <footer className={`bg-indigo-900 text-white py-8 ${isSticky ? 'fixed bottom-0 left-0 w-full' : 'relative'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Study Resources Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Study Resources
              </h3>
              <ul className="space-y-2 text-indigo-200">
                <li>
                  <a href="/demo/practice" className="hover:text-white transition-colors">
                    Practice Tests
                  </a>
                </li>
                <li>
                  <a href="/demo/tutorials" className="hover:text-white transition-colors">
                    Study Materials
                  </a>
                </li>
                <li>
                  <a href="/demo" className="hover:text-white transition-colors">
                    Question Bank
                  </a>
                </li>
              </ul>
            </div>

            {/* Student Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Support
              </h3>
              <ul className="space-y-2 text-indigo-200">
                <li>
                  <a href="/demo/tutorials" className="hover:text-white transition-colors">
                    1-on-1 Tutoring
                  </a>
                </li>
                <li>
                  <button onClick={handleDiscord} className="hover:text-white transition-colors">
                    Study Groups
                  </button>
                </li>
                <li>
                  <button onClick={toggleSupportForm} className="hover:text-white transition-colors">
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Book className="h-5 w-5" />
                Resources
              </h3>
              <ul className="space-y-2 text-indigo-200">
                <li>
                  <a href="/blogs" className="hover:text-white transition-colors">
                    SAT Prep Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Stay Updated Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-indigo-200 mb-4">
                Get the latest Digital SAT tips and updates delivered to your inbox.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-md text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-4">
                <a 
                  href="tel:1234567890" 
                  className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>alijon@beta-simpleprep.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-8 pt-8 border-t border-indigo-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-indigo-200">
                &copy; {new Date().getFullYear()} Simple Prep Digital SAT. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* SupportForm Modal */}
      <SupportForm 
        isVisible={isSupportFormVisible} 
        onClose={toggleSupportForm} 
        isDarkMode={false} 
      />
    </>
  );
};

export default Footer;
