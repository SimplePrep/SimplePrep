import axiosInstance from './axiosInterceptor';
import { TestResult, Question, UserAnswer, TestReport, DetailedTestResult } from '../../Dashboard/types';

// Example function to get tests
export const getTests = async () => {
  try {
    const response = await axiosInstance.get('api/core/tests');
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};

interface Module {
    id: number;
    test: number;
    title: string;
    description: string;
    num_questions: number;
    created_at: string;
    updated_at: string;
}

export const getModules = async (testId: number): Promise<Module[]>  => {
    try{
        const response = await axiosInstance.get(`api/core/test-modules/${testId}`);
        return response.data
    } catch (error) {
        console.error('Error fetching test modules: ', error);
        throw error;
    }
};


interface TestModuleDetails {
  questions: Question[];
  user_answers: UserAnswer[];
}



  
  export const getQuestionsByModuleId = async (testModuleId: number): Promise<Question[]> => {
    try {
      const response = await axiosInstance.get(`api/core/questions/${testModuleId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };

  
  export const submitTestResult = async (userId: string, test_module_id: number) => {
    try {
      const response = await axiosInstance.post(`api/core/${userId}/test_modules/`, {
        test_module_id: test_module_id,
        score: 0
      });
      return response.data.id;
    } catch (error) {
      console.error('Error submitting test result:', error);
      throw error;
    }
  };

  export const submitUserAnswers = async (userId: string, moduleId: number, userAnswers: { questionId: number; selectedChoice: string; }[]) => {
    try {
      const userAnswersData = userAnswers.map(answer => ({
        question: answer.questionId,
        selected_option: answer.selectedChoice,
      }));
      await axiosInstance.post(`api/core/${userId}/test_module/${moduleId}/user_answers/`, userAnswersData);
    } catch (error) {
      console.error('Error submitting user answers:', error);
      throw error;
    }
  };
  
  export const submitAnswers = async (userId: string,  moduleId: number, userAnswers: { questionId: number; selectedChoice: string; }[], navigate: (path: string) => void) => {
    try {
      // Submit test result
      const testResultId = await submitTestResult(userId, moduleId);
  
      // Submit user answers
      await submitUserAnswers(userId, moduleId, userAnswers);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  export const getRecentTests = async (userId: string): Promise<TestResult[]> => {
    try {
      const response = await axiosInstance.get<TestResult[]>(`api/core/${userId}/test_modules/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent tests:', error);
      throw error;
    }
  };

  export const getTestModuleDetails = async (userId: string, testModuleId: number): Promise<TestModuleDetails> => {
    try {
      const response = await axiosInstance.get<TestModuleDetails>(`api/core/${userId}/test_module/${testModuleId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching test module details:', error);
      throw error;
    }
  };
  
  export const getTestReport = async ( userId:string, testResultId: number): Promise<TestReport> => {
    try {
      const response = await axiosInstance.get<TestReport>(`api/core/${userId}/test_report/${testResultId}/`);
      console.log('Response: ', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching test report:', error);
      throw error;
    }
  };
 
 