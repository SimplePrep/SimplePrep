import React from 'react';
import { AiOutlineEye, AiOutlineBarChart, AiOutlineComment, AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { TestResult } from '../../../auth_utils/types';

interface TestTableProps {
  testData: TestResult[];
  onPreviewClick: (index: number) => void;
  onAnalyticsClick: (index: number) => void;
  onDiscussionClick: (index: number) => void;
  isDarkMode: boolean;
}

type SortableColumns = 'id' | 'score' | 'updated_at' | 'testTitle';

const TestTable: React.FC<TestTableProps> = ({
  testData,
  onPreviewClick,
  onAnalyticsClick,
  onDiscussionClick,
  isDarkMode,
}) => {
  const [sortColumn, setSortColumn] = React.useState<SortableColumns>('id');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const sortedData = React.useMemo(() => {
    return [...testData].sort((a, b) => {
      let aValue: any, bValue: any;
      
      if (sortColumn === 'testTitle') {
        aValue = a.test_model.title;
        bValue = b.test_model.title;
      } else {
        aValue = a[sortColumn];
        bValue = b[sortColumn];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [testData, sortColumn, sortDirection]);

  const handleSort = (column: SortableColumns) => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const SortIcon = ({ column }: { column: SortableColumns }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <AiOutlineCaretUp className="ml-2 inline" /> : <AiOutlineCaretDown className="ml-2 inline" />;
  };

  return (
    <div className={`overflow-x-auto shadow-md rounded-lg ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border`}>
      <table className="min-w-full table-fixed text-left">
        <thead className={`border-b ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'}`}>
          <tr>
            <th onClick={() => handleSort('id')} className="py-4 px-6 w-1/12 text-base font-semibold uppercase tracking-wider cursor-pointer">
              ID <SortIcon column="id" />
            </th>
            <th onClick={() => handleSort('testTitle')} className="py-4 px-6 w-3/12 text-base font-semibold uppercase tracking-wider cursor-pointer">
              Test <SortIcon column="testTitle" />
            </th>
            <th onClick={() => handleSort('score')} className="py-4 px-6 w-2/12 text-base font-semibold uppercase tracking-wider cursor-pointer">
              Score <SortIcon column="score" />
            </th>
            <th onClick={() => handleSort('updated_at')} className="py-4 px-6 w-3/12 text-base font-semibold uppercase tracking-wider cursor-pointer">
              Date <SortIcon column="updated_at" />
            </th>
            <th className="py-4 px-6 w-3/12 text-base font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((test, index) => (
            <tr
              key={test.id}
              className={`transition duration-300 ease-in-out ${
                index % 2 === 0
                  ? isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                  : isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-900'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <td className="py-4 px-6 text-base font-medium">{test.id}</td>
              <td className="py-4 px-6 text-base font-medium">{test.test_model.title}</td>
              <td className="py-4 px-6 text-base font-medium">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    test.score >= 75
                      ? 'bg-green-200 text-green-800'
                      : test.score >= 50
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {test.score}%
                </span>
              </td>
              <td className="py-4 px-6 text-base font-medium">
                {new Date(test.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-4 items-center justify-center">
                  <button
                    onClick={() => onPreviewClick(index)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isDarkMode ? 'text-blue-400 hover:bg-blue-900 hover:text-blue-300' : 'text-blue-500 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <AiOutlineEye size={23} />
                    <span className="text-base">Preview</span>
                  </button>
                  <button
                    onClick={() => onAnalyticsClick(index)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isDarkMode ? 'text-green-400 hover:bg-green-900 hover:text-green-300' : 'text-green-500 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    <AiOutlineBarChart size={25} />
                    <span className="text-base">Analytics</span>
                  </button>
                  <button
                    onClick={() => onDiscussionClick(index)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isDarkMode ? 'text-purple-400 hover:bg-purple-900 hover:text-purple-300' : 'text-purple-500 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    <AiOutlineComment size={25} />
                    <span className="text-base">Discuss</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;