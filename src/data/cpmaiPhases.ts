import { PhaseContent, Language, PhaseId } from '../types/cpmai';

export const PHASES_DATA: Record<Language, Record<PhaseId, PhaseContent>> = {
  en: {
    1: {
      id: 1,
      roman: 'I',
      title: 'Business Understanding',
      taskGroup: 'Determine Business Objectives & Assess Cognitive Needs',
      lede: 'Align project goals with organizational strategy, evaluate feasibility, and map to cognitive technology patterns.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'These tasks help the project team determine overall business objectives as they relate to the AI and cognitive aspects of the project.',
      readingParagraphs: [
        'The first phase of a CPMAI process is gaining a thorough understanding of the business and organizational objectives, and other factors that decide whether the project is worth undertaking and the conditions under which it will succeed. The focus is on the project\'s objectives and requirements from a business perspective. That knowledge then becomes an AI and cognitive problem definition and a preliminary plan to achieve the objectives.',
        'Because we run CPMAI in an agile context, business understanding is relevant to the specific sprint or iteration you are in, and should tie closely to that iteration\'s user story. One sprint can cover all the CPMAI phases, or a project can span several sprints across evolving iterations.'
      ],
      subtaskHeading: 'Subtask: Determine Business Objectives',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'The first objective of the project team is to thoroughly understand, from a business perspective, what the customer really wants to accomplish in a way that is consistent with cognitive technology goals.',
        'Customers often have many competing objectives and constraints that must be balanced. The team\'s goal is to uncover important factors at the start that can influence the outcome.',
        'Neglecting this step can mean spending a great deal of effort producing the right answers to the wrong questions.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Background',
          title: 'Organization Situation',
          desc: 'Record what is known about the organization\'s business situation at the start of the project and current operational baseline.'
        },
        {
          chip: 'Business Objectives',
          title: 'Primary Goal & Questions',
          desc: 'Describe the customer\'s primary objective from a business perspective. Also list the related business questions the customer wants to address.'
        },
        {
          chip: 'Success Criteria',
          title: 'Measurable ROI',
          desc: 'Define quantitative business metrics (e.g. 15% churn reduction, 40% time saved) rather than technical machine learning metrics.'
        }
      ],
      exampleNote: 'Example: Primary goal is to keep high-value customers by predicting when they might leave for a competitor. Related questions explore how contact channel and fee structures affect retention.',
      worksheetHeading: 'Worksheet: Your Project Artifacts',
      worksheetSubheading: 'Fill these in for your own project or case study iteration.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Pick an answer to see instant feedback and CPMAI rationale.',
      quizzes: [
        {
          q: 'What can happen if the team neglects to understand the customer\'s real objectives at the start?',
          o: ['The data will be harder to label', 'They produce the right answers to the wrong questions', 'The model will train more slowly'],
          ans: 1,
          explanation: 'Skipping this step can send a great deal of effort toward answering the wrong questions, building technically valid models that solve zero actual business problems.'
        },
        {
          q: 'In an agile CPMAI project, business understanding should tie most closely to what?',
          o: ['The final product vision only', 'The vendor\'s contract', 'The user story for the current sprint or iteration'],
          ans: 2,
          explanation: 'Business understanding in CPMAI is iterative; it connects directly to the user story driving the active sprint or release.'
        },
        {
          q: 'Which one is a related business question rather than the primary objective?',
          o: ['Will lower ATM fees significantly reduce the number of high-value customers who leave?', 'Keep current customers by predicting when they might leave', 'Choose the neural network architecture'],
          ans: 0,
          explanation: 'Related questions examine auxiliary drivers around the main retention objective. Architecture selection is an engineering task for Phase IV.'
        }
      ],
      example: {
        title: 'Retail Banking Customer Churn Iteration',
        primary: 'Reduce monthly customer churn among high-value account holders by 12% over the next two quarters.',
        secondary: 'As a Branch Retention Manager, I want early warnings of disengagement so that relationship managers can proactively offer customized perks.',
        details: [
          'Background: Core retail deposit growth has slowed by 4.2% annually, with customers migrating to digital-only neo-banks.',
          'Cognitive Pattern: Predictive Analytics (classification with probability score).',
          'Related Question 1: Does visiting a physical branch within 30 days correlate with increased retention?',
          'Related Question 2: At what fee threshold do business accounts initiate wire transfers to alternative banks?'
        ]
      }
    },
    2: {
      id: 2,
      roman: 'II',
      title: 'Data Understanding',
      taskGroup: 'Collect, Explore, Describe & Verify Data Quality',
      lede: 'Assess data availability, volume, veracity, distribution, and suitability for the targeted cognitive pattern.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'Without high-quality, representative data, even the most sophisticated cognitive algorithms fail completely.',
      readingParagraphs: [
        'Data Understanding begins with initial data collection and proceeds with activities in order to get familiar with the data, to identify data quality problems, to discover first insights into the data, or to detect interesting subsets to form hypotheses for hidden information.',
        'In CPMAI, data understanding strictly evaluates whether the data collected can realistically answer the business questions established in Phase I. If relevant data is non-existent, un-annotated, or corrupted by historical human bias, the team must address this before proceeding.'
      ],
      subtaskHeading: 'Subtask: Inventory & Data Quality Verification',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'Gather data from disparate operational databases, APIs, legacy ERP systems, logs, and third-party vendors.',
        'Examine surface properties: record counts, schema attributes, field formats, key relationships, and storage volume.',
        'Audit data veracity: search for missing values, duplicate entries, inconsistent spelling, temporal drift, and class imbalance.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Data Inventory',
          title: 'Source Catalogs',
          desc: 'Document data origins, access permissions, security classifications, update frequencies, and ownership.'
        },
        {
          chip: 'Exploration Report',
          title: 'Distributions & Statistics',
          desc: 'Record preliminary findings on feature distributions, correlations, outliers, and data collection nuances.'
        },
        {
          chip: 'Quality Deficiencies',
          title: 'Flaws & Bias Audit',
          desc: 'Catalog missing data rates, sample skew, proxy bias risks, and data pipeline bottlenecks.'
        }
      ],
      exampleNote: 'Example: Bank churn data incorporates transaction logs, CRM call records, web app activity, and branch records with varying refresh intervals.',
      worksheetHeading: 'Worksheet: Data Inventory & Quality Audit',
      worksheetSubheading: 'Document your datasets, exploration findings, and data hurdles.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Assess your grasp of CPMAI Data Understanding fundamentals.',
      quizzes: [
        {
          q: 'Why must Data Understanding precede Data Preparation in CPMAI?',
          o: ['Because algorithms require clean tables', 'To know what data flaws exist before committing preparation engineering', 'To buy GPU servers in advance'],
          ans: 1,
          explanation: 'You cannot plan effective cleaning and feature extraction without first diagnosing the distributions, anomalies, and structural issues of the raw data.'
        },
        {
          q: 'What is a major risk when exploring historical data for AI training?',
          o: ['The data size is always too large', 'Historical data may codify human biases or outdated business rules', 'Data cannot be stored in cloud object storage'],
          ans: 1,
          explanation: 'Historical datasets frequently reflect past prejudices or deprecated organizational policies that an AI model might erroneously replicate.'
        },
        {
          q: 'Which artifact summarizes missing values and record anomalies?',
          o: ['Executive ROI Deck', 'Data Quality & Deficiency Report', 'Model Hyperparameter Table'],
          ans: 1,
          explanation: 'The Data Quality Report details missing entries, noise, outliers, and structural defects discovered during exploratory data analysis.'
        }
      ],
      example: {
        title: 'Banking Dataset Audit',
        primary: '3 years of transactional history (4.8M records) paired with 24 months of mobile banking session logs.',
        secondary: 'Identified 14% missing income entries in legacy branch records; resolved to cross-reference credit bureau bureau data.',
        details: [
          'Source 1: Core Banking OLTP (PostgreSQL) - Customer demographics, balances, transaction counts.',
          'Source 2: Web/Mobile Analytics (Snowflake) - Clickstream sessions, feature engagement, drop-off events.',
          'Source 3: Call Center CRM (Salesforce) - Sentiment scores, complaint categories, resolution times.',
          'Deficiency flagged: Class imbalance with only 3.2% churn events, requiring specialized sampling in Phase III.'
        ]
      }
    },
    3: {
      id: 3,
      roman: 'III',
      title: 'Data Preparation',
      taskGroup: 'Select, Clean, Construct, Integrate & Format Data',
      lede: 'Transform raw data into pristine training and evaluation datasets ready for machine learning pipelines.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'Data preparation typically consumes 60% to 80% of total project effort in real-world cognitive implementations.',
      readingParagraphs: [
        'The data preparation phase covers all activities to construct the final dataset (data that will be fed into the modeling tool(s)) from the initial raw data. Tasks include table, record, and attribute selection as well as transformation and cleaning of data for modeling tools.',
        'Crucially in CPMAI, teams must safeguard against data leakage—where information from the future or evaluation set inadvertently leaks into training features, resulting in unrealistic optimistic validation scores.'
      ],
      subtaskHeading: 'Subtask: Feature Engineering & Preprocessing Pipeline',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'Select attributes based on relevance to Phase I business questions and quality thresholds from Phase II.',
        'Clean anomalies by imputing missing values with domain-aware estimators, standardizing formats, and pruning corrupt records.',
        'Engineer cognitive features: aggregations, temporal deltas, tokenization, embeddings, and interaction terms.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Dataset Rationale',
          title: 'Inclusion / Exclusion Criteria',
          desc: 'Clear justifications for why certain columns or date ranges were retained or discarded.'
        },
        {
          chip: 'Feature Catalog',
          title: 'Derived Features & Pipeline',
          desc: 'Documentation of mathematical transformations, normalizations, and domain-engineered attributes.'
        },
        {
          chip: 'Partition Plan',
          title: 'Train / Val / Test Splits',
          desc: 'Data split boundaries designed with temporal splits or stratification to prevent data leakage.'
        }
      ],
      exampleNote: 'Example: Computing 30-day velocity of mobile logins and average transaction decline rate over 90 days.',
      worksheetHeading: 'Worksheet: Preparation Strategy & Feature Store',
      worksheetSubheading: 'Formulate your cleaning rules, feature transformations, and data splits.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Test your understanding of data hygiene and leakage prevention.',
      quizzes: [
        {
          q: 'What is data leakage in machine learning preparation?',
          o: ['A cyber security data breach', 'Information from target outcomes or future timestamps contaminating input features', 'Compressing a file too aggressively'],
          ans: 1,
          explanation: 'Data leakage happens when information from test sets or post-event knowledge creeps into training features, rendering model metrics deceptively high.'
        },
        {
          q: 'Why should feature transformations be fit solely on the training partition?',
          o: ['To prevent test data distribution from influencing scaler/imputer parameters', 'To speed up training duration', 'Because Python libraries cannot process test data'],
          ans: 0,
          explanation: 'Fitting scalers or imputers on the full dataset leaks information from the test distribution into training, violating evaluation independence.'
        },
        {
          q: 'When dealing with severe class imbalance (e.g. 1% fraud), what preparation step is appropriate?',
          o: ['Discard all minority samples', 'Stratified sampling or targeted synthetic augmentation (e.g. SMOTE)', 'Double the number of features'],
          ans: 1,
          explanation: 'Stratification ensures fair representation across train/val/test splits, while synthetic techniques balance class frequencies.'
        }
      ],
      example: {
        title: 'Feature Engineering Pipeline',
        primary: 'Constructed 42 rolling time-window indicators capturing changes in customer behavior over 30, 60, and 90 days.',
        secondary: 'Enforced temporal train-test cutoffs: Train on Q1-Q3 2025; Test on Q4 2025.',
        details: [
          'Feature 1: `delta_login_frequency_30d` - Ratio of current 30-day mobile app logins to historical 180-day baseline.',
          'Feature 2: `support_ticket_escalation_flag` - Binary indicator if customer submitted an unresolved ticket in the past 14 days.',
          'Cleaning: Imputed null credit scores with domain median grouped by age demographic.',
          'Leakage Check: Excluded post-cancellation status fields from all predictive feature arrays.'
        ]
      }
    },
    4: {
      id: 4,
      roman: 'IV',
      title: 'Model Development',
      taskGroup: 'Select Technique, Design Test, Build & Assess Models',
      lede: 'Train baseline and candidate cognitive models, tune hyperparameters, and assess against technical validation benchmarks.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'Model development is where cognitive science and machine learning algorithms meet the prepared data.',
      readingParagraphs: [
        'In this phase, various modeling techniques are selected and applied, and their parameters are calibrated to optimal values. Typically, there are several techniques for the same business problem type. Some techniques have specific requirements on the form of data.',
        'In CPMAI, teams always establish a simple heuristic baseline first (e.g. logistic regression, simple prompt, rule-based) before deploying complex deep learning or ensemble architectures to prove genuine cognitive uplift.'
      ],
      subtaskHeading: 'Subtask: Algorithm Selection & Hyperparameter Tuning',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'Establish an unambiguous baseline benchmark using straightforward business rules or standard linear models.',
        'Train candidate architectures (e.g., gradient boosted trees, transformer fine-tunes, neural classifiers).',
        'Systematically tune hyperparameters via Bayesian optimization, cross-validation, and error analysis.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Model Rationale',
          title: 'Algorithmic Selection',
          desc: 'Document why chosen architectures fit the cognitive pattern, latency constraints, and data size.'
        },
        {
          chip: 'Test Protocol',
          title: 'Validation Benchmark Design',
          desc: 'Definition of cross-validation folds, seed control, evaluation metrics (F1, AUC-ROC, BLEU, MAE).'
        },
        {
          chip: 'Assessment Report',
          title: 'Technical Metrics Scorecard',
          desc: 'Comparative benchmark results evaluating candidate models against the simple baseline.'
        }
      ],
      exampleNote: 'Example: Comparing a Gradient Boosted Decision Tree (LightGBM) against a baseline Logistic Regression.',
      worksheetHeading: 'Worksheet: Modeling Plan & Benchmark Matrix',
      worksheetSubheading: 'Record chosen algorithms, hyperparameters, and validation benchmark scores.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Verify your understanding of model development and benchmark discipline.',
      quizzes: [
        {
          q: 'Why does CPMAI insist on creating a simple baseline model before trying complex algorithms?',
          o: ['To justify project software licensing', 'To confirm whether cognitive complexity delivers measurable uplift over simple rules', 'Because deep learning always fails'],
          ans: 1,
          explanation: 'Without a simple baseline, you cannot tell if a heavy neural network adds real value or just brings unnecessary latency, cost, and maintenance overhead.'
        },
        {
          q: 'Which metric is most appropriate for heavily imbalanced binary classification (e.g. 2% churn rate)?',
          o: ['Raw Accuracy', 'Area Under Precision-Recall Curve (PR-AUC) or F1-Score', 'Mean Squared Error'],
          ans: 1,
          explanation: 'Raw accuracy is deceptive on imbalanced datasets (predicting "no churn" yields 98% accuracy but zeroes utility). PR-AUC and F1 measure true minority detection.'
        },
        {
          q: 'What should be done when a model performs extraordinarily on training data but poorly on validation data?',
          o: ['Ship the model immediately', 'Address overfitting via regularization, dropout, pruning, or simpler model capacity', 'Delete the validation set'],
          ans: 1,
          explanation: 'High training score paired with poor validation score indicates overfitting—the model memorized training noise rather than generalized patterns.'
        }
      ],
      example: {
        title: 'Churn Prediction Model Benchmarks',
        primary: 'LightGBM model with tuned hyperparameters outperformed baseline logistic regression by 24% PR-AUC.',
        secondary: 'Validation strategy: 5-Fold Stratified Cross-Validation on temporal blocks with early stopping.',
        details: [
          'Baseline (Logistic Regression): PR-AUC = 0.41, Recall@Top10% = 48%, Latency = 4ms.',
          'Candidate 1 (Random Forest): PR-AUC = 0.58, Recall@Top10% = 63%, Latency = 28ms.',
          'Candidate 2 (LightGBM Tuned): PR-AUC = 0.65, Recall@Top10% = 72%, Latency = 9ms (Selected).',
          'Hyperparameters: max_depth=6, learning_rate=0.03, colsample_bytree=0.8, n_estimators=450.'
        ]
      }
    },
    5: {
      id: 5,
      roman: 'V',
      title: 'Model Evaluation',
      taskGroup: 'Evaluate Against Business Criteria, Audit Ethics & Decide',
      lede: 'Assess whether the model genuinely solves the Phase I business objective and satisfies ethical, fairness, and safety audits.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'High technical accuracy does not automatically mean a model delivers business value.',
      readingParagraphs: [
        'At this stage, you have built a model (or models) that appears to have high quality from a data analysis perspective. Before proceeding to final deployment, it is critical to thoroughly evaluate the model and review the steps executed to construct it, to be certain it properly achieves the business objectives.',
        'A key objective of CPMAI is to determine if there is some important business issue that has not been sufficiently considered. At the end of this phase, a formal decision on the use of the data mining/AI results must be reached: Deploy, Iterate Data, Re-tune, or Pivot.'
      ],
      subtaskHeading: 'Subtask: Business Criteria Review & Ethical Audit',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'Translate machine learning metrics (e.g. F1, ROC) into financial ROI, operational workload, and error cost trade-offs.',
        'Audit fairness, subgroup parity, explainability (SHAP / LIME), security resilience, and regulatory compliance.',
        'Convene cross-functional stakeholders for a formal Go/No-Go milestone decision.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Business Evaluation',
          title: 'ROI & KPI Validation',
          desc: 'Quantification showing how the model meets or misses the Phase I primary business goals.'
        },
        {
          chip: 'Ethics & Bias Review',
          title: 'Fairness & Safety Audit',
          desc: 'Evaluation of demographic parity, false positive harm, explainability score, and compliance.'
        },
        {
          chip: 'Decision Record',
          title: 'Go / No-Go Milestone Sign-Off',
          desc: 'Formal consensus: Proceed to Operationalization (Phase VI), iterate data (Phase III), or revise objectives.'
        }
      ],
      exampleNote: 'Example: Evaluating how a 72% recall rate reduces customer churn cost versus marketing outreach spend.',
      worksheetHeading: 'Worksheet: Business Evaluation & Decision Gate',
      worksheetSubheading: 'Map model performance to business success metrics and record ethical audit outcomes.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Evaluate your understanding of business gatekeeping and responsible AI.',
      quizzes: [
        {
          q: 'What is the primary purpose of Phase V in CPMAI compared to Phase IV?',
          o: ['Phase IV evaluates technical metrics; Phase V evaluates business value and ethical readiness', 'Phase V is only for writing unit tests', 'Phase V is for retraining with more epochs'],
          ans: 0,
          explanation: 'Phase IV asks "does the model predict accurately?"; Phase V asks "does this prediction solve the customer problem profitably, ethically, and safely?".'
        },
        {
          q: 'If a model has high technical F1-score but disproportionately generates false accusations against a specific subgroup, what should occur?',
          o: ['Deploy immediately because overall F1 is high', 'Halt deployment and iterate data/fairness constraints', 'Hide the subgroup test results'],
          ans: 1,
          explanation: 'Ethical and fairness standards in CPMAI are non-negotiable gates; unequal error rates require mitigation before production release.'
        },
        {
          q: 'What are the possible outcomes of the Phase V review gate?',
          o: ['Deploy only', 'Deploy, Iterate (return to earlier phases), or Pivot/Cancel', 'Automatic cloud upload'],
          ans: 1,
          explanation: 'Phase V is an agile checkpoint. If the model fails business criteria, the team iterates data preparation, re-tunes, or pivots the strategy.'
        }
      ],
      example: {
        title: 'Executive Gate Evaluation',
        primary: 'Projected net annual benefit of $1.85M in preserved accounts against $240K operational incentive costs.',
        secondary: 'Fairness audit verified: False positive rates balanced across age brackets (<3% variance).',
        details: [
          'Business KPI Check: Phase I goal was 12% churn reduction; simulations confirm 14.3% expected retention.',
          'Explainability: SHAP summary plots integrated into relationship manager UI to show top 3 churn drivers.',
          'Compliance: Fully compliant with consumer privacy regulations and fair credit reporting guidelines.',
          'Gate Decision: APPROVED to proceed to Phase VI Operationalization for regional pilot launch.'
        ]
      }
    },
    6: {
      id: 6,
      roman: 'VI',
      title: 'Operationalization',
      taskGroup: 'Plan Deployment, Monitoring, Maintenance & Project Review',
      lede: 'Deploy model into production pipelines, implement drift detection, establish SLAs, and finalize project review.',
      readHeading: 'Read: What this phase is for',
      readSubheading: 'A model that lives only in a Jupyter notebook provides zero ongoing enterprise value.',
      readingParagraphs: [
        'Creation of the model is generally not the end of the project. Even if the purpose of the model is to increase knowledge of the data, the knowledge gained will need to be organized and presented in a way that the customer can use. It often involves applying "live" models within an organization\'s decision making processes.',
        'Depending on the requirements, the operationalization phase can be as simple as generating a report or as complex as implementing a repeatable data mining process across the enterprise. In CPMAI, monitoring for data drift and model degradation is a mandatory requirement.'
      ],
      subtaskHeading: 'Subtask: Production Pipeline & Drift Governance',
      subtaskSubheading: 'What you do, and what you produce.',
      descriptionPoints: [
        'Formulate deployment architecture: streaming real-time inference API, batch processing, or edge execution.',
        'Establish automated telemetry monitoring: data drift (KS-test/PSI), concept drift, latency degradation, and error spikes.',
        'Author operational runbooks, rollback playbooks, and conduct project retrospective documentation.'
      ],
      artifactsHeading: 'Task Artifacts',
      artifacts: [
        {
          chip: 'Deployment Plan',
          title: 'Production Architecture',
          desc: 'Infrastructure blueprint detailing microservices, caching, containerization, and failover fallbacks.'
        },
        {
          chip: 'Monitoring Plan',
          title: 'Drift & Health Telemetry',
          desc: 'Defined thresholds for feature drift (PSI > 0.2), latency alerts (p99 < 120ms), and automated retraining triggers.'
        },
        {
          chip: 'Final Project Report',
          title: 'Handover & Knowledge Base',
          desc: 'Executive summary, maintenance runbook, Lessons Learned log, and sponsor project sign-off.'
        }
      ],
      exampleNote: 'Example: Deploying Churn Scoring as a daily batch job refreshing CRM prioritization dashboards at 04:00 AM.',
      worksheetHeading: 'Worksheet: Deployment & Operational Runbook',
      worksheetSubheading: 'Design deployment strategy, monitoring alerts, and ongoing maintenance lifecycle.',
      quizHeading: 'Check Your Understanding',
      quizSubheading: 'Test your understanding of model serving, monitoring, and operational lifecycle.',
      quizzes: [
        {
          q: 'What is concept drift in a deployed machine learning system?',
          o: ['The server hard drive runs out of space', 'The statistical relationship between input features and the target label changes over time', 'The programming language gets deprecated'],
          ans: 1,
          explanation: 'Concept drift occurs when real-world human behavior or macroeconomic conditions shift, causing past patterns to no longer predict future outcomes.'
        },
        {
          q: 'Why must operationalization include a rollback plan?',
          o: ['To revert to a previous model or heuristic fallback if the new deployment experiences degraded performance', 'Because cloud hosting requires it by law', 'To delete user data on demand'],
          ans: 0,
          explanation: 'If a deployed model encounters unexpected production edge cases or data pipeline corruption, an instant rollback mechanism prevents business disruption.'
        },
        {
          q: 'What artifact ensures smooth handover from the AI engineering team to operations and business users?',
          o: ['The git commit history only', 'The Operational Runbook and Final Project Handover Report', 'The raw training dataset CSV'],
          ans: 1,
          explanation: 'The Operational Runbook documents support procedures, escalation paths, retraining protocols, and dashboard maintenance instructions.'
        }
      ],
      example: {
        title: 'Production Serving & Drift Telemetry',
        primary: 'Nightly batch inference pipeline containerized via Kubernetes; results synced to Salesforce CRM by 06:00 AM.',
        secondary: 'Monitoring: Automated Population Stability Index (PSI) calculations triggering weekly alerts if PSI > 0.15.',
        details: [
          'Serving Mode: Nightly batch execution processing 320,000 active accounts in under 18 minutes.',
          'Fallback: If batch pipeline encounters schema validation error, fallback to legacy rule-based retention score.',
          'Retraining Schedule: Automated monthly retraining pipeline scheduled with human-in-the-loop validation sign-off.',
          'Runbook Owner: Central MLOps Engineering Team with Tier-2 escalation to Branch Operations Specialist.'
        ]
      }
    }
  },
  fa: {
    1: {
      id: 1,
      roman: 'I',
      title: 'درک کسب‌وکار (Business Understanding)',
      taskGroup: 'تعیین اهداف کسب‌وکار و سنجش نیازمندی‌های شناختی',
      lede: 'همراستاسازی اهداف پروژه با استراتژی سازمان، ارزیابی امکان‌پذیری و نگاشت به الگوهای هفت‌گانه فناوری شناختی هوش مصنوعی.',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'این وظایف به تیم پروژه کمک می‌کنند اهداف کلی کسب‌وکار را، تا جایی که به جنبه‌های هوش مصنوعی و شناختی مربوط است، مشخص کند.',
      readingParagraphs: [
        'نخستین فاز فرایند CPMAI، دستیابی به درکی کامل از اهداف کسب‌وکار و سازمان و عوامل دیگری است که تعیین می‌کنند آیا پروژه ارزش اجرا دارد و در چه شرایطی موفق خواهد بود. تمرکز این فاز بر اهداف و الزامات پروژه از دیدگاه کسب‌وکار است. سپس این دانش به تعریف مسئله برای یک پروژهٔ هوش مصنوعی و شناختی و یک برنامهٔ اولیه برای رسیدن به اهداف تبدیل می‌شود.',
        'چون CPMAI را در بستر چابک (Agile) اجرا می‌کنیم، درک کسب‌وکار به اسپرینت یا تکرار مشخصی که در آن هستید مربوط است و باید ارتباط نزدیکی با داستان کاربر (User Story) همان تکرار داشته باشد. ممکن است یک اسپرینت همهٔ فازهای CPMAI را پوشش دهد، یا یک پروژه چند اسپرینت و تکرار تکاملی را در بر بگیرد.'
      ],
      subtaskHeading: 'زیروظیفه: تعیین اهداف کسب‌وکار',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'نخستین هدف تیم پروژه این است که از دیدگاه کسب‌وکار دقیقاً بفهمد مشتری واقعاً می‌خواهد به چه چیزی برسد، آن هم به شکلی که با اهداف فناوری شناختی سازگار باشد.',
        'مشتری اغلب اهداف و محدودیت‌های متعارض فراوانی دارد که باید درست متعادل شوند. هدف تیم این است که از همان ابتدا عوامل مهمی را که می‌توانند بر نتیجهٔ پروژه اثر بگذارند کشف کند.',
        'نادیده گرفتن این گام می‌تواند به این معنا باشد که تلاش زیادی صرف یافتن پاسخ‌های درست برای پرسش‌های نادرست شود.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'پس‌زمینه',
          title: 'وضعیت کسب‌وکار سازمان',
          desc: 'اطلاعاتی را که در آغاز پروژه دربارهٔ وضعیت کسب‌وکار سازمان، چالش‌های فعلی و خط مبنای عملیاتی می‌دانید ثبت کنید.'
        },
        {
          chip: 'اهداف کسب‌وکار',
          title: 'هدف اصلی و پرسش‌های مرتبط',
          desc: 'هدف اصلی مشتری را از دیدگاه کسب‌وکار توصیف کنید. پرسش‌های کسب‌وکاری مرتبطی را هم که مشتری می‌خواهد به آن‌ها پاسخ داده شود فهرست کنید.'
        },
        {
          chip: 'معیارهای موفقیت',
          title: 'بازگشت سرمایه و شاخص‌های ملموس',
          desc: 'شاخص‌های کلیدی عملکرد کسب‌وکار (مانند کاهش ۱۵٪ ریزش یا ۴۰٪ صرفه‌جویی زمان) را به جای معیارهای فنی یادگیری ماشین ثبت کنید.'
        }
      ],
      exampleNote: 'مثال: هدف اصلی نگه‌داشتن مشتریان باارزش با پیش‌بینی احتمال رفتن به رقیب است. پرسش‌های مرتبط بررسی می‌کنند کانال مراجعه و ساختار کارمزد چه تاثیری بر ماندگاری دارند.',
      worksheetHeading: 'برگهٔ تمرین: مستندات پروژهٔ شما',
      worksheetSubheading: 'این بخش‌ها را برای پروژه یا مطالعهٔ موردی خودتان پر کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'یک گزینه را انتخاب کنید تا بلافاصله بازخورد و استدلال متدولوژی CPMAI را ببینید.',
      quizzes: [
        {
          q: 'اگر تیم در ابتدا اهداف واقعی مشتری را درک نکند، چه اتفاقی ممکن است بیفتد؟',
          o: ['برچسب‌گذاری داده‌ها سخت‌تر می‌شود', 'پاسخ‌های درست برای پرسش‌های نادرست تولید می‌شود', 'آموزش مدل کندتر می‌شود'],
          ans: 1,
          explanation: 'نادیده گرفتن این گام می‌تواند تلاش زیادی را صرف پاسخ دادن به پرسش‌های نادرست کند و مدلی بسازد که از نظر فنی سالم است اما هیچ ارزش واقعی ایجاد نمی‌کند.'
        },
        {
          q: 'در یک پروژهٔ CPMAI چابک، درک کسب‌وکار باید بیش از همه به چه چیزی مرتبط باشد؟',
          o: ['فقط چشم‌انداز نهایی محصول', 'قرارداد فروشنده', 'داستان کاربر اسپرینت یا تکرار جاری'],
          ans: 2,
          explanation: 'درک کسب‌وکار در CPMAI تکرارشونده است و مستقیماً به داستان کاربر (User Story) همان اسپرینت یا تکرار فعال گره می‌خورد.'
        },
        {
          q: 'کدام مورد یک پرسش کسب‌وکاریِ مرتبط است، نه هدف اصلی؟',
          o: ['آیا کاهش کارمزد خودپرداز، تعداد مشتریان باارزشِ ترک‌کننده را به‌طور معناداری کم می‌کند؟', 'نگه‌داشتن مشتریان با پیش‌بینی زمان رفتنشان', 'انتخاب معماری شبکهٔ عصبی'],
          ans: 0,
          explanation: 'پرسش‌های مرتبط عوامل و فرضیات پیرامون هدف اصلی را می‌کاوند. انتخاب معماری شبکه عصبی یک وظیفه فنی مهندسی در فاز چهارم است.'
        }
      ],
      example: {
        title: 'نمونه مطالعه موردی: کاهش ریزش مشتریان بانکداری خرد',
        primary: 'کاهش ۱۲ درصدی نرخ ماهانه ریزش دارندگان حساب‌های باارزش ظرف دو فصل آینده.',
        secondary: 'به‌عنوان مدیر حفظ مشتریان شعبه، می‌خواهم هشدارهای زودهنگام کاهش تعامل مشتری را دریافت کنم تا کارشناسان بتوانند بسته‌های وفاداری اختصاصی پیشنهاد دهند.',
        details: [
          'پس‌زمینه: رشد سالانه سپرده‌های خرد ۴.۲ درصد کند شده و مشتریان به نئوبانک‌های دیجیتال مهاجرت می‌کنند.',
          'الگوی شناختی هوش مصنوعی: تحلیل‌های پیش‌بینانه (Predictive Analytics - طبقه‌بندی با احتمال وقوع).',
          'پرسش مرتبط ۱: آیا مراجعه به شعبه فیزیکی ظرف ۳۰ روز اخیر همبستگی مثبتی با ماندگاری دارد؟',
          'پرسش مرتبط ۲: در چه سطحی از کارمزد انتقال وجه، حساب‌های تجاری حساب‌های رقیب را افتتاح می‌کنند؟'
        ]
      }
    },
    2: {
      id: 2,
      roman: 'II',
      title: 'درک داده‌ها (Data Understanding)',
      taskGroup: 'جمع‌آوری، کاوش، توصیف و تایید کیفیت داده‌ها',
      lede: 'ارزیابی دسترسی به داده‌ها، حجم، صحت، توزیع آماری و مناسب بودن داده برای الگوی شناختی هدف.',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'بدون داده‌های باکیفیت و معرف جامعه آماری، حتی پیشرفته‌ترین الگوریتم‌های هوش مصنوعی با شکست مواجه می‌شوند.',
      readingParagraphs: [
        'فاز درک داده‌ها با جمع‌آوری اولیه داده‌ها آغاز می‌شود و با فعالیت‌هایی برای آشنایی با ساختار داده، شناسایی مشکلات کیفیت داده، کشف نخستین بینش‌ها و دسته‌بندی ویژگی‌های داده ادامه می‌یابد.',
        'در متدولوژی CPMAI، درک داده به شکلی دقیق ارزیابی می‌کند که آیا داده‌های گردآوری‌شده واقعاً قادر به پاسخگویی به پرسش‌های کسب‌وکاریِ تدوین‌شده در فاز اول هستند یا خیر. در صورت نبود داده معتبر، تیم باید پیش از حرکت به مراحل بعد چاره‌اندیشی کند.'
      ],
      subtaskHeading: 'زیروظیفه: شناسنامه داده‌ها و سنجش کاستی‌های کیفی',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'گردآوری داده‌ها از پایگاه‌های داده عملیاتی، وب‌سرویس‌ها، سامانه‌های سازمانی قدیمی، لاگ‌ها و منابع داده شخص ثالث.',
        'بررسی ویژگی‌های ظاهری: تعداد رکوردها، ساختار فیلدها، نوع داده‌ها، روابط کلیدی و حجم ذخیره‌سازی.',
        'ممیزی کیفیت داده: جستجوی مقادیر گمشده (Null)، رکوردهای تکراری، ناهماهنگی در ثبت مقادیر، و سوگیری‌های تاریخی.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'شناسنامه داده',
          title: 'کاتالوگ منابع داده',
          desc: 'ثبت منشا داده‌ها، پروتکل‌های دسترسی، محرمانگی امنیتی، فرکانس بروزرسانی و متولی داده در سازمان.'
        },
        {
          chip: 'گزارش کاوش',
          title: 'توزیع آماری و همبستگی‌ها',
          desc: 'مستندسازی یافته‌های اولیه پیرامون توزیع ویژگی‌ها، داده‌های پرت، همبستگی متغیرها و نکات گردآوری.'
        },
        {
          chip: 'ممیزی کیفیت',
          title: 'کاستی‌ها و ریسک‌های سوگیری',
          desc: 'ثبت درصد داده‌های ناموجود، عدم تعادل رده‌ها (Class Imbalance) و سوگیری‌های ناشی از داده‌های سنتی.'
        }
      ],
      exampleNote: 'مثال: تجمیع تاریخچه تراکنش‌ها، رکوردهای تماس CRM، رفتار اپلیکیشن موبایل و پرونده‌های حضوری شعب.',
      worksheetHeading: 'برگهٔ تمرین: شناسنامه و ممیزی کیفیت داده',
      worksheetSubheading: 'منابع داده، مشاهدات کاوش و چالش‌های کیفی داده‌های پروژه خود را ثبت کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'تسلط خود بر اصول فاز درک داده‌های CPMAI را بسنجید.',
      quizzes: [
        {
          q: 'چرا در متدولوژی CPMAI فاز درک داده‌ها باید قبل از آماده‌سازی داده‌ها باشد؟',
          o: ['زیرا الگوریتم‌ها نیازمند جداول تمیز هستند', 'برای آگاهی از کاستی‌ها و نقایص داده قبل از صرف هزینه مهندسی آماده‌سازی', 'برای خرید زودهنگام سرورهای GPU'],
          ans: 1,
          explanation: 'بدون شناسایی توزیع، ناهنجاری‌ها و مشکلات ساختاری داده‌های خام، نمی‌توان برنامه مهندسی و پاک‌سازی موثری طراحی کرد.'
        },
        {
          q: 'بزرگ‌ترین ریسک هنگام کاوش در داده‌های تاریخی برای آموزش هوش مصنوعی چیست؟',
          o: ['حجم داده‌ها همیشه خیلی زیاد است', 'داده‌های تاریخی ممکن است پیش‌داوری‌های انسانی یا قوانین منسوخ سازمانی را بازتاب دهند', 'داده‌ها در فضای ابری ذخیره نمی‌شوند'],
          ans: 1,
          explanation: 'داده‌های تاریخی مکرراً تعصبات گذشته یا روندهای باطل را بازتاب می‌دهند که مدل هوش مصنوعی ممکن است آن‌ها را یاد گرفته و بازتولید کند.'
        },
        {
          q: 'کدام سند خروجی، مقادیر گم‌شده و خطاهای رکوردی را جمع‌بندی می‌کند؟',
          o: ['گزارش بازگشت سرمایه مدیریت', 'گزارش کیفیت و کاستی‌های داده (Data Quality Report)', 'جدول هایپرپارامترهای مدل'],
          ans: 1,
          explanation: 'گزارش کیفیت داده‌ها نرخ رکوردهای ناقص، داده‌های پرت و اشکالات ساختاری مکشوفه در کاوش اولیه را مستند می‌کند.'
        }
      ],
      example: {
        title: 'ممیزی داده‌های بانکداری خرد',
        primary: '۳ سال تاریخچه تراکنش‌ها (۴.۸ میلیون رکورد) به همراه لاگ نشست‌های اپلیکیشن موبایل طی ۲۴ ماه گذشته.',
        secondary: 'شناسایی نقص ۱۴ درصدی در ثبت درآمد متقاضیان در شعب قدیمی؛ تصمیم برای استعلام از سامانه‌های اعتبارسنجی.',
        details: [
          'منبع ۱: سیستم تراکنشی متمرکز (PostgreSQL) - اطلاعات دموگرافیک، مانده حساب، تراکنش‌ها.',
          'منبع ۲: تحلیل رفتار دیجیتال (Snowflake) - تعداد نشست‌ها، نرخ استفاده از خدمات آنلاین، رهاسازی فرم‌ها.',
          'منبع ۳: سامانه پاسخگویی مشتریان (CRM) - سابقه شکایات، امتیاز رضایت، زمان حل مشکلات.',
          'ریسک کیفی ثبت‌شده: عدم تعادل شدید کلاس‌ها (تنها ۳.۲٪ ریزش)، که نیازمند استراتژی‌های متعادلسازی در فاز ۳ است.'
        ]
      }
    },
    3: {
      id: 3,
      roman: 'III',
      title: 'آماده‌سازی داده‌ها (Data Preparation)',
      taskGroup: 'انتخاب، پاک‌سازی، ساخت ویژگی، ادغام و قالب‌بندی',
      lede: 'تبدیل داده‌های خام به مجموعه‌های آموزشی و ارزیابی استاندارد و پیشگیری قاطع از نشت داده (Data Leakage).',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'در پروژه‌های واقعی هوش مصنوعی، آماده‌سازی داده‌ها بین ۶۰ تا ۸۰ درصد زمان و تلاش تیم را به خود اختصاص می‌دهد.',
      readingParagraphs: [
        'فاز آماده‌سازی داده‌ها تمامی فعالیت‌های لازم برای ساخت مجموعه داده نهایی (داده‌هایی که به ابزارهای مدل‌سازی تحویل داده می‌شوند) را از داده‌های اولیه پوشش می‌دهد. این وظایف شامل انتخاب جداول و رکوردها، پاک‌سازی داده‌ها و ساخت ویژگی‌های جدید است.',
        'نکته اساسی در CPMAI جلوگیری از نشت داده (Data Leakage) است؛ وضعیتی که در آن اطلاعات آینده یا داده‌های مجموعه آزمون نادانسته وارد ویژگی‌های آموزش شده و دقت مدل را به شکل کاذب و غیرواقعی بالا نشان می‌دهند.'
      ],
      subtaskHeading: 'زیروظیفه: خط لوله مهندسی ویژگی و پیش‌پردازش',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'انتخاب ویژگی‌های مرتبط با اهداف فاز اول و فیلتر کردن نویزها بر اساس استانداردهای فاز دوم.',
        'پاک‌سازی داده‌ها با جایگزینی هوشمندانه مقادیر تهی، یکسان‌سازی فرمت‌ها و حذف موارد ناهنجار.',
        'مهندسی ویژگی‌های شناختی: ایجاد میانگین‌های متحرک زمانی، تعبیه متنی (Embeddings)، نرمال‌سازی و ترکیب متغیرها.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'معیار گزینش',
          title: 'منطق شمول یا حذف داده‌ها',
          desc: 'دلایل شفاف برای اینکه چرا برخی ستون‌ها، رکوردها یا بازه‌های زمانی نگه داشته شده یا دور ریخته شدند.'
        },
        {
          chip: 'کاتالوگ ویژگی‌ها',
          title: 'ویژگی‌های مهندسی‌شده',
          desc: 'مستندسازی تبدیلات ریاضی، تعبیه‌های برداری، کدهای متنی و فرمول‌های استخراج‌شده از دانش دامنه.'
        },
        {
          chip: 'تقسیم‌بندی داده',
          title: 'جداسازی آموزش، اعتبارسنجی و آزمون',
          desc: 'تقسیم داده‌ها با لحاظ کردن تقدم زمانی یا تفکیک لایه‌ای جهت تضمین عدم وقوع نشت اطلاعاتی.'
        }
      ],
      exampleNote: 'مثال: محاسبه شتاب ورود به همراه بانک در بازه ۳۰ روزه و نرخ رد تراکنش‌ها در ۹۰ روز گذشته.',
      worksheetHeading: 'برگهٔ تمرین: استراتژی آماده‌سازی و مهندسی ویژگی',
      worksheetSubheading: 'قوانین پاک‌سازی، ویژگی‌های استخراج‌شده و نحوه تقسیم داده‌های خود را تدوین کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'دانش خود را درباره پاک‌سازی داده و پیشگیری از نشت اطلاعات بسنجید.',
      quizzes: [
        {
          q: 'نشت داده (Data Leakage) در آماده‌سازی داده‌های یادگیری ماشین به چه معناست؟',
          o: ['نفوذ امنیتی سایبری به سرور', 'ورود اطلاعات آینده یا متغیر هدف به ویژگی‌های آموزش‌دهنده مدل', 'فشرده‌سازی بیش از حد فایل داده‌ها'],
          ans: 1,
          explanation: 'نشت داده زمانی رخ می‌دهد که اطلاعاتی که در زمان پیش‌بینی واقعی در دسترس نیستند وارد فرآیند آموزش شوند و امتیازات ارزیابی را به شکلی کاذب بالا ببرند.'
        },
        {
          q: 'چرا تبدیلات آماری (مثل نرمال‌سازی) باید فقط روی داده‌های آموزش (Train) محاسبه و برازش شوند؟',
          o: ['تا توزیع داده‌های آزمون و اعتبارسنجی پارامترهای آموزش را تحت‌تاثیر قرار ندهد', 'برای افزایش سرعت محاسبات پایتون', 'چون کتابخانه‌ها داده آزمون را قبول نمی‌کنند'],
          ans: 0,
          explanation: 'محاسبه مقادیر میانگین و واریانس روی کل داده‌ها باعث می‌شود اطلاعات داده‌های آزمون به مرحله آموزش نشت کند و استقلال آزمون نقض شود.'
        },
        {
          q: 'هنگام مواجهه با عدم تعادل شدید کلاس‌ها (مثلاً ۲ درصد ریزش)، کدام رویکرد آماده‌سازی صحیح است؟',
          o: ['حذف همه رکوردهای اقلیت', 'نمونه‌گیری لایه‌ای (Stratified) یا بازنمونه‌گیری ترکیبی (SMOTE)', 'دو برابر کردن تعداد ستون‌ها'],
          ans: 1,
          explanation: 'نمونه‌گیری طبقه‌ای تضمین می‌کند توزیع اقلیت در تمام بخش‌های آموزش و آزمون حفظ شود و تکنیک‌های بازنمونه‌گیری تعادل را ایجاد کنند.'
        }
      ],
      example: {
        title: 'خط لوله مهندسی ویژگی‌های ریزش',
        primary: 'ساخت ۴۲ شاخص مبتنی بر پنجره‌های زمانی ۳۰، ۶۰ و ۹۰ روزه برای رصد تغییر رفتار مشتریان.',
        secondary: 'اعمال مرزبندی زمانی: داده‌های سه فصل اول ۲۰۲۵ برای آموزش و فصل چهارم برای آزمون مستقل.',
        details: [
          'ویژگی ۱: `delta_login_frequency_30d` - نسبت دفعات ورود به همراه بانک در ۳۰ روز اخیر نسبت به میانگین ۱۸۰ روزه.',
          'ویژگی ۲: `unresolved_ticket_flag` - نشانگر باینری ثبت تیکت پشتیبانی بی‌پاسخ در ۱۴ روز اخیر.',
          'پاک‌سازی: جایگزینی درآمدهای مفقود با میانه درآمدی گروه سنی و شغلی مشابه.',
          'کنترل نشت: حذف کامل ستون وضعیت ابطال کارت از تمام آرایه‌های ورودی مدل پیش‌بین.'
        ]
      }
    },
    4: {
      id: 4,
      roman: 'IV',
      title: 'توسعه مدل (Model Development)',
      taskGroup: 'انتخاب تکنیک، طراحی طرح آزمون، ساخت و ارزیابی فنی مدل',
      lede: 'آموزش مدل‌های خط مبنا و پیشرفته، تنظیم بهینه ابرپارامترها و سنجش بر اساس معیارهای فنی اعتبارسنجی.',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'در این فاز علوم شناختی و الگوریتم‌های یادگیری ماشین به داده‌های آماده‌شده پیوند می‌خورند.',
      readingParagraphs: [
        'در این فاز تکنیک‌های مختلف مدل‌سازی انتخاب و اعمال شده و پارامترهای آن‌ها روی مقادیر بهینه تنظیم می‌شوند. معمولاً برای یک مسئله تجاری چندین الگوریتم مختلف قابل استفاده است.',
        'در متدولوژی CPMAI، تیم همواره قبل از استفاده از مدل‌های یادگیری عمیق پیچیده، یک مدل خط مبنای ساده (Baseline) مانند رگرسیون لجستیک یا قواعد ساده شرطی می‌سازد تا اثبات کند آیا پیچیدگی الگوریتم ارزش افزوده و بهبود واقعی ایجاد می‌کند یا خیر.'
      ],
      subtaskHeading: 'زیروظیفه: گزینش الگوریتم و تنظیم ابرپارامترها',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'تعریف یک خط مبنای شفاف بر پایه قوانین ساده تجاری یا مدل‌های آماری پایه.',
        'آموزش معماری‌های کاندیدا (مانند درخت‌های گرادیان بوستینگ، شبکه‌های عصبی یا مدل‌های زبانی).',
        'تنظیم ساختاریافته هایپرپارامترها با اعتبارسنجی متقاطع (Cross-Validation) و تحلیل خطاهای طبقه‌بندی.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'انتخاب الگوریتم',
          title: 'منطق گزینش تکنیک',
          desc: 'توجیه چرایی تناسب الگوریتم انتخاب‌شده با الگوی شناختی هدف، محدودیت تاخیر زمانی و حجم داده‌ها.'
        },
        {
          chip: 'پروتکل آزمون',
          title: 'طراحی چارچوب اعتبارسنجی',
          desc: 'تعریف بخش‌های اعتبارسنجی، متدهای ارزیابی (K-Fold) و معیارهای فنی سنجش (F1، AUC-ROC، PR-AUC).'
        },
        {
          chip: 'کارنامه مدل',
          title: 'گزارش مقایسه با خط مبنا',
          desc: 'جدول مقایسه‌ای عملکرد مدل‌های کاندیدا در برابر خط مبنای ساده و ارزیابی سربار محاسباتی.'
        }
      ],
      exampleNote: 'مثال: مقایسه الگوریتم درخت گرادیان بوستینگ (LightGBM) با رگرسیون لجستیک خط مبنا.',
      worksheetHeading: 'برگهٔ تمرین: ماتریس مدل‌سازی و مقایسه عملکرد',
      worksheetSubheading: 'الگوریتم‌های انتخابی، تنظیمات ابرپارامترها و نتایج سنجش فنی را ثبت کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'تسلط خود بر نظم توسعه مدل و خط مبنا در CPMAI را بسنجید.',
      quizzes: [
        {
          q: 'چرا CPMAI بر ساخت یک مدل خط مبنای ساده (Baseline) پیش از الگوریتم‌های پیچیده تاکید دارد؟',
          o: ['برای کاهش هزینه لایسنس نرم‌افزار', 'برای اثبات اینکه آیا پیچیدگی شناختی پیشرفت ملموسی نسبت به قوانین ساده ایجاد می‌کند', 'زیرا یادگیری عمیق همیشه شکست می‌خورد'],
          ans: 1,
          explanation: 'بدون مدل خط مبنا، مشخص نخواهد شد که آیا مدل پیچیده ارزش واقعی افزوده است یا صرفاً تاخیر، هزینه نگهداری و ابهام را بالا برده است.'
        },
        {
          q: 'کدام معیار برای سنجش مدل روی داده‌های بسیار نامتعادل (مثلاً ۲ درصد ریزش) مناسب‌ترین است؟',
          o: ['دقت ساده (Accuracy)', 'سطح زیر منحنی دقت-بازیابی (PR-AUC) یا معیار F1', 'میانگین خطای مربعات (MSE)'],
          ans: 1,
          explanation: 'دقت ساده در داده‌های نامتعادل گمراه‌کننده است؛ پیش‌بینی همیشگیِ "عدم ریزش" دقت ۹۸٪ می‌دهد اما فایده عملیاتی ندارد. PR-AUC و F1 موفقیت در رده اقلیت را می‌سنجند.'
        },
        {
          q: 'اگر مدلی روی داده‌های آموزش امتیاز عالی و روی داده‌های آزمون امتیاز ضعیفی کسب کند، اقدام صحیح چیست؟',
          o: ['استقرار فوری در تولید', 'مهار بیش‌برازش (Overfitting) با منظم‌سازی، کاهش عمق یا ساده‌سازی مدل', 'حذف داده‌های آزمون'],
          ans: 1,
          explanation: 'فاصله زیاد عملکرد آموزش و آزمون نشانه بیش‌برازش است؛ یعنی مدل نویزهای آموزش را به جای الگوهای عمومی حفظ کرده است.'
        }
      ],
      example: {
        title: 'کارنامه سنجش مدل‌های ریزش',
        primary: 'مدل بهینه‌سازی‌شده LightGBM به میزان ۲۴ درصد PR-AUC بهتری نسبت به خط مبنای رگرسیون لجستیک ثبت کرد.',
        secondary: 'طرح آزمون: اعتبارسنجی متقاطع ۵ لایه‌ای زمان‌بندی‌شده با توقف زودهنگام (Early Stopping).',
        details: [
          'خط مبنا (رگرسیون لجستیک): PR-AUC = 0.41، بازیابی در ۱۰٪ بالای اولویت = ۴۸٪، تاخیر = ۴ میلی‌ثانیه.',
          'کاندید ۱ (جنگل تصادفی): PR-AUC = 0.58، بازیابی در ۱۰٪ بالای اولویت = ۶۳٪، تاخیر = ۲۸ میلی‌ثانیه.',
          'کاندید ۲ (LightGBM بهینه‌شده): PR-AUC = 0.65، بازیابی در ۱۰٪ بالای اولویت = ۷۲٪، تاخیر = ۹ میلی‌ثانیه (انتخاب نهایی).',
          'ابرپارامترها: max_depth=6, learning_rate=0.03, colsample_bytree=0.8, n_estimators=450.'
        ]
      }
    },
    5: {
      id: 5,
      roman: 'V',
      title: 'ارزیابی مدل (Model Evaluation)',
      taskGroup: 'ارزیابی بر اساس اهداف کسب‌وکار، ممیزی اخلاق و تصمیم‌گیری',
      lede: 'سنجش تحقق واقعی شاخص‌های کسب‌وکار فاز اول، ممیزی انصاف و اخلاق، و تعیین تصمیم گیت پیشرفت.',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'دقت فنی بالای مدل به تنهایی تضمین‌کننده ایجاد ارزش تجاری برای سازمان نیست.',
      readingParagraphs: [
        'در این مرحله مدلی ساخته‌اید که از منظر تحلیل داده‌ها کیفیت بالایی دارد. با این حال، قبل از استقرار نهایی، ارزیابی دقیق مدل در برابر اهداف اولیه کسب‌وکار و ممیزی ابعاد اخلاقی و حقوقی ضروری است.',
        'هدف اصلی CPMAI در این فاز کشف مواردی است که شاید تاکنون مغفول مانده‌اند. در پایان فاز پنجم یک تصمیم رسمی اتخاذ می‌شود: تایید برای استقرار (Phase VI)، بازگشت به آماده‌سازی داده‌ها، بازتنظیم مدل، یا بازبینی اهداف کسب‌وکار.'
      ],
      subtaskHeading: 'زیروظیفه: تطبیق با اهداف کسب‌وکار و ممیزی انصاف',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'ترجمه معیارهای یادگیری ماشین به زبان مالی، نرخ بازگشت سرمایه (ROI) و هزینه‌های خطای مثبت/منفی کاذب.',
        'ممیزی انصاف، عدم تبعیض الگوریتمی علیه زیرگروه‌ها، قابلیت توضیح‌پذیری مدل (SHAP/LIME) و انطباق قانونی.',
        'تشکیل جلسه تصمیم‌گیری با ذی‌نفعان برای صدور تاییدیه رسمی عبور از گیت فاز پنجم.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'ارزیابی تجاری',
          title: 'اعتبارسنجی سودآوری و KPIها',
          desc: 'محاسبه شفاف میزان برآورده شدن اهداف کلیدی فاز اول در مقایسه با هزینه‌های عملیاتی جاری.'
        },
        {
          chip: 'ممیزی اخلاق',
          title: 'بررسی انصاف، تعصب و توضیح‌پذیری',
          desc: 'تحلیل خطای مدل روی گروه‌های جمعیتی مختلف، مخاطرات آسیب به کاربر و شفافیت خروجی‌ها.'
        },
        {
          chip: 'تصمیم گیت',
          title: 'تاییدیه رسمی رفتن به فاز بعد',
          desc: 'ثبت تصمیم تیم: استقرار عملیاتی، تکرار داده‌ها، بازتنظیم الگوریتم یا تغییر رویکرد.'
        }
      ],
      exampleNote: 'مثال: محاسبه اینکه چگونه بازیابی ۷۲ درصدی، هزینه حفظ مشتری را در برابر بودجه مشوق‌ها توجیه می‌کند.',
      worksheetHeading: 'برگهٔ تمرین: ارزیابی کسب‌وکاری و تصمیم‌گیری گیت',
      worksheetSubheading: 'انطباق مدل با اهداف کسب‌وکار، ممیزی اخلاق و تصمیم نهایی تیم را ثبت کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'درک خود از ارزیابی تجاری و اخلاق هوش مصنوعی را ارزیابی کنید.',
      quizzes: [
        {
          q: 'تفاوت اساسی فاز پنجم با فاز چهارم در متدولوژی CPMAI چیست؟',
          o: ['فاز چهارم معیارهای فنی را می‌سنجد؛ فاز پنجم ارزش تجاری و انطباق اخلاقی را ارزیابی می‌کند', 'فاز پنجم فقط برای نوشتن تست‌های نرم‌افزاری است', 'فاز پنجم برای آموزش مجدد با تعداد دورهای بیشتر است'],
          ans: 0,
          explanation: 'فاز چهارم می‌پرسد "آیا مدل با دقت پیش‌بینی می‌کند؟"؛ اما فاز پنجم پاسخ می‌دهد که "آیا این پیش‌بینی سودآور، اخلاقی و حلال مسئله مشتری است؟".'
        },
        {
          q: 'اگر مدلی دارای نمره F1 بالایی باشد اما خطاهای آن به شکل ناعادلانه‌ای روی یک گروه خاص متمرکز باشد، چه باید کرد؟',
          o: ['استقرار فوری به دلیل بالا بودن نمره کلی', 'توقف استقرار و بازگشت برای تصحیح داده‌ها و رفع تعصب', 'مخفی کردن نتایج آن گروه'],
          ans: 1,
          explanation: 'معیارهای اخلاقی و انصاف در CPMAI خطوط قرمز هستند و عدم رعایت آن‌ها مستلزم توقف و اصلاح در فازهای پیشین است.'
        },
        {
          q: 'خروجی‌های ممکن در جلسه تصمیم‌گیری گیت فاز پنجم کدامند؟',
          o: ['فقط استقرار در سرور', 'استقرار، بازگشت برای تکرار (Iterate) یا بازنگری در اهداف (Pivot)', 'آپلود خودکار روی کلاد'],
          ans: 1,
          explanation: 'فاز پنجم یک ایستگاه چابک است؛ اگر مدل نیازهای تجاری را برآورده نکند، تیم به آماده‌سازی داده یا بازتنظیم مدل برمی‌گردد.'
        }
      ],
      example: {
        title: 'ارزیابی گیت مدیریتی',
        primary: 'سود خالص سالانه ۱.۸۵ میلیون دلار ناشی از حفظ حساب‌ها در برابر ۲۴۰ هزار دلار هزینه کمپین‌های نگهداشت.',
        secondary: 'ممیزی انصاف: نرخ خطای مثبت کاذب بین بازه‌های سنی مختلف متعادل بوده و تفاوت زیر ۳ درصد است.',
        details: [
          'بررسی KPI فاز اول: هدف اولیه ۱۲٪ کاهش ریزش بود؛ شبیه‌سازی‌ها تحقق ۱۴.۳٪ کاهش را تایید می‌کنند.',
          'توضیح‌پذیری مدل: نمودارهای SHAP به داشبورد متصدیان شعبه متصل شدند تا ۳ دلیل اصلی ریسک ریزش نمایش داده شود.',
          'انطباق قوانین: تایید کامل عدم نقض حریم خصوصی و ضوابط اعتبارسنجی بانکی.',
          'تصمیم گیت: تایید مشروط (Approved) برای ورود به فاز ۶ و اجرای پایلوت در منطقه آزمایشی.'
        ]
      }
    },
    6: {
      id: 6,
      roman: 'VI',
      title: 'عملیاتی‌سازی (Operationalization)',
      taskGroup: 'برنامه‌ریزی استقرار، پایش، نگهداری و بازنگری پایانی',
      lede: 'استقرار مدل در فرآیندهای تولید، پیاده‌سازی رصد انحراف داده‌ها (Drift)، تدوین SLA و مستندسازی نهایی.',
      readHeading: 'بخوانید: هدف این فاز چیست؟',
      readSubheading: 'مدلی که فقط در نوت‌بوک تحقیقاتی باقی بماند، هیچ ارزش پایداری برای سازمان خلق نخواهد کرد.',
      readingParagraphs: [
        'ساخت مدل پایان پروژه نیست. دانشی که از مدل به دست می‌آید باید در فرآیندهای تصمیم‌گیری زنده سازمان به کار گرفته شود. این فاز شامل استقرار سرویس، پیاده‌سازی سازوکارهای مانیتورینگ و تضمین تاب‌آوری سامانه است.',
        'در CPMAI، پایش مستمر برای انحراف داده‌ها (Data Drift) و فرسایش مدل (Concept Drift) یک الزام قطعی است، چرا که تغییر رفتار کاربران در دنیای واقعی به سرعت دقت مدل‌ها را کاهش می‌دهد.'
      ],
      subtaskHeading: 'زیروظیفه: خط لوله تولید و حاکمیت پایش انحراف',
      subtaskSubheading: 'چه کاری انجام می‌دهید و چه چیزی تولید می‌کنید.',
      descriptionPoints: [
        'تعیین معماری استقرار: وب‌سرویس بلادرنگ (API)، پردازش دسته‌ای شبانه (Batch) یا اجرا روی دستگاه لبه (Edge).',
        'طراحی سیستم مانیتورینگ خودکار: سنجش انحراف آماری متغیرها (PSI)، افزایش زمان پاسخ و افت نرخ رضایت.',
        'تدوین دفترچه راهنمای عملیات (Runbook)، سناریوی بازگشت به نسخه قبل (Rollback) و ثبت درس‌آموخته‌ها.'
      ],
      artifactsHeading: 'مستندات خروجی وظیفه (Artifacts)',
      artifacts: [
        {
          chip: 'طرح استقرار',
          title: 'معماری محیط عملیاتی',
          desc: 'نقشه راه زیرساخت، میکروسرویس‌ها، کشینگ، کانتینرها و سازوکار جایگزین در صورت بروز خطا.'
        },
        {
          chip: 'طرح مانیتورینگ',
          title: 'پایش انحراف و سلامت سیستم',
          desc: 'تعریف آستانه‌های هشدار برای انحراف توزیع ویژگی‌ها (PSI > 0.2)، تاخیر سرویس و بازآموزی خودکار.'
        },
        {
          chip: 'گزارش نهایی',
          title: 'تحویل سیستم و درس‌آموخته‌ها',
          desc: 'خلاصه اجرایی برای حامیان پروژه، دستورالعمل نگهداری و فرم تاییدیه نهایی تحویل به کارفرما.'
        }
      ],
      exampleNote: 'مثال: استقرار امتیازدهی ریزش به عنوان یک پایپ‌لاین دسته‌ای شبانه که هر بامداد داشبورد شعب را آپدیت می‌کند.',
      worksheetHeading: 'برگهٔ تمرین: استقرار و دفترچه راهنمای عملیات',
      worksheetSubheading: 'معماری استقرار، برنامه‌های مانیتورینگ و سناریوهای نگهداری سیستم را تدوین کنید.',
      quizHeading: 'بررسی فهم مطالب',
      quizSubheading: 'دانش خود را پیرامون سرویس‌دهی، پایش انحراف و نگهداری در CPMAI بسنجید.',
      quizzes: [
        {
          q: 'انحراف مفهوم (Concept Drift) در یک سیستم هوش مصنوعی عملیاتی به چه معناست؟',
          o: ['پر شدن فضای دیسک سخت سرور', 'تغییر رابطه آماری میان متغیرهای ورودی و برچسب هدف در گذر زمان به دلیل تغییر رفتار در دنیای واقعی', 'منسوخ شدن نسخه زبان پایتون'],
          ans: 1,
          explanation: 'انحراف مفهوم زمانی رخ می‌دهد که رفتار واقعی افراد یا شرایط اقتصادی تغییر کرده و الگوهای گذشته دیگر پیش‌بینی‌کننده آینده نباشند.'
        },
        {
          q: 'چرا طرح عملیاتی‌سازی باید حتماً شامل برنامه بازگشت (Rollback Plan) باشد؟',
          o: ['برای بازگشت آنی به مدل قبلی یا قوانین سنتی در صورت عملکرد ناهنجار مدل در محیط زنده', 'چون قانون ابری به آن نیاز دارد', 'برای پاک کردن اطلاعات کاربران'],
          ans: 0,
          explanation: 'اگر مدل جدید در مواجهه با شرایط پیش‌بینی‌نشده خطای بحرانی دهد، مکانیزم بازگشت سریع از توقف جریان تجاری سازمان جلوگیری می‌کند.'
        },
        {
          q: 'کدام سند، تحویل موفق پروژه از تیم هوش مصنوعی به تیم عملیات و کاربران نهایی را تضمین می‌کند؟',
          o: ['تاریخچه کامیت‌های گیت', 'دفترچه راهنمای عملیات (Runbook) و گزارش تحویل نهایی پروژه', 'فایل CSV داده‌های آموزش اولیه'],
          ans: 1,
          explanation: 'دفترچه راهنمای عملیات نحوه پشتیبانی، مراحل بازآموزی مدل، حل خطاهای متداول و مانیتورینگ روزمره را به شکل رسمی تشریح می‌کند.'
        }
      ],
      example: {
        title: 'استقرار و پایش عملیاتی',
        primary: 'پایپ‌لاین پردازش شبانه کانتینری در کوبرنتیز؛ به‌روزرسانی نمرات ریسک مشتریان در CRM تا ساعت ۶:۰۰ صبح.',
        secondary: 'پایش: محاسبه خودکار شاخص پایداری جمعیت (PSI) و هشدار به تیم در صورت عبور شاخص از ۰.۱۵.',
        details: [
          'حالت سرویس‌دهی: پردازش دسته‌ای شبانه ۳۲۰ هزار مشتری فعال ظرف ۱۸ دقیقه.',
          'سازوکار پشتیبان: در صورت بروز خطای داده در پایپ‌لاین، سیستم به طور خودکار به نمرات مبتنی بر قوانین سوئیچ می‌کند.',
          'برنامه بازآموزی: بازآموزی ماهانه مدل با تایید و بازبینی انسانی پیش از جایگزینی در سرور.',
          'مسئول ران‌بوک: تیم MLOps مرکزی سازمان با اسکالیشن به سرپرست عملیات شعب بانک.'
        ]
      }
    }
  }
};
