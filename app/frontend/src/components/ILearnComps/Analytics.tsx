import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Analysis from './utils/analytics_components/Analysis';
import TestCard from './utils/analytics_components/TestCardAnalysis';
import MiniTestModal from './utils/test_components/MiniTestModal';
import Discussion from './utils/Discussion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import { DetailedTestResult, TestResult } from '../auth_utils/types';
import { SlQuestion } from 'react-icons/sl';
import PerformanceDashboard from './utils/analytics_components/PerformanceElements';
import RadarChart from './utils/analytics_components/RadarChart';
import TestTable from './utils/analytics_components/TestTable';

interface AnalyticsProps {
  isDarkMode: boolean;
}

// Dummy data for local testing
const dummyTestData: TestResult[] = [
  {
    id: 1,
    score: 85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 101, title: 'Math Practice Test 1' }
  },
  {
    id: 2,
    score: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 102, title: 'Reading Practice Test 2' }
  },
  {
    id: 3,
    score: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 103, title: 'Writing Practice Test 3' }
  },
  {
    id: 4,
    score: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 101, title: 'Math Practice Test 1' }
  },
  {
    id: 5,
    score: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 102, title: 'Reading Practice Test 2' }
  },
  {
    id: 6,
    score: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    test_model: { id: 103, title: 'Writing Practice Test 3' }
  }
];

