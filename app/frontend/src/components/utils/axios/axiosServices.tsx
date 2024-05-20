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