// types.ts
export interface Question {
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
  
  export interface TestResult {
    id: number;
    score: number;
    created_at: string;
    updated_at: string;
    test_model: {
      id: number;
      title: string;
    };
  }

  export interface UserAnswer {
    id: number;
    test_result: number;
    question: number;
    selected_option: string;
  }

  export interface SectionData {
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
}
  
  export interface ModuleData {
    sections: Record<string, SectionData>;
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
}


  
export interface TestReportData {
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
  suggestions: string[];
  correct_answers: number;
  total_questions: number;
  incorrect_answers: number;
}

export interface TestReport {
  id: number;
  test_result: number;
  report_data: TestReportData;
  created_at: string;
  updated_at: string;
}

export interface DetailedTestResult extends TestResult {
  questions?: Question[];
  user_answers?: UserAnswer[];
  report?: TestReport;
}

export interface Reply {
  id: number;
  author: string;
  author_uid: string;
  content: string;
  date: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  author_uid: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  replies: Reply[];
}
