import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-6">
          {/* Newsletter Header Section */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-4">
              100% Free Newsletter
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
              Subscribe to Our Weekly Newsletter
            </h2>
            <p className="text-gray-600 mt-3 text-sm md:text-base">
              Join our free weekly newsletter and master your study techniques
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left side content */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-100">
                <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-4">
                  Join Us To Get Weekly Updates!
                </h3>
                <p className="text-base md:text-lg text-gray-600">
                  Every week, we send our best advice on:
                </p>
                <ul className="mt-4 space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    Proven study techniques and strategies
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    Time management tips and tricks
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-600">✓</span>
                    Exclusive study resources and templates
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <p className="font-medium text-gray-700">Get started with our free newsletter!</p>
                <div className="flex flex-col md:relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button className="mt-3 md:mt-0 md:absolute md:right-1 md:top-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors w-full md:w-auto">
                    <span>Subscribe Free</span>
                    <span className="ml-2">→</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  No credit card required. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Right side benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-bold text-xl mb-6 text-gray-900">What You'll Get:</h3>
              <div className="grid gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">📚 Weekly Study Guides</h4>
                  <p className="text-gray-600">Comprehensive guides on different study methods and techniques</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">⏰ Productivity Tips</h4>
                  <p className="text-gray-600">Time management strategies to help you study smarter, not harder</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">🎯 Focus Techniques</h4>
                  <p className="text-gray-600">Research-backed methods to improve concentration and memory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;