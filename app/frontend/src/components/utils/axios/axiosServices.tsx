import axiosInstance from './axiosInterceptor';


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

interface Question {
    id: number;
    test: number;
    model: string;
    section: string;
    title: string;
    context: string;
    query: string;
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
  
  export const getQuestionsByModuleId = async (testModuleId: number): Promise<Question[]> => {
    try {
      const response = await axiosInstance.get(`api/core/questions/${testModuleId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };

  
  export const submitTestResult = async (userId: string, testId: number) => {
    try {
      const response = await axiosInstance.post(`api/core/${userId}/test_modules/`, {
        test_id: testId,
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
  
  export const submitAnswers = async (userId: string, testId: number, moduleId: number, userAnswers: { questionId: number; selectedChoice: string; }[], navigate: (path: string) => void) => {
    try {
      // Submit test result
      const testResultId = await submitTestResult(userId, testId);
  
      // Submit user answers
      await submitUserAnswers(userId, moduleId, userAnswers);
  
      // Redirect to a completion page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };