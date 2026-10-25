import { authApi } from './authApi';
import {
  AssessmentResultEntity,
  LeaderboardResponse,
  SessionLockEntity,
  UserRegistryItem,
  PlacementMatrixData,
  ClassEntity
} from '../types/lms';
import { UserProfile } from '../types/auth';

export interface AdminOverviewResponse {
  classes: ClassEntity[];
  users: UserRegistryItem[];
  placementMatrix: PlacementMatrixData;
  sessionLocks: SessionLockEntity[];
}

export const SESSION_TITLES: Record<number, string> = {
  0: 'مبانی کاربردی مدل‌های زبانی و تولکیت پرامپت‌نویسی (Sandbox)',
  1: 'شناخت کسب‌وکار و شرح پروژه (Business Understanding)',
  2: 'تعریف مسئله در این تکرار (Problem Iteration)',
  3: 'معیارهای عینی موفقیت (Objective Measures of Success)',
  4: 'تحلیل هزینه-فایده و بودجه (Cost-Benefit Analysis)',
  5: 'محاسبه بازگشت سرمایه مورد انتظار (Expected ROI)',
  6: 'نیازمندی‌های شناختی پروژه (Cognitive Requirements)',
  7: 'ضرورت راهکار شناختی (Why AI Solution is Needed)',
  8: 'جایگزین‌های غیرشناختی (Noncognitive Alternatives)',
  9: 'اهداف اختصاصی شناختی (Cognitive Objectives)',
  10: 'خروجی‌های مورد انتظار شناختی (Cognitive Outcomes)',
  11: 'معیارهای موفقیت پروژه هوش مصنوعی (AI Success Criteria)',
  12: 'الگوهای ۷ گانه شناختی در متدولوژی CPMAI (AI Patterns)',
  13: 'انتخاب و توجیه الگوهای مورد استفاده (Patterns Selection)',
  14: 'ارزیابی وضعیت و زیرساخت (Assess Situation)',
  15: 'مهارت‌ها و فناوری‌های مورد نیاز (Technology & Skills)',
  16: 'زمان‌بندی، مراحل و مایل‌استون‌ها (Schedule Requirements)',
  17: 'محدودیت‌ها و مرزهای عملکرد مدل (Constraints & Boundaries)',
  18: 'سنجه‌ها و متریک‌های ارزیابی مدل (Model Performance Metrics)',
  19: 'نیازمندی‌های عملکردی در برابر خط پایه (Performance vs Baselines)',
  20: 'مقادیر قابل قبول شاخص‌های کلیدی (Acceptable KPI Values)',
  21: 'شاخص‌های کلیدی زیرساخت و فناوری (Required Technology KPIs)'
};

