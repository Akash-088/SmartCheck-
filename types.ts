
export interface AnalysisResult {
  score: number;
  missingSkills: string[];
  suggestions: {
    category: string;
    description: string;
  }[];
  overview: string;
}

export type ViewState = 'home' | 'analyzer';

export interface UserProfile {
  name: string;
  email: string;
  age?: string;
  occupation?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserProfile;
}
