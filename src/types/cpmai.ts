export type Language = 'fa' | 'en';
export type Theme = 'light' | 'dark';

export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6;

export interface ArtifactItem {
  chip: string;
  title: string;
  desc: string;
}

export interface QuizQuestion {
  q: string;
  o: string[];
  ans: number;
  explanation: string;
}

export interface ExampleData {
  title: string;
  primary: string;
  secondary: string;
  details: string[];
}

export interface PhaseContent {
  id: PhaseId;
  roman: string;
  title: string;
  taskGroup: string;
  lede: string;
  readHeading: string;
  readSubheading: string;
  readingParagraphs: string[];
  subtaskHeading: string;
  subtaskSubheading: string;
  descriptionPoints: string[];
  artifactsHeading: string;
  artifacts: ArtifactItem[];
  exampleNote: string;
  worksheetHeading: string;
  worksheetSubheading: string;
  quizHeading: string;
  quizSubheading: string;
  quizzes: QuizQuestion[];
  example: ExampleData;
}

export interface ProjectMetadata {
  title: string;
  organization: string;
  leadName: string;
  sprint: string;
  caseDomain: string;
}

export interface Phase1ProblemDefinition {
  problemStatement: string;
  whyAiNotTraditional: string;
  currentState: string;
  futureState: string;
  inScope: string;
  outOfScope: string;
  aiFeasibilityChecks: {
    hasData: boolean;
    toleratesUncertainty: boolean;
    clearBusinessImpact: boolean;
    cognitiveTaskFeasible: boolean;
  };
  canvasNotes: string;
}

export interface Phase1CostBenefit {
  costBudget: string;
  timeBudget: string;
  costBreakdown: {
    personnel: string;
    computeCloud: string;
    dataProcurement: string;
    operationalMaintenance: string;
  };
  anticipatedBenefits: {
    tangibleSavings: string;
    revenueUplift: string;
    riskReduction: string;
  };
  roiEstimate: string;
  canvasNotes: string;
}

export interface Phase1Worksheet {
  activeSubPage: 1 | 2 | 3;
  userStory: string;
  background: string;
  primaryObjective: string;
  relatedQuestions: string[];
  cognitivePattern: string;
  businessSuccessCriteria: string;
  problemDef: Phase1ProblemDefinition;
  costBenefit: Phase1CostBenefit;
}

export interface Phase2Worksheet {
  dataSources: Array<{ source: string; format: string; volume: string; status: string }>;
  dataCharacteristics: string;
  qualityDeficiencies: string[];
  governanceAndEthics: string;
}

export interface Phase3Worksheet {
  inclusionCriteria: string;
  cleaningPlan: string;
  engineeredFeatures: Array<{ feature: string; logic: string }>;
  partitioningSplit: string;
  leakageMitigation: string;
}

export interface Phase4Worksheet {
  chosenAlgorithm: string;
  baselineComparison: string;
  validationStrategy: string;
  evaluationMetrics: Array<{ metric: string; target: string; achieved: string }>;
  hyperparameterNotes: string;
}

export interface Phase5Worksheet {
  kpiComparisonResult: string;
  ethicalAndBiasFindings: string;
  explainabilityAssessment: string;
  nextStepDecision: 'deploy' | 'iterate_data' | 'retune_model' | 'reassess_business' | '';
  decisionRationale: string;
}

export interface Phase6Worksheet {
  deploymentArchitecture: string;
  monitoringStrategy: string;
  driftTriggers: string[];
  rollbackPlan: string;
  operationalRunbookOwner: string;
}

export interface AppState {
  activePhase: PhaseId;
  lang: Language;
  theme: Theme;
  projectMeta: ProjectMetadata;
  readChecked: Record<PhaseId, boolean>;
  quizAnswers: Record<PhaseId, Record<number, number>>;
  showExample: Record<PhaseId, boolean>;
  p1: Phase1Worksheet;
  p2: Phase2Worksheet;
  p3: Phase3Worksheet;
  p4: Phase4Worksheet;
  p5: Phase5Worksheet;
  p6: Phase6Worksheet;
}
