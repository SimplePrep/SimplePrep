import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend)

interface AnalyticsChartProps {
    value: number;
    maxValue: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({value, maxValue}) => {
    const normalizedValue = (value / maxValue) * 100;
    const data = {
        datasets: [
          {
            data: [normalizedValue, 100 - normalizedValue], // Value and remainder to make a full circle
            backgroundColor: ['#619efa', '#eff8ff'], // Color for value and remainder
            borderWidth: 0,
            borderRadius: 25,
          }
        ]
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 10,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          },
          datalabels: {
            display: false,
          },
        },
        elements: {
            arc: {
              borderWidth: 0,
              borderRadius: 25,
            }
          },
        cutout: '90%'
      };
      return (
        <div className="relative flex justify-center items-center w-64 h-32"> {/* Adjust the width and height as needed */}
          <Doughnut data={data} options={options} />
          <div className="absolute text-3xl font-semibold ">{`${value}%`}</div>
        </div>
      );
    };

export default AnalyticsChart;