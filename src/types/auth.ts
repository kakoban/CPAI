export type AiFamiliarityLevel = 'beginner' | 'intermediate' | 'advanced' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface UserProfile {
  id: string;
  googleId?: string;
  email: string;
  displayName: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  role?: 'admin' | 'user';
  isVerified?: boolean;
  phone?: string;
  specialty?: string;
  aiLevel?: AiFamiliarityLevel;
  initialAiLevel?: AiFamiliarityLevel;
  classId?: string;
  classCode?: string;
  isOnboarded?: boolean;
  createdAt?: string;
}

export interface OnboardingPayload {
  fullName: string;
  phone: string;
  specialty: string;
  aiLevel: AiFamiliarityLevel;
  classCode?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: UserProfile;
  error?: string;
  message?: string;
}

export interface GoogleLoginPayload {
  googleId?: string;
  email: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  picture?: string;
}
