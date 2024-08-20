import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Nova from '../../../assets/nova_owl.png';

interface CalendarTestProps {
    testDates: Date[];
    isDarkMode: boolean;
  }
  
  const CalendarTest: React.FC<CalendarTestProps> = ({ testDates, isDarkMode }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  
    const renderMonth = (month: number, year: number) => {
      const daysInMonth = getDaysInMonth(month, year);
      const firstDay = new Date(year, month, 1).getDay();
      const weeks = Math.ceil((daysInMonth + firstDay) / 7);
  
      return (
        <div>
          <h2 className="text-lg font-bold text-center mb-2">
            {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="font-bold">
                {day}
              </div>
            ))}
          </div>
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex gap-[15px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - firstDay + 1;
                const isValid = day > 0 && day <= daysInMonth;
                const isTestDate = isValid && testDates.some(date => date.getDate() === day && date.getMonth() === month && date.getFullYear() === year);
  
                return (
                  <div
                    key={dayIndex}
                    className={`w-6 h-6 m-0.5 rounded-full flex items-center justify-center text-xs ${
                      isValid
                        ? isTestDate
                          ? 'bg-green-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-300'
                        : 'bg-transparent'
                    }`}
                  >
                    {isValid && (
                      isTestDate ? (
                        <FaCheckCircle className="text-white text-xs" />
                      ) : (
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {day}
                        </span>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`p-4 rounded-lg ${isDarkMode ? ' text-white' : ' text-gray-800'}`}
      >
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-bold">Test Dates Calendar</h2>
        </div>
        <div className="flex justify-center">
          {renderMonth(currentMonth, currentYear)}
        </div>
        <div className="mt-4 flex items-center justify-center">
          <img src={Nova} alt="Nova" className="w-24 h-24 mr-2" />
          <p>Prepare well for your upcoming tests!</p>
        </div>
        {testDates.length > 0 && (
          <p className="mt-2 text-blue-500 text-center">Upcoming test on {testDates[0].toLocaleDateString()}</p>
        )}
      </motion.div>
    );
  };
  
  

export default CalendarTest;
