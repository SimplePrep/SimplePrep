import React, {useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Analysis from './utils/analytics_components/Analysis';
import TestCard from './utils/analytics_components/TestCardAnalysis';
import MiniTestModal from './utils/test_components/MiniTestModal';
import Discussion from './utils/Discussion';



interface TestEntry {
    id: number;
    title: string;
    date: string;
    type: 'Freemium' | 'Premium'; 
    score: number;
    testName: string;
    suggestions: string[];
  }
  
  // Sample data
  const testData: TestEntry[] = [
    {
        id: 1,
        title: 'Practice Test 1',
        date: 'Apr 20',
        type: 'Freemium',
        score: 450,
        testName: 'FT1',
        suggestions: [
            "Focus on time management to complete tests more efficiently.",
            "Review algebraic expressions and equations for better understanding."
        ],
    },
    {
        id: 2,
        title: 'Practice Test 2',
        date: 'Apr 20',
        type: 'Freemium',
        score: 550,
        testName: 'FT2',
        suggestions: [
            "Practice reading comprehension to improve scores in verbal sections.",
            "Consider revisiting basic geometry principles."
        ],
    },
    {
        id: 3,
        title: 'Practice Test 3',
        date: 'Apr 22',
        type: 'Freemium',
        score: 650,
        testName: 'FT3',
        suggestions: [
            "Excellent work on quantitative sections! Try more complex problems to challenge yourself.",
            "Explore advanced vocabulary study methods to enhance verbal scores."
        ],
    },
    {
        id: 4,
        title: 'Practice Test 4',
        date: 'Apr 23',
        type: 'Freemium',
        score: 250,
        testName: 'FT4',
        suggestions: [
            "Begin with foundational math concepts to build up to higher difficulty levels.",
            "Engage in daily reading to improve comprehension and analysis skills."
        ],
    },
    {
        id: 5,
        title: 'Practice Test 5',
        date: 'Apr 23',
        type: 'Freemium',
        score: 250,
        testName: 'FT4',
        suggestions: [
            "Begin with foundational math concepts to build up to higher difficulty levels.",
            "Engage in daily reading to improve comprehension and analysis skills."
        ],
      },
];
    
  interface AnalyticsProps {
    isDarkMode: boolean;
  }

  const Analytics: React.FC<AnalyticsProps> = ({isDarkMode}) => {
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [selectedTestEntry, setSelectedTestEntry] = useState<TestEntry | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showDiscussion, setShowDiscussion] = useState(false);
    const Mode = isDarkMode ? ' text-white' : 'text-gray-800';
    let delayed: boolean;

    Chart.register(ChartDataLabels);
    useEffect(() => {
      const ctx = (document.getElementById('testScoresChart') as HTMLCanvasElement).getContext('2d');
      const scores = testData.map(entry => entry.score);
      if (ctx) {
        const testScoresChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: testData.map((entry) => entry.date),
            datasets: [{
              label: 'Your Most Recent Scores from Practice Tests',
              data: testData.map((entry) => entry.score),
              backgroundColor: scores.map(score => score < 500 ? '#9333ea' : '#22c55e'), // Highlight scores below 500 in red
              borderColor: scores.map(score => score < 500 ? 'darkred' : 'darkgreen'),
              borderWidth: 1,
              datalabels: {
                align: 'end',
                anchor: 'end',
                formatter: (value, context) => {
                  return testData[context.dataIndex].testName;
                }
              }
            }],
          },
          options: {
            scales: {
                x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true
                  }
            },
            plugins: {
              tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                      const score = context.raw as number;
                      const performance = score < 500 ? "Poor" : "Good";
                      return `Score: ${score} (${performance})`;
                    }
                }
              },
            datalabels: {
                color: '#444', 
                display: true,
                font: {
                weight: 'bold'
                }
            }
            },
            onClick: (event, elements, chart) => {
                if (elements.length) {
                  const firstElement = elements[0];
                  const index = firstElement.index;
                  const selectedEntry = testData[index]; 
                  setSelectedTestEntry(selectedEntry);
                  setShowAnalysis(true); 
                }
              },
              animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                }
              }
            }
        });
        return () => testScoresChart.destroy();
      }
    }, []); 

      const handlePreviewClick = (index: number) => {
        const selectedEntry = testData[index]
        setSelectedTestEntry(selectedEntry);
        setShowPreview(true);
      };
    
      const handleAnalyticsClick = (index: number) => {
        const selectedEntry = testData[index];
        setSelectedTestEntry(selectedEntry);
        setShowAnalysis(true);
      };

      const handleDiscussionClick = (index: number) => {
        const selectedEntry = testData[index];
        setSelectedTestEntry(selectedEntry);
        setShowDiscussion(true);
      }
    
  
    return (
        <div className={`max-w-[1400px] mx-auto p-20 ${Mode}`}>
            <div className="mb-8 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold ">Welcome to Your Performance Dashboard</h2>
                <p className="mt-2 text-lg ">Here, you can track your progress, view your test scores over time, and identify areas for improvement. Let's get started!</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className="flex justify-center items-center bg-slate-100 rounded-xl" style={{ width: '850px', height: '550px' }}>
                    <canvas id="testScoresChart" className='w-full h-full mx-10 '></canvas>
                </div>
            </div>
            
            {showAnalysis && selectedTestEntry !== null && <Analysis data={selectedTestEntry} onClose={() => setShowAnalysis(false)} />}
            {showPreview && <MiniTestModal onClose={() => setShowPreview(false)} />}
            {showDiscussion && selectedTestEntry !== null && <Discussion title= {selectedTestEntry.title} onClose={() => setShowDiscussion(false)} />}
            <div className='py-20'>
                <p className='text-3xl font-semibold mb-2'>Recently Taken Tests</p>
                <p className='text-lg  mb-6'>
                    Dive back into your practice journey with a quick glance at your most recent tests. Each test card offers a detailed review through <strong>Preview</strong> and insights into your performance with <strong>Analytics</strong>. Use these insights to focus your studies on areas needing improvement and celebrate your progress. Ready to see how you've been doing?
                </p>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {testData.map((test, index) => (
                    <TestCard
                    key={index}
                    id={test.id}
                    date={test.date}
                    title={test.title}
                    score={test.score}
                    borderColorIndex={index}
                    onPreviewClick={() => handlePreviewClick(index)}
                    onAnalyticsClick={() => handleAnalyticsClick(index)}
                    onDiscussionClick = {() => handleDiscussionClick(index)}
                    />
                ))}
            </div>
        </div>
    )

  };



  

export default Analytics