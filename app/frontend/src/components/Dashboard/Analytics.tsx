import React, { useEffect, useState } from 'react';
import { BsMoon } from 'react-icons/bs';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Analysis from './utils/analytics_components/Analysis';
import TestCard from './utils/analytics_components/TestCardAnalysis';
import MiniTestModal from './utils/test_components/MiniTestModal';
import Discussion from './utils/Discussion';
import { useAuth } from '../utils/AuthProvider';
import { getRecentTests, getTestModuleDetails, getTestReport } from '../utils/axios/axiosServices';

interface TestResult {
  id: number;
  score: number;
  created_at: string;
  updated_at: string;
  test_model: {
    id: number;
    title: string;
  };
}

interface Question {
  id: number;
  model: string;
  section: string;
  title: string;
  context: string;
  query: string;
  explanation: string;
  graph_img?: string;
  option_A: string;
  option_B: string;
  option_C: string;
  option_D: string;
  correct_answer: string;
  likes: number;
  dislikes: number;
  created_at: string;
}

interface UserAnswer {
  questionId: number;
  selectedChoice: string;
}

interface TestReport {
  modules: {
    [key: string]: {
      sections: {
        [key: string]: {
          total_questions: number;
          correct_answers: number;
          incorrect_answers: number;
        };
      };
      total_questions: number;
      correct_answers: number;
      incorrect_answers: number;
    };
  };
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  suggestions: string[];
}

interface DetailedTestResult extends TestResult {
  questions?: Question[];
  user_answers?: UserAnswer[];
  report?: TestReport;
}

interface AnalyticsProps {
  isDarkMode: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ isDarkMode }) => {
  const { user } = useAuth();
  const [testData, setTestData] = useState<TestResult[]>([]);
  const [selectedTestEntry, setSelectedTestEntry] = useState<DetailedTestResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const Mode = isDarkMode ? ' text-white' : 'text-gray-800';
  let delayed: boolean;

  useEffect(() => {
    const fetchRecentTests = async () => {
      try {
        const data: TestResult[] = await getRecentTests(user!.uid);
        setTestData(data);
      } catch (error) {
        console.error('Error fetching recent tests:', error);
      }
    };

    fetchRecentTests();
  }, [user]);

  Chart.register(ChartDataLabels);
  useEffect(() => {
    const ctx = (document.getElementById('testScoresChart') as HTMLCanvasElement).getContext('2d');
    const scores = testData.map(entry => entry.score);
    if (ctx) {
      const testScoresChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: testData.map((entry) => new Date(entry.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
          datasets: [{
            label: 'Your Most Recent Scores from Practice Tests',
            data: scores,
            backgroundColor: scores.map(score => score < 500 ? '#9333ea' : '#22c55e'),
            borderColor: scores.map(score => score < 500 ? 'darkred' : 'darkgreen'),
            borderWidth: 1,
            datalabels: {
              align: 'end',
              anchor: 'end',
              formatter: (value, context) => {
                return testData[context.dataIndex].test_model.title;
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
                label: function (context) {
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
  }, [testData]);

  const handlePreviewClick = async (index: number) => {
    const selectedEntry = testData[index];
    try {
      const data = await getTestModuleDetails(user!.uid, selectedEntry.test_model.id);
      setSelectedTestEntry({ ...selectedEntry, questions: data.questions, user_answers: data.user_answers });
      setShowPreview(true);
    } catch (error) {
      console.error('Error fetching test module details:', error);
    }
  };

  const handleAnalyticsClick = async (index: number) => {
    const selectedEntry = testData[index];
    try {
      const report = await getTestReport(user!.uid, selectedEntry.id);
      setSelectedTestEntry({ ...selectedEntry, report });
      setShowAnalysis(true);
    } catch (error) {
      console.error('Error fetching test report:', error);
    }
  };

  const handleDiscussionClick = (index: number) => {
    const selectedEntry = testData[index];
    setSelectedTestEntry(selectedEntry);
    setShowDiscussion(true);
  };

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

      {showAnalysis && selectedTestEntry !== null && selectedTestEntry.report && (
        <Analysis data={selectedTestEntry.report} onClose={() => setShowAnalysis(false)} />
      )}
      {showPreview && selectedTestEntry !== null && (
        <MiniTestModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          questions={selectedTestEntry.questions || []}
          userAnswers={selectedTestEntry.user_answers || []}
        />
      )}
      {showDiscussion && selectedTestEntry !== null && <Discussion title={selectedTestEntry.test_model.title} onClose={() => setShowDiscussion(false)} />}
      <div className='py-20'>
        <p className='text-3xl font-semibold mb-2'>Recently Taken Tests</p>
        <p className='text-lg  mb-6'>
          Dive back into your practice journey with a quick glance at your most recent tests. Each test card offers a detailed review through <strong>Preview</strong> and insights into your performance with <strong>Analytics</strong>. Use these insights to focus your studies on areas needing improvement and celebrate your progress. Ready to see how you've been doing?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {testData.map((test, index) => (
          <TestCard
            key={index}
            id={test.id}
            date={new Date(test.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            title={test.test_model.title}
            score={test.score}
            borderColorIndex={index}
            onPreviewClick={() => handlePreviewClick(index)}
            onAnalyticsClick={() => handleAnalyticsClick(index)}
            onDiscussionClick={() => handleDiscussionClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
