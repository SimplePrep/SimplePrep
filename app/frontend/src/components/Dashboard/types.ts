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
  
  export interface UserAnswer {
    questionId: number;
    selectedChoice: string;
  }
  
  export interface TestResult {
    id: number;
    score: number;
    created_at: string;
    test_model: {
      id: number;
      title: string;
    };
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

export interface TestReport {
    modules: {
        [key: string]: ModuleData;
    };
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
    suggestions: string[];
}
  
  export interface DetailedTestResult extends TestResult {
    questions?: Question[];
    user_answers?: UserAnswer[];
    report?: TestReport;
  }
  