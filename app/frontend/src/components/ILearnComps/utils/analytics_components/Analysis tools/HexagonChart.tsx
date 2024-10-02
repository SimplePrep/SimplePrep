import React from 'react';

interface HexagonChartProps {
  value: number;
  size: number;
}

const HexagonChart: React.FC<HexagonChartProps> = ({ value, size = 200 }) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const hexRadius = size * 0.35;
  const waveRadius = size * 0.45;

  // Generate hexagon points
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const x = centerX + hexRadius * Math.cos(angle);
    const y = centerY + hexRadius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Generate precise wave path
  const generateWavePath = (offset: number, amplitude: number, frequency: number) => {
    const points = [];
    for (let i = 0; i <= 360; i += 1) {
      const angle = (i * Math.PI) / 180;
      const r = waveRadius + Math.sin(angle * frequency + offset) * amplitude;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      points.push(`${x} ${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFAA85" />
          <stop offset="100%" stopColor="#FF6781" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C2E33" />
          <stop offset="100%" stopColor="#1C1E22" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer waves */}
      <g>
        <path d={generateWavePath(0, size * 0.025, 6)} fill="url(#outerGradient)" opacity="0.5">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${centerX} ${centerY}`}
            to={`360 ${centerX} ${centerY}`}
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
        <path d={generateWavePath(Math.PI / 3, size * 0.02, 8)} fill="url(#outerGradient)" opacity="0.35">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${centerX} ${centerY}`}
            to={`-360 ${centerX} ${centerY}`}
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
        <path d={generateWavePath(Math.PI / 6, size * 0.015, 7)} fill="url(#outerGradient)" opacity="0.25">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${centerX} ${centerY}`}
            to={`360 ${centerX} ${centerY}`}
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Main hexagon */}
      <polygon
        points={hexPoints}
        fill="url(#innerGradient)"
        filter="url(#glow)"
      />

      {/* Inner hexagon for added depth */}
      <polygon
        points={hexPoints}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={size * 0.01}
        transform={`scale(0.95) translate(${size * 0.025}, ${size * 0.025})`}
      />

      {/* Value text */}
      <text
        x={centerX}
        y={centerY}
        fontSize={size * 0.28}
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        filter="url(#glow)"
      >
        {value}
      </text>
    </svg>
  );
};

export default HexagonChart;