const dummyDetailedTestResult: DetailedTestResult = {
  id: 1,
  score: 85,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  test_model: { id: 101, title: 'Math Practice Test 1' },
  questions: [
    {
      id: 1,
      test: 101,
      model: 'multiple_choice',
      section: 'Math Section 1',
      title: 'Question 1',
      context: 'What is 2 + 2?',
      query: 'Choose the correct answer.',
      graph_img: '',
      option_A: '3',
      option_B: '4',
      option_C: '5',
      option_D: '6',
      explanation: 'The correct answer is 4.',
      correct_answer: 'B',
      likes: 10,
      dislikes: 2,
      created_at: new Date().toISOString()
    }
  ],
  user_answers: [
    { id: 1, test_result: 1, question: 1, selected_option: 'B' }
  ],
  report: {
    id: 1,
    test_result: 1,
    report_data: {
      modules: {
        'Math Module': {
          sections: {
            'Section 1': {
              total_questions: 10,
              correct_answers: 8,
              incorrect_answers: 2
            }
          },
          total_questions: 10,
          correct_answers: 8,
          incorrect_answers: 2
        }
      },
      suggestions: ['Review basic arithmetic.'],
      correct_answers: 8,
      total_questions: 10,
      incorrect_answers: 2
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

const Analytics: React.FC<AnalyticsProps> = ({ isDarkMode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [testData, setTestData] = useState<TestResult[]>([]);
  const [selectedTestEntry, setSelectedTestEntry] = useState<DetailedTestResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Mode = isDarkMode ? 'text-white' : 'text-gray-800';

  // Toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Use dummy data instead of making an API call
      const fetchRecentTests = async () => {
        setTestData(dummyTestData);
      };
      fetchRecentTests();
    }
  }, [isAuthenticated]);

  Chart.register(ChartDataLabels);

  useEffect(() => {
    if (testData.length > 0) {
      const canvas = document.getElementById('testScoresChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error("Canvas element not found");
        return; // Exit if canvas doesn't exist
      }
  
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error("Failed to get 2D context from canvas");
        return; // Exit if getContext fails
      }
  
      // Set chart background and text colors dynamically based on isDarkMode
      const chartBackgroundColor = isDarkMode ? '' : '#FFFFFF';
      const chartTextColor = isDarkMode ? '#E0E0E0' : '#333'; // Light color for dark mode, dark color for light mode
  
      // Apply background color directly to the canvas
      canvas.style.backgroundColor = chartBackgroundColor;
  
      // Create a gradient for the line (smooth gradient effect from blue to teal)
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(86, 204, 242, 1)'); // Light Blue (#56CCF2)
      gradient.addColorStop(1, 'rgba(47, 128, 237, 1)'); // Darker Blue (#2F80ED)
  
      const scores = testData.map(entry => entry.score);
  
      const testScoresChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: testData.map((entry) =>
            new Date(entry.updated_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          ),
          datasets: [
            {
              label: 'Test Scores',
              data: scores,
              fill: true,
              backgroundColor: 'rgba(86, 204, 242, 0.2)', // Subtle fill under the line for glow effect
              borderColor: gradient, // Gradient line color
              borderWidth: 3, // Thicker line for better visibility
              pointBackgroundColor: '#FFFFFF', // White center for points
              pointBorderColor: '#2F80ED', // Blue outline for points to match the line
              pointRadius: 5, // Size of the points on the line
              pointHoverRadius: 8, // Larger point size on hover
              tension: 0.4, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Hide legend for cleaner look
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              bodyColor: '#fff',
              borderColor: '#333',
              borderWidth: 1,
              displayColors: false, // Remove color box in tooltip
              callbacks: {
                label: (context) => {
                  const score = context.raw as number;
                  const entry = testData[context.dataIndex];
                  return `Title: ${entry.test_model.title}\nScore: ${score}`;
                },
              },
            },
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              grid: {
                display: false, // Hide the x-axis grid
              },
              ticks: {
                color: chartTextColor, // Dynamic color for x-axis labels
                font: {
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Transparent grid lines
              },
              ticks: {
                color: chartTextColor, // Dynamic color for y-axis labels
                font: {
                  size: 12,
                },
                stepSize: 10, // Customize y-axis steps
              },
            },
          },
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
          },
          animation: {
            duration: 1000, // Smooth line animation on load
            easing: 'easeInOutQuart', // Easing function for a smoother appearance
          },
        },
      });
  
      return () => testScoresChart.destroy(); // Cleanup on component unmount
    }
  }, [testData, isDarkMode]);
  

  const handlePreviewClick = async (index: number) => {
    const selectedEntry = testData[index];
    // Use dummy detailed test result for preview
    setSelectedTestEntry({ ...selectedEntry, questions: dummyDetailedTestResult.questions, user_answers: dummyDetailedTestResult.user_answers });
    setShowPreview(true);
  };

  const handleAnalyticsClick = async (index: number) => {
    const selectedEntry = testData[index];
    // Use dummy report for analytics
    setSelectedTestEntry({ ...selectedEntry, report: dummyDetailedTestResult.report });
    setShowAnalysis(true);
  };

  const handleDiscussionClick = (index: number) => {
    const selectedEntry = testData[index];
    setSelectedTestEntry(selectedEntry);
    setShowDiscussion(true);
  };

  return (
    <div className={`max-w-[1300px] mx-auto px-6 py-12 ${Mode} font-space-grotesk`}>
      {testData.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Performance Dashboard</h1>
            <p className="text-gray-600 mb-6">This page helps you track your progress, view test scores, and identify areas for improvement.</p>
            <p className="text-gray-600 mb-8">To get started, take a test from the dashboard. Once completed, come back here to view your results.</p>
            <Link to='/demo/dashboard'>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>

          <div className="pt-16">
            <div className='flex flex-col'>
                <div className="flex flex-row gap-3 items-center pb-2">
                  <h2 className="text-2xl font-semibold">Your Performance Dashboard</h2>
                  <SlQuestion size={25} className="cursor-pointer" onClick={toggleModal} />
                </div>
                <p className={`text-lg ${isDarkMode ? 'text-slate-300': 'text-slate-500'}`}>Overview of your most recent versus previous attempts accross DSAT Reading, Writing, and Overall Categories</p>
              </div>
          </div>
            
          <div className="flex flex-col lg:flex-row justify-between py-10 gap-8">
            {/* Left Side: Radar Chart */}
            <div className="flex flex-col w-full lg:w-1/3">
              <RadarChart isDarkMode={isDarkMode} />
            </div>

            {/* Right Side: Performance and Line Chart */}
            <div className="flex flex-col w-full lg:w-2/3">
              <PerformanceDashboard isDarkMode={isDarkMode} />

              {/* Chart should be placed under this section */}
              <div className="flex justify-center items-center pt-5">
                <div
                  className={`w-full lg:w-[900px] mx-auto shadow-lg rounded-xl p-6 border-[1px] ${
                    isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'
                  }`}
                >
                  <canvas id="testScoresChart" className="w-full h-full"></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
  <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ease-in-out">
    <div className="relative bg-white w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out">
      {/* Modal Content */}
      <div className="px-10 py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600 text-base mb-8">
          Get personalized insights, track your progress, and explore detailed analytics to enhance your learning experience.
        </p>

        {/* Feature List */}
        <div className="space-y-6">
          {/* Performance Analytics */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Performance Analytics
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Monitor your progress over time with intuitive, data-driven insights.
              </p>
            </div>
          </div>

          {/* Personalized Insights */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Personalized Insights
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Receive tailored recommendations to enhance your study plan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Action Button */}
      <div className="bg-gray-50 px-10 py-6 rounded-b-3xl">
        <button
          onClick={toggleModal}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-medium rounded-full py-3 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Started
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={toggleModal}
        className="absolute top-5 right-5 text-blue-600 hover:text-gray-600 transition-colors duration-300 bg-slate-300 rounded-full p-1"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
)}


          {showAnalysis && selectedTestEntry?.report && (
            <Analysis data={selectedTestEntry.report.report_data} onClose={() => setShowAnalysis(false)} />
          )}
          {showPreview && selectedTestEntry && (
            <MiniTestModal
              isOpen={showPreview}
              onClose={() => setShowPreview(false)}
              questions={selectedTestEntry.questions || []}
              userAnswers={selectedTestEntry.user_answers || []}
            />
          )}
          {showDiscussion && selectedTestEntry && (
            <Discussion
              title={selectedTestEntry.test_model.title}
              testModuleId={selectedTestEntry.test_model.id}
              onClose={() => setShowDiscussion(false)}
            />
          )}
        </>
      )}

      {testData.length > 0 && (
        <div className='py-10'>
          <p className='text-2xl font-semibold mb-2'>Recently Taken Tests</p>
          <p className={`text-lg ${isDarkMode ? 'text-slate-300': 'text-slate-500'}`}>
            Explore your most recent tests. Each test card offers detailed reviews with <strong>Preview</strong> and insights into performance with <strong>Analytics</strong>. Use these insights to improve and celebrate your progress.
          </p>
        </div>
      )}
      <TestTable
            testData={testData}
            onPreviewClick={handlePreviewClick}
            onAnalyticsClick={handleAnalyticsClick}
            onDiscussionClick={handleDiscussionClick}
            isDarkMode={isDarkMode}
          />

          {/* Modals */}
          {showPreview && selectedTestEntry && (
            <MiniTestModal
              isOpen={showPreview}
              onClose={() => setShowPreview(false)}
              questions={selectedTestEntry.questions || []}
              userAnswers={selectedTestEntry.user_answers || []}
            />
          )}

          {showAnalysis && selectedTestEntry?.report && (
            <Analysis data={selectedTestEntry.report.report_data} onClose={() => setShowAnalysis(false)} />
          )}

          {showDiscussion && selectedTestEntry && (
            <Discussion
              title={selectedTestEntry.test_model.title}
              testModuleId={selectedTestEntry.test_model.id}
              onClose={() => setShowDiscussion(false)}
            />
          )}
    </div>
  );
};

export default Analytics;
