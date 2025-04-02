export interface Question {
    id: number;
    text: string;
    category: string;
    responseType: 'effectiveness' | 'frequency';
    weight: number;
  }
  
  export interface UserData {
    name: string;
    email: string;
    company: string;
    industry: string;
    companySize: string;
  }
  
  export interface Assessment {
    id?: string;
    userData: UserData;
    responses: Record<number, number>;
    results?: AssessmentResults;
    createdAt?: Date;
  }
  
  export interface CategoryScore {
    name: string;
    score: number;
    maxScore: number;
    percentage: number;
  }
  
  export interface AssessmentResults {
    overallScore: number;
    categoryScores: Record<string, CategoryScore>;
    recommendations: string[];
  }