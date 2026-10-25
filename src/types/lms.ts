import { AiFamiliarityLevel } from './auth';

export type Role = 'ADMIN' | 'STUDENT';

export type AlignmentIndex = 'Matches' | 'Below Tier' | 'Above Tier';

export type PerformanceBand = 'Low' | 'Proficient' | 'Mastery';

export interface ClassEntity {
  id: string;
  code: string;
  title: string;
  organization?: string;
  isLeaderboardVisible: boolean;
  studentCount?: number;
  testedCount?: number;
  averageScore?: number;
  createdAt: string;
  isAutoSlot?: boolean;
  slotWindowLabel?: string;
}

export interface SessionLockEntity {
  id: string;
  classId: string;
  sessionNum: number;
  title: string;
  isUnlocked: boolean;
}

export interface AssessmentResultEntity {
  id: string;
  userId: string;
  classId?: string;
  testedTier: AiFamiliarityLevel | string;
  rawScore: number;
  maxScore: number;
  percentage: number;
  alignmentIndex: AlignmentIndex;
  completedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  specialty?: string;
  avatarUrl?: string;
  testedTier: string;
  initialAiLevel?: string;
  score: number;
  maxScore: number;
  percentage: number;
  alignmentIndex: AlignmentIndex;
  completedAt: string;
}

export interface LeaderboardResponse {
  isLeaderboardVisible: boolean;
  classCode: string;
  message?: string;
  entries: LeaderboardEntry[];
  totalParticipants: number;
}

export interface UserRegistryItem {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  specialty?: string;
  role: string;
  trackId?: 'CIVIL_INFRA' | 'ENERGY_PETRO' | 'GENERAL_EVERYDAY';
  disciplineId?: string;
  roleId?: string;
  classId?: string;
  classCode?: string;
  classTitle?: string;
  initialAiLevel?: string;
  isOnboarded: boolean;
  assessmentResult?: {
    testedTier: string;
    rawScore: number;
    percentage: number;
    alignmentIndex: AlignmentIndex;
    completedAt: string;
  };
  createdAt: string;
}

export interface PlacementMatrixCell {
  count: number;
  percentage: number;
  students: Array<{ id: string; fullName: string; score: number }>;
}

export interface PlacementMatrixData {
  matrix: {
    BEGINNER: { Low: PlacementMatrixCell; Proficient: PlacementMatrixCell; Mastery: PlacementMatrixCell };
    INTERMEDIATE: { Low: PlacementMatrixCell; Proficient: PlacementMatrixCell; Mastery: PlacementMatrixCell };
    ADVANCED: { Low: PlacementMatrixCell; Proficient: PlacementMatrixCell; Mastery: PlacementMatrixCell };
  };
  totalAssessed: number;
  dunningKrugerCount: number; // Below tier
  highPotentialCount: number; // Above tier
  matchedCount: number; // Matches
}
