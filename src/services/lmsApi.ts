import { authApi } from './authApi';
import {
  AssessmentResultEntity,
  LeaderboardResponse,
  SessionLockEntity,
  UserRegistryItem,
  PlacementMatrixData,
  ClassEntity
} from '../types/lms';

export interface AdminOverviewResponse {
  classes: ClassEntity[];
  users: UserRegistryItem[];
  placementMatrix: PlacementMatrixData;
  sessionLocks: SessionLockEntity[];
}

class LmsApiService {
  private getHeaders(): Record<string, string> {
    const token = authApi.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Submit diagnostic quiz assessment result to calculate Tier Alignment Index
   */
  async submitAssessment(payload: {
    testedTier: string;
    rawScore: number;
    maxScore: number;
    percentage: number;
  }): Promise<{ success: boolean; result?: AssessmentResultEntity; error?: string }> {
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      console.error('Failed to submit assessment:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Fetch competitive leaderboard isolated to the student's cohort class
   */
  async fetchLeaderboard(params?: {
    classCode?: string;
    classId?: string;
  }): Promise<LeaderboardResponse> {
    try {
      const query = new URLSearchParams();
      if (params?.classCode) query.set('classCode', params.classCode);
      if (params?.classId) query.set('classId', params.classId);

      const res = await fetch(`/api/leaderboard?${query.toString()}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      const data: LeaderboardResponse = await res.json();
      return data;
    } catch (err: any) {
      console.error('Failed to fetch leaderboard:', err);
      return {
        isLeaderboardVisible: false,
        classCode: params?.classCode || 'DEFAULT',
        entries: [],
        totalParticipants: 0,
        message: 'خطا در بارگذاری جدول رتبه‌بندی'
      };
    }
  }

  /**
   * Fetch curriculum session drip locks
   */
  async fetchCurriculumLocks(): Promise<{
    classId: string;
    classCode: string;
    isAdminBypass: boolean;
    locks: SessionLockEntity[];
  }> {
    try {
      const res = await fetch('/api/curriculum/locks', {
        method: 'GET',
        headers: this.getHeaders()
      });
      return await res.json();
    } catch (err: any) {
      console.error('Failed to fetch session locks:', err);
      // Fallback: Session 0 & 1 unlocked, 2..21 locked
      const fallbackLocks: SessionLockEntity[] = [];
      for (let s = 0; s <= 21; s++) {
        fallbackLocks.push({
          id: `fallback_${s}`,
          classId: 'fallback',
          sessionNum: s,
          title: `جلسه ${s}`,
          isUnlocked: s <= 1
        });
      }
      return {
        classId: 'fallback',
        classCode: 'DEFAULT',
        isAdminBypass: false,
        locks: fallbackLocks
      };
    }
  }

  /**
   * Admin Control Center: Fetch complete overview (Registry, 2D Matrix, Drip Locks)
   */
  async fetchAdminOverview(classId?: string): Promise<AdminOverviewResponse | null> {
    try {
      const query = classId ? `?classId=${encodeURIComponent(classId)}` : '';
      const res = await fetch(`/api/admin/overview${query}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      if (!res.ok) {
        throw new Error(`Admin unauthorized (${res.status})`);
      }
      return await res.json();
    } catch (err: any) {
      console.error('Failed to fetch admin overview:', err);
      return null;
    }
  }

  /**
   * Admin: Toggle leaderboard visibility for a cohort class
   */
  async toggleLeaderboardVisibility(
    classId: string,
    isLeaderboardVisible: boolean
  ): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/classes/toggle-leaderboard', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, isLeaderboardVisible })
      });
      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.error('Failed to toggle leaderboard visibility:', err);
      return false;
    }
  }

  /**
   * Admin: Toggle a single session lock
   */
  async toggleSessionLock(
    classId: string,
    sessionNum: number,
    isUnlocked: boolean
  ): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/sessions/toggle-lock', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, sessionNum, isUnlocked })
      });
      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.error('Failed to toggle session lock:', err);
      return false;
    }
  }

  /**
   * Admin: Unlock or lock all sessions for a cohort class
   */
  async unlockAllSessions(classId: string, unlockAll: boolean): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/sessions/unlock-all', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, unlockAll })
      });
      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.error('Failed to unlock/lock all sessions:', err);
      return false;
    }
  }
}

export const lmsApi = new LmsApiService();
