/**
 * Contract: Domain Content & Track Switcher Interface
 * Feature: 001-domain-track-segregation
 */

export type IndustryTrackId = 'CIVIL_INFRA' | 'ENERGY_PETRO';

export interface DomainTrackContract {
  getActiveTrack(): IndustryTrackId;
  setActiveTrack(track: IndustryTrackId): void;
  getPhaseExample(phaseId: number, track?: IndustryTrackId): {
    exampleNote: string;
    background: string;
    primaryObjective: string;
    relatedQuestions: string[];
  };
}
