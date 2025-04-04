export interface IUser {
  id?: number;
  name: string;
  email: string;
  company: string;
  companySize: string;
  industry: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestion {
  id?: number;
  text: string;
  category: string;
  maxScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnswer {
  id?: number;
  value: number;
  questionId: number;
  assessmentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssessment {
  id?: number;
  userId: number;
  totalScore: number;
  averageScore: number;
  category: string;
  categoryScores?: {
    [key: string]: {
      score: number;
      average: number;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubmitAssessmentRequest {
  userData: {
    name: string;
    email: string;
    company: string;
    companySize: string;
    industry: string;
  };
  responses: {
    questionId: number;
    value: number;
  }[];
}

export interface ICategoryScore {
  total: number;
  count: number;
}

export interface ICategoryScores {
  [key: string]: ICategoryScore;
}

export interface IScoreResult {
  totalScore: number;
  averageScore: number;
  category: string;
  categoryScores: {
    [key: string]: {
      score: number;
      average: number;
    };
  };
}
