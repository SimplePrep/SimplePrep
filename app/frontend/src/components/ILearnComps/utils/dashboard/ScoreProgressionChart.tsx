import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface OverallPerformanceChartProps {
  isDarkMode: boolean;
}

type PeerGroup = 'average' | 'top25' | 'top10';

const OverallPerformanceChart: React.FC<OverallPerformanceChartProps> = ({ isDarkMode }) => {
  const [peerGroup, setPeerGroup] = useState<PeerGroup>('average');

  const textColor = isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)';
  const gridColor = isDarkMode ? 'rgba(226, 232, 240, 0.1)' : 'rgba(30, 41, 59, 0.1)';

  const readingData = [62, 65, 70, 75, 80];
  const writingData = [58, 60, 65, 68, 72];
  const overallData = readingData.map((reading, index) => (reading + writingData[index]) / 2);

  const peerData = {
    average: {
      reading: [60, 63, 67, 71, 74],
      writing: [56, 60, 64, 67, 71],
    },
    top25: {
      reading: [68, 71, 75, 78, 81],
      writing: [64, 68, 72, 75, 78],
    },
    top10: {
      reading: [75, 78, 82, 85, 88],
      writing: [71, 75, 79, 82, 85],
    },
  };

  const getPeerOverallData = (group: PeerGroup) => {
    return peerData[group].reading.map((reading, index) => 
      (reading + peerData[group].writing[index]) / 2
    );
  };

  const data: ChartData<'line'> = {
    labels: ['Aug 1', 'Aug 8', 'Aug 15', 'Aug 22', 'Aug 29'],
    datasets: [
      {
        label: 'Your Performance',
        data: overallData,
        borderColor: 'rgb(59, 130, 246)', // Bright blue
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderWidth: 4,
        pointRadius: 6,
        pointStyle: 'circle',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        tension: 0.3,
        fill: {
          target: 'origin',
          above: 'rgba(59, 130, 246, 0.05)',
        },
      },
      {
        label: `Peer ${peerGroup === 'average' ? 'Average' : peerGroup === 'top25' ? 'Top 25%' : 'Top 10%'}`,
        data: getPeerOverallData(peerGroup),
        borderColor: 'rgb(220, 38, 38)', // Red
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        borderWidth: 3,
        pointRadius: 5,
        pointStyle: 'triangle',
        pointBackgroundColor: 'rgb(220, 38, 38)',
        tension: 0.3,
        fill: {
          target: 'origin',
          above: 'rgba(220, 38, 38, 0.03)',
        },
        borderDash: [5, 5],
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        ticks: {
          color: textColor,
          callback: (value) => `${value}%`,
        },
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: 'Score (%)',
          color: textColor,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: 'Practice Test Date',
          color: textColor,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Practice Test Performance',
        color: textColor,
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
        bodyColor: isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
        borderColor: isDarkMode ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
        borderWidth: 1,
        padding: 12,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            if (context.dataset.label === 'Your Performance') {
              return [
                `Overall: ${context.parsed.y.toFixed(1)}%`,
                `Reading: ${readingData[index]}%`,
                `Writing: ${writingData[index]}%`
              ];
            } else {
              return [
                `Peer Overall: ${context.parsed.y.toFixed(1)}%`,
                `Peer Reading: ${peerData[peerGroup].reading[index]}%`,
                `Peer Writing: ${peerData[peerGroup].writing[index]}%`
              ];
            }
          },
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    transition: 'background-color 0.3s',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? 'rgb(67 56 202)' : 'rgb(67 56 202)',
    color: 'white',
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.1)',
    color: textColor,
  };

  return (
    <div className=''>
      <div className='flex flex-row justify-end' style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setPeerGroup('average')} 
          style={peerGroup === 'average' ? activeButtonStyle : inactiveButtonStyle}
        >
          Average
        </button>
        <button 
          onClick={() => setPeerGroup('top25')} 
          style={peerGroup === 'top25' ? activeButtonStyle : inactiveButtonStyle}
        >
          Top 25%
        </button>
        <button 
          onClick={() => setPeerGroup('top10')} 
          style={peerGroup === 'top10' ? activeButtonStyle : inactiveButtonStyle}
        >
          Top 10%
        </button>
      </div>
      <div className='h-64'>
        <Line data={data} options={options}/>
      </div>
    </div>
  );
};

export default OverallPerformanceChart;