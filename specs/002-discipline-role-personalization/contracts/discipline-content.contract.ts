/**
 * Contract: Discipline & Role Content Personalization
 * Feature: 002-discipline-role-personalization
 */

import { IndustryTrackId } from '../../../src/types/industryTrack';

export interface DisciplineContract {
  getActiveDiscipline(track: IndustryTrackId): string;
  setActiveDiscipline(disciplineId: string): void;
  getActiveRole(): string;
  setActiveRole(roleId: string): void;
  getDisciplineContent(disciplineId: string): {
    title: string;
    businessProblem: string;
    whyAi: string;
    successCriteria: string[];
    costBenefit: string;
    roi: string;
  };
}
