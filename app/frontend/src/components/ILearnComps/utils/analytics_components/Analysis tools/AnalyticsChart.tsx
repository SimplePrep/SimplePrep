import React from 'react';

interface AnalyticsChartProps {
  value: number;
  maxValue: number;
  width?: number;
  height?: number;
  textSize?: string;
  isDarkMode?: boolean; // Control for dark mode
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  value,
  maxValue,
  width = 150,
  height = 150,
  textSize = '1.5rem',
  isDarkMode = false, // Default to light mode
}) => {
  const percentage = (value / maxValue) * 100;
  const size = Math.min(width, height);
  const strokeWidth = size * 0.12; // Adjust stroke size to fit better
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  // Define color choices
  const textColor = isDarkMode ? '#E3F2FD' : '#333'; // Change text color based on mode
  const circleBgColor = isDarkMode ? '#263238' : '#E0E0E0'; // Background circle color for both modes
  const innerCircleColor = isDarkMode ? '#424242' : '#FFFFFF'; // Change inner circle color in dark mode
  const gradientId = 'lightGradient'; // Single gradient for both modes

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        boxShadow: isDarkMode ? '0 6px 15px rgba(0, 0, 0, 0.7)' : '0 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '50%',
        background: innerCircleColor,
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9A8B" /> {/* Soft Coral */}
            <stop offset="100%" stopColor="#FFC3A0" /> {/* Soft Pink */}
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={circleBgColor}
          strokeWidth={strokeWidth}
        />

        {/* Percentage circle with gradient */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
          transform={`rotate(-90 ${center} ${center})`}
          strokeLinecap="round" // Smooth rounded ends for the stroke
        />

        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth * 1.7}
          fill={innerCircleColor} // Dynamic inner circle color
          style={{ transition: 'fill 0.3s ease-in-out' }}
        />
      </svg>

      {/* Percentage text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: textSize,
          fontWeight: 'bold',
          color: textColor, // Dynamic text color based on mode
          transition: 'color 0.3s ease-in-out',
          letterSpacing: '1px',
        }}
      >
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default AnalyticsChart;