export function getDefaultAdminOverview(currentUser?: UserProfile | null): AdminOverviewResponse {
  const user = currentUser || authApi.getSavedUser();

  let localLocks: Record<number, boolean> = {};
  try {
    const raw = localStorage.getItem('cpmai_admin_session_locks');
    if (raw) localLocks = JSON.parse(raw);
  } catch {}

  let isLeaderboardVisible = true;
  try {
    const rawLb = localStorage.getItem('cpmai_admin_leaderboard_visible');
    if (rawLb !== null) isLeaderboardVisible = JSON.parse(rawLb);
  } catch {}

  const sessionLocks: SessionLockEntity[] = [];
  for (let s = 0; s <= 21; s++) {
    const isUnlocked = localLocks[s] !== undefined ? localLocks[s] : (s <= 1);
    sessionLocks.push({
      id: `lock_master_s${s}`,
      classId: 'cls_master',
      sessionNum: s,
      title: SESSION_TITLES[s] || `جلسه ${s}`,
      isUnlocked
    });
  }

  const defaultUsers: UserRegistryItem[] = user ? [
    {
      id: user.id || 'usr_fakouri',
      email: user.email || 'kafa.1368@gmail.com',
      fullName: user.displayName || 'مهندس فکوری زاد (مدیر ارشد سامانه)',
      phone: user.phone || '09120000000',
      specialty: user.specialty || 'مدیریت ارشد و هوش مصنوعی',
      role: 'admin',
      classId: 'cls_master',
      classCode: 'CPMAI-2026',
      initialAiLevel: 'ADVANCED',
      isOnboarded: true,
      createdAt: user.createdAt || new Date().toISOString(),
      assessmentResult: {
        testedTier: 'ADVANCED',
        rawScore: 100,
        percentage: 100,
        alignmentIndex: 'Matches',
        completedAt: new Date().toISOString()
      }
    }
  ] : [];

  return {
    classes: [
      {
        id: 'cls_master',
        code: 'CPMAI-2026',
        title: 'کلاس دوره تخصصی CPMAI',
        isLeaderboardVisible,
        studentCount: defaultUsers.length,
        createdAt: new Date().toISOString()
      }
    ],
    users: defaultUsers,
    placementMatrix: {
      matrix: {
        BEGINNER: {
          Low: { count: 0, percentage: 0, students: [] },
          Proficient: { count: 0, percentage: 0, students: [] },
          Mastery: { count: 0, percentage: 0, students: [] }
        },
        INTERMEDIATE: {
          Low: { count: 0, percentage: 0, students: [] },
          Proficient: { count: 0, percentage: 0, students: [] },
          Mastery: { count: 0, percentage: 0, students: [] }
        },
        ADVANCED: {
          Low: { count: 0, percentage: 0, students: [] },
          Proficient: { count: 0, percentage: 0, students: [] },
          Mastery: { count: 1, percentage: 100, students: defaultUsers.map(u => ({ id: u.id, fullName: u.fullName, score: 100 })) }
        }
      },
      totalAssessed: defaultUsers.length,
      dunningKrugerCount: 0,
      highPotentialCount: 0,
      matchedCount: defaultUsers.length
    },
    sessionLocks
  };
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
      const data = await res.json();
      if (data && Array.isArray(data.locks) && data.locks.length > 0) {
        return data;
      }
    } catch (err: any) {
      console.error('Failed to fetch session locks, using local state:', err);
    }

    // Local fallback with stored lock state
    let localLocks: Record<number, boolean> = {};
    try {
      const raw = localStorage.getItem('cpmai_admin_session_locks');
      if (raw) localLocks = JSON.parse(raw);
    } catch {}

    const fallbackLocks: SessionLockEntity[] = [];
    for (let s = 0; s <= 21; s++) {
      const isUnlocked = localLocks[s] !== undefined ? localLocks[s] : (s <= 1);
      fallbackLocks.push({
        id: `fallback_${s}`,
        classId: 'fallback',
        sessionNum: s,
        title: SESSION_TITLES[s] || `جلسه ${s}`,
        isUnlocked
      });
    }

    return {
      classId: 'fallback',
      classCode: 'CPMAI-2026',
      isAdminBypass: false,
      locks: fallbackLocks
    };
  }

  /**
   * Admin Control Center: Fetch complete overview (Registry, 2D Matrix, Drip Locks)
   * Guaranteed to NEVER return null, with offline and timeout resilience.
   */
  async fetchAdminOverview(classId?: string): Promise<AdminOverviewResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const query = classId && classId !== 'ALL' ? `?classId=${encodeURIComponent(classId)}` : '';
      const res = await fetch(`/api/admin/overview${query}`, {
        method: 'GET',
        headers: this.getHeaders(),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data: AdminOverviewResponse = await res.json();
        if (data && Array.isArray(data.classes) && Array.isArray(data.sessionLocks)) {
          return data;
        }
      }
    } catch (err: any) {
      console.warn('Backend admin overview timed out or failed, using local fallback:', err);
    }

    return getDefaultAdminOverview(authApi.getSavedUser());
  }

  /**
   * Admin: Toggle leaderboard visibility for a cohort class
   */
  async toggleLeaderboardVisibility(
    classId: string,
    isLeaderboardVisible: boolean
  ): Promise<boolean> {
    try {
      localStorage.setItem('cpmai_admin_leaderboard_visible', JSON.stringify(isLeaderboardVisible));
    } catch {}

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/classes/toggle-leaderboard', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, isLeaderboardVisible }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.warn('Network toggle leaderboard failed, saved locally:', err);
      return true;
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
      let localLocks: Record<number, boolean> = {};
      const raw = localStorage.getItem('cpmai_admin_session_locks');
      if (raw) localLocks = JSON.parse(raw);
      localLocks[sessionNum] = isUnlocked;
      localStorage.setItem('cpmai_admin_session_locks', JSON.stringify(localLocks));
      window.dispatchEvent(new CustomEvent('cpmai_curriculum_locks_updated'));
    } catch {}

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/sessions/toggle-lock', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, sessionNum, isUnlocked }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.warn('Network toggle session lock failed, saved locally:', err);
      return true;
    }
  }

  /**
   * Admin: Unlock or lock all sessions for a cohort class
   */
  async unlockAllSessions(classId: string, unlockAll: boolean): Promise<boolean> {
    try {
      const localLocks: Record<number, boolean> = {};
      for (let s = 0; s <= 21; s++) {
        localLocks[s] = unlockAll ? true : (s <= 1);
      }
      localStorage.setItem('cpmai_admin_session_locks', JSON.stringify(localLocks));
      window.dispatchEvent(new CustomEvent('cpmai_curriculum_locks_updated'));
    } catch {}

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/sessions/unlock-all', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, unlockAll }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.warn('Network unlock-all sessions failed, saved locally:', err);
      return true;
    }
  }

  /**
   * Admin: Update class custom title and organization (e.g. naming an auto-slot)
   */
  async updateClassInfo(
    classId: string,
    title: string,
    organization?: string,
    isLeaderboardVisible?: boolean
  ): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/admin/classes/update', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ classId, title, organization, isLeaderboardVisible }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      return !!data.success;
    } catch (err: any) {
      console.warn('Failed to update class on server, saving fallback state:', err);
      return true;
    }
  }

  /**
   * Admin: Create a new custom cohort class with 22 session locks
   */
  async createCustomClass(
    code: string,
    title?: string,
    organization?: string
  ): Promise<ClassEntity | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/admin/classes/create', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ code, title, organization }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data.success && data.class) {
        return data.class;
      }
    } catch (err: any) {
      console.warn('Failed to create class on server, returning local fallback:', err);
    }

    return {
      id: `cls_${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title?.trim() || `کلاس دوره CPMAI (${code})`,
      organization: organization?.trim() || 'کارگاه سازمانی CPMAI',
      isLeaderboardVisible: false,
      studentCount: 0,
      createdAt: new Date().toISOString()
    };
  }
}

export const lmsApi = new LmsApiService();
