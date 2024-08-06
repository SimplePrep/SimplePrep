import axiosInstance from './axiosInterceptor';
import { Chapter, Module, Post, Question, Reply, Section, SupportFormData, TestReport, TestResult, Tutorial, UserAnswer, UserDetails } from '../types';

export const getTests = async () => {
  try {
    const response = await axiosInstance.get('api/core/tests');
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};


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
};
  
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

  export const getPosts = async (testModuleId: number): Promise<Post[]> => {
    try {
      const response = await axiosInstance.get<Post[]>(`api/core/posts/${testModuleId}/`);
      return response.data;
    } catch(error){
      console.error('Error fetching posts: ', error);
      throw error;
    }
  };

  interface PostData {
    title: string;
    content: string;
    test_module: number;
  }
  
  interface ReplyData {
    content: string;
    author_uid: string;
  }

  export const addPost = async (postData: PostData, testModuleId: number): Promise<Post> => {
    try {
      const response = await axiosInstance.post<Post>(`api/core/posts/${testModuleId}/`, postData);
      return response.data;
    } catch(error){
      console.error('Error adding post: ', error);
      throw error;
    }
  };

  export const deletePost = async (postId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`api/core/posts/detail/${postId}/`);
    } catch(error) {
      console.error('Error deleting post: ', error);
      throw error;
    }
  };

  export const editPost = async (postId:number, updatedPostData: PostData): Promise<PostData> => {
    try {
      const response = await axiosInstance.put<PostData>(`api/core/posts/detail/${postId}/`, updatedPostData);
      return response.data;
    } catch(error) {
      console.error('Error editing post: ', error);
      throw error;
    }
  };

  export const addReply = async (postId: number, replyData: ReplyData): Promise<Reply> => {
    try {
      const response = await axiosInstance.post<Reply>(`api/core/replies/${postId}/`, replyData);
      return response.data;
    } catch(error){
      console.error('Error adding reply: ', error);
      throw error;
    }
  };

  export const deleteReply = async (replyId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`api/core/replies/detail/${replyId}/`);
    } catch(error){
      console.error('Error deleting reply: ', error);
      throw error;
    }
  };

  export const editReply = async (replyId: number, updatedReplyData: ReplyData): Promise<Reply> => {
    try {
      const response = await axiosInstance.put<Reply>(`api/core/replies/detail/${replyId}/`, updatedReplyData);
      return response.data;
    } catch(error) {
      console.error('Error editing reply: ', error);
      throw error;
    }
  };

  export const getTutorials = async (): Promise<Tutorial[]> => {
    try {
      const response = await axiosInstance.get<Tutorial[]>('/api/core2/tutorials/');
      return response.data;
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      throw error;
    }
  };
  
  export const getTutorial = async (tutorialId: number): Promise<Tutorial> => {
    try {
      const response = await axiosInstance.get<Tutorial>(`/api/core2/tutorials/${tutorialId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      throw error;
    }
  };
  
  export const getChapters = async (tutorialId: number): Promise<Chapter[]> => {
    try {
      const response = await axiosInstance.get<Chapter[]>(`/api/core2/tutorials/${tutorialId}/chapters/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  };
  
  export const getSections = async (chapterId: number): Promise<Section[]> => {
    try {
      const response = await axiosInstance.get<Section[]>(`/api/core2/chapters/${chapterId}/sections/`);
      console.log('Full API response for sections:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  }

  export const getSection = async (slug: string): Promise<Section> => {
    try {
      const response = await axiosInstance.get<Section>(`/api/core2/sections/${slug}/`);
      console.log('Full API response for section:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching section: ', error);
      throw error;
    }
  }

  
  export const getUserDetails = async () => {
    try{
      const response = await axiosInstance.get(`/auth/user/user-details`)
      return response.data;
    } catch(error){
      console.error('Error fetching section: ', error);
      throw error;
    }
  }

  export const updateUserDetails = async (userDetails: Partial<UserDetails>): Promise<any> => {
    try {
      const response = await axiosInstance.put('/auth/user/update-user', userDetails);
      return response;
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  };

  export const deleteUserProfile = async (): Promise<any> => {
    try {
      const response = await axiosInstance.delete('/auth/user/delete-account');
      return response;
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  };

  export const sendSupportEmail = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post('/api/send-support-email/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};