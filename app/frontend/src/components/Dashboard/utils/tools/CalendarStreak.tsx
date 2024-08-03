import React from 'react';
import { FaFire } from 'react-icons/fa';
import Nova from '../../../assets/nova_owl.png';

const CalendarStreak: React.FC<{ streak: number; isDarkMode: boolean }> = ({ streak, isDarkMode }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

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
              const isStreak = isValid && month === currentMonth && day > today - streak && day <= today;
              const isToday = month === currentMonth && day === today;

              return (
                <div
                  key={dayIndex}
                  className={`w-6 h-6 m-0.5 rounded-full flex items-center justify-center text-xs ${
                    isValid
                      ? isToday
                        ? 'bg-blue-500 text-white'
                        : isStreak
                        ? 'bg-orange-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-300'
                      : 'bg-transparent'
                  }`}
                >
                  {isValid && (
                    isStreak ? (
                      <FaFire className="text-white text-xs" />
                    ) : (
                      <span className={isToday ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
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
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-bold">Streak Calendar</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 space-x-4">
        {renderMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentMonth - 1 < 0 ? currentYear - 1 : currentYear)}
        {renderMonth(currentMonth, currentYear)}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <img src={Nova} alt="Nova" className="w-24 h-24 mr-2" />
        <p>Wow, {streak}-day streak. Keep it going!</p>
      </div>
      <p className="mt-2 text-blue-500 text-center">1 freeze remaining</p>
    </div>
  );
};

export default CalendarStreak; 