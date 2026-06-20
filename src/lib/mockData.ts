export interface CompanyIntelligence {
  name: string;
  website: string;
  industry: string;
  overview: {
    description: string;
    hq: string;
    size: string;
    revenue: string;
  };
  funding: {
    total: string;
    lastRound: string;
    investors: string[];
  };
  news: { date: string; title: string; source: string }[];
  leadership: { name: string; role: string; previous: string }[];
  techStack: string[];
  hiringSignals: string[];
  competitors: { name: string; share: string; advantage: string }[];
  buyingSignals: string[];
  recommendedPitch: { angle: string; painPoint: string; solution: string };
  decisionMakers: { name: string; role: string; linkedin: string }[];
  pdfUrl?: string;
  pptUrl?: string;
}

export const createDefaultCompany = (name: string): CompanyIntelligence => {
  const cleanName = name.trim();
  const domain = `${cleanName.toLowerCase().replace(/\s+/g, "")}.com`;
  return {
    name: cleanName,
    website: domain,
    industry: "Enterprise / Technology",
    overview: {
      description: `${cleanName} is being researched by our AI agent network. Please wait...`,
      hq: "Resolving...",
      size: "Resolving...",
      revenue: "Resolving...",
    },
    funding: {
      total: "Resolving...",
      lastRound: "Resolving...",
      investors: [],
    },
    news: [],
    leadership: [],
    techStack: [],
    hiringSignals: [
      "Analyzing active hiring pipelines...",
    ],
    competitors: [],
    buyingSignals: [
      "Scanning executive interviews and web trends...",
    ],
    recommendedPitch: {
      angle: `Strategic assessment integration for ${cleanName}`,
      painPoint: "Resolving technical recruitment latencies and bottlenecks...",
      solution: `Verifying coding capabilities for ${cleanName} technical teams.`,
    },
    decisionMakers: [],
  };
};

export const mockCompanies: Record<string, CompanyIntelligence> = {
  stripe: {
    name: "Stripe",
    website: "stripe.com",
    industry: "Fintech / Payment Processing",
    overview: {
      description: "Financial infrastructure for the internet. Millions of businesses—from startups to large enterprises—use Stripe to accept payments, send payouts, and manage their businesses online.",
      hq: "San Francisco, CA",
      size: "8,500+ employees",
      revenue: "$14.3B (2025 est.)",
    },
    funding: {
      total: "$2.4B raised",
      lastRound: "Secondary Market (Valuation: $70B)",
      investors: ["Sequoia Capital", "Andreessen Horowitz", "Peter Thiel"],
    },
    news: [
      { date: "2026-05-12", title: "Stripe Launches Unified AI Billing Platform for SaaS", source: "TechCrunch" },
    ],
    leadership: [
      { name: "Patrick Collison", role: "CEO & Co-founder", previous: "Auctomatic" },
      { name: "John Collison", role: "President & Co-founder", previous: "Harvard University" },
    ],
    techStack: ["Ruby on Rails", "Scala", "Go", "React", "MongoDB", "AWS"],
    hiringSignals: [
      "Hiring for AI Integration Engineers within the Stripe Billing team",
    ],
    competitors: [
      { name: "Adyen", share: "Strong Europe", advantage: "Stripe has superior developer ecosystem mindshare" },
    ],
    buyingSignals: [
      "Stripe is migrating enterprise billing models to hybrid usage-based schemas",
    ],
    recommendedPitch: {
      angle: "Enterprise Usage-Based Billing Optimization",
      painPoint: "Enterprise customers struggle to reconcile usage billing with existing ERP integrations.",
      solution: "Implement an automated billing gateway adapter to speed reconciliation.",
    },
    decisionMakers: [
      { name: "Sarah Franklin", role: "Head of Enterprise Sales", linkedin: "linkedin.com/in/sfranklin" },
    ],
  },
  vercel: {
    name: "Vercel",
    website: "vercel.com",
    industry: "Cloud Infrastructure / DevTools",
    overview: {
      description: "Vercel provides the developer experience and infrastructure to build, deploy, and scale the frontend web.",
      hq: "New York, NY",
      size: "950+ employees",
      revenue: "$180M ARR",
    },
    funding: {
      total: "$313M raised",
      lastRound: "Series D ($2.5B Valuation)",
      investors: ["TCV", "GV", "Accel"],
    },
    news: [
      { date: "2026-05-20", title: "Vercel introduces v0 Next-Gen AI interface engine", source: "Vercel Blog" },
    ],
    leadership: [
      { name: "Guillermo Rauch", role: "CEO & Founder", previous: "Socket.io Creator" },
    ],
    techStack: ["Next.js", "React", "Rust", "AWS", "Node.js"],
    hiringSignals: [
      "Recruiting Solutions Engineers for the Enterprise Web team in EMEA",
    ],
    competitors: [
      { name: "Netlify", share: "Mid market host", advantage: "Vercel owns Next.js development" },
    ],
    buyingSignals: [
      "Enterprise clients complain about rising bandwidth egress pricing models",
    ],
    recommendedPitch: {
      angle: "Zero-Trust Edge Performance & Egress Mitigation",
      painPoint: "Enterprise apps face scaling spikes and unexpected bills from function executions.",
      solution: "Deploy static-generation fallbacks with incremental site revalidation.",
    },
    decisionMakers: [
      { name: "Guillermo Rauch", role: "CEO & Founder", linkedin: "linkedin.com/in/rauchg" },
    ],
  },
};

export const getProposalForCompany = (name: string, description?: string) => {
  const comp = name || "Target Company";
  return {
    title: `${comp} Enterprise AI Modernization Proposal`,
    company: comp,
    executiveSummary: `This proposal outlines the integration of TalentIQ's automated screening ledger with ${comp}'s hiring workflows. By embedding high-fidelity coding sandboxes and automated evaluations, ${comp} can compress technical screening times from 4 weeks to 4 hours, mitigating drop-off rates and optimizing recruitment costs.`,
    problemStatement: `${comp}'s high-volume hiring flows suffer from manual screening bottlenecks, where recruiters review hundreds of developer submittals manually. This triggers interview fatigue and delayed assessments.`,
    opportunity: `Deploying automated assessment adapters provides ${comp} HR leaders with instant verification data, ensuring only top-tier talent progresses to the final panel rounds.`,
    solutionOverview: `We propose configuring TalentIQ API adapters directly inside ${comp}'s recruitment portals to send short, localized screening challenges to applicants instantly.`,
    roi: "Expected ROI: 450% within the first 6 months by trimming recruiter review hours and saving $80k in technical vetting overhead.",
    implementationPlan: "Phase 1: Configure sandbox API integrations (Weeks 1-2)\nPhase 2: Standardize test templates for developer recruits (Weeks 3-4)\nPhase 3: Rollout live to global tech candidates (Week 5)",
    pricing: "Annual License fee: $24,000 flat.\nSetup & Configuration Advisory: $8,000.",
    caseStudies: "1. Vercel Systems: Compressed screening duration by 72% for node roles.\n2. Stripe Billing: Saved 80 recruiter hours monthly.",
    nextSteps: "1. Authorize API sandbox credentials.\n2. Schedule technical rollout kickoff.",
  };
};

export const defaultProposal = getProposalForCompany("Zoho");

export const defaultSlides = [
  { id: "1", title: "Executive Summary", content: "Optimizing tech sourcing pipelines with automated coding evaluation." },
  { id: "2", title: "The Operational Friction", content: "Vetting latency averages 4 weeks, triggering 35% candidate drop-off rates." },
  { id: "3", title: "The TalentIQ Solution", content: "Sandboxed browser IDEs that auto-evaluate technical proficiency instantly." },
  { id: "4", title: "Business Sourcing ROI", content: "Compresses hiring cycle by 90% and saves $80k annually on engineering reviews." },
  { id: "5", title: "Rollout & Next Steps", style: "bg-purple-900/20 border-purple-500/30", content: "Approve kickoff, integrate Recruit API sandboxes, launch 2-week pilot." }
];

// Custom presentation generators based on slide counts
export function getSlidesForCount(count: number, company: string, goal: string): { id: string; title: string; content: string; style?: string }[] {
  const compName = company || "Zoho";
  const goalStr = goal || "Sell TalentIQ Interview Platform";

  if (count <= 3) {
    return [
      { id: "1", title: "Executive Proposal Summary", content: `Evaluating ${goalStr} integration inside ${compName}'s global recruitment workforce.` },
      { id: "2", title: "Proposed Solution & ROI", content: `Embedding automated code-verification sandboxes inside active candidate profiles. Compresses latency by 90% and delivers $80k/year in recruiting hours saved.` },
      { id: "3", title: "Rollout & Setup Schedule", style: "bg-purple-900/20 border-purple-500/30", content: "Integrate core sandbox APIs. Run 2-week pilot with developer recruits before global production rollout." }
    ];
  }

  if (count <= 5) {
    return [
      { id: "1", title: "1. Executive Summary", content: `Deploying TalentIQ to optimize ${compName}'s developer vetting and remote acquisition pipelines.` },
      { id: "2", title: "2. Recruitment Challenges", content: `${compName} faces high screening latencies (averaging 4 weeks) and recruiter fatigue from reviewing hundreds of manual applications.` },
      { id: "3", title: "3. The TalentIQ Solution", content: "Automated, interactive coding sandboxes embedded natively in applicant profiles that auto-evaluate technical proficiency." },
      { id: "4", title: "4. Projected Business Impact", content: "Compresses hiring cycle from 28 days to 24 hours. Reduces candidate drop-off by 35% and saves $80k in vetting overhead." },
      { id: "5", title: "5. Recommended Next Steps", style: "bg-purple-900/20 border-purple-500/30", content: "Authorize sandbox credentials. Conduct pilot testing on engineering pipelines commencing Q3." }
    ];
  }

  if (count <= 7) {
    return [
      { id: "1", title: "1. Executive Summary", content: `Strategic proposal to deploy TalentIQ's screening matrix inside ${compName}'s recruitment organization.` },
      { id: "2", title: "2. Target Audience Context", content: `Addresses CHRO concerns surrounding talent sourcing velocities, interview leakage, and high-volume vetting bottlenecks.` },
      { id: "3", title: "3. Vetting Process Gaps", content: "Manual grading delays engineering hires. Top-tier candidates accept competitor offers before screening cycles conclude." },
      { id: "4", title: "4. TalentIQ Assessment Platform", content: "Provides sandboxed execution metrics, code efficiency grades, and plagiarism indicators before CVs reach engineers." },
      { id: "5", title: "5. Integration & API Workflows", content: "Syncs directly with Zoho Recruit database connectors using secure WebMCP adapters. Requires no infrastructure migration." },
      { id: "6", title: "6. Case Studies & ROI", content: "Reduced time-to-hire by 72% at Vercel. Expected ROI of 410% based on recruiter hour savings." },
      { id: "7", title: "7. Technical Kickoff Plan", style: "bg-purple-900/20 border-purple-500/30", content: "Finalize compliance reviews. Schedule API alignment session with Zoho engineering leads." }
    ];
  }

  // Fallback: 10 slides
  return [
    { id: "1", title: "1. Executive Summary", content: `Strategic briefing for introducing TalentIQ's automated technical screening to ${compName}.` },
    { id: "2", title: "2. Zoho Corporate Overview", content: `Mapping ${compName}'s aggressive hiring growth (200+ active roles) against remote candidate acquisition targets.` },
    { id: "3", title: "3. Sourcing Industry Trends", content: "Global developer pools are widening, but vetting volumes require automated pre-filtering to prevent engineering bottlenecks." },
    { id: "4", title: "4. Vetting Challenges", content: "HR coordinators face 4-week screening lag. Sourcing teams spend 20+ hours weekly manually grading basic programming tasks." },
    { id: "5", title: "5. Sourcing Process Gaps", content: "Manual coding challenges lack execution metrics, resulting in unqualified candidates passing to expensive live rounds." },
    { id: "6", title: "6. TalentIQ Solution Engine", content: "Combines browser-based IDE sandboxes, automated unit test executors, and coding efficiency metrics." },
    { id: "7", title: "7. Tech Architecture & Security", content: "Secure containerized code-running environment. Integrates directly with database endpoints using restricted SSL APIs." },
    { id: "8", title: "8. Expected Financial ROI", content: "Slashes recruitment administration cost by 65%. Year 1 estimated net savings of $120,000 in operational overhead." },
    { id: "9", title: "9. Case Studies & Validations", content: "Proven success at Stripe and Netlify. Compresses screening review latency from weeks to hours." },
    { id: "10", title: "10. Rollout Roadmap", style: "bg-purple-900/20 border-purple-500/30", content: "Approve Letter of Intent. Sync sandbox keys. Initialize pilot team launch." }
  ];
}

// Custom Email generator based on Goal and Style
export function getEmailForGoalAndStyle(
  goal: string,
  style: string,
  company: string,
  pitch: string
): { subject: string; body: string; followup: string; cta: string } {
  const comp = company || "Zoho";
  const p = pitch || "TalentIQ Interview Platform";

  const styleSignatures: Record<string, string> = {
    Executive: "Sincerely,\nExecutive Office\nTalentIQ Systems",
    Consultant: "Best regards,\nLead HR Architect\nConsulting Operations",
    Friendly: "Cheers,\nKoustav Sarkar\nTalentIQ Team",
    Persuasive: "Cordially,\nKoustav Sarkar\nStrategic Partnerships",
    "McKinsey Style": "Regards,\nSenior Engagement Director\nTalentIQ",
    "VC Style": "Best,\nInvestment Operations\nTalentIQ Capital",
  };

  const sig = styleSignatures[style] || "Best regards,\nKoustav Sarkar";

  if (goal === "Proposal Delivery") {
    return {
      subject: `Strategic Proposal: Vetting Automation for ${comp}`,
      body: `Dear CHRO,\n\nFollowing our review of ${comp}'s hiring goals, I am sharing our formal Proposal detailing how ${p} can optimize candidate qualification.\n\nWe outline a modular API integration designed to reduce screening latencies by 70%. Let's align on next steps.\n\n${sig}`,
      followup: `Hi there,\n\nJust following up on the screening proposal. I'd love to organize a 15-minute sync with Zoho's recruitment architects to review details.\n\nThanks,\nKoustav`,
      cta: "Schedule Proposal Review Sync",
    };
  }

  if (goal === "Meeting Request") {
    return {
      subject: `${comp} Tech Sourcing: Reducing Vetting Lag`,
      body: `Hi CHRO,\n\nCould we schedule 10 minutes next Tuesday to review how ${p} automates candidate qualifications?\n\nWe recently helped Vercel trim technical vetting latencies down from 3 weeks to under 4 hours, and I'd like to show you similar benchmarks for Zoho.\n\n${sig}`,
      followup: `Hi,\n\nFollowing up on my note regarding Zoho Recruit vetting. Would you have bandwidth for a brief demo next Wednesday?\n\nBest,\nKoustav`,
      cta: "Book 10-Minute Demo Slot",
    };
  }

  // Default: Cold Outreach
  return {
    subject: `Accelerating ${comp} Engineering Recruitment with Vetting Sandboxes`,
    body: `Dear CHRO,\n\nI noticed ${comp} is actively hiring software teams. With candidate volumes spiking, manual coding reviews introduce massive sourcing backlogs.\n\nBy integrating ${p} assessment engines directly into Zoho Recruit, you can automate technical vettings, saving 15+ recruiter hours weekly.\n\nLet me know if you would like to review the briefs.\n\n${sig}`,
    followup: `Hi there,\n\nFollowing up on my previous note. We'd love to set up a sandboxed account for Zoho's HR leads to test our developer vetting engine.\n\nBest,\nKoustav`,
    cta: "Request Demo Account Sandbox",
  };
}

export const mockConnectors = [
  { id: "gmail", name: "Gmail", desc: "Sync and trigger client email outreach", logo: "✉️", category: "Communication", status: "Connected", sync: "10 mins ago", permissions: ["Read emails", "Send outreach drafts"] },
  { id: "gdrive", name: "Google Drive", desc: "Export reports, presentations, and spreadsheets", logo: "📁", category: "Storage", status: "Connected", sync: "2 hours ago", permissions: ["Create files", "View directories"] },
  { id: "linkedin", name: "LinkedIn", desc: "Identify company decision makers and hiring signals", logo: "💼", category: "Research", status: "Connected", sync: "1 hour ago", permissions: ["Search profiles", "View company pages"] },
];

export const mockSkills = [
  { name: "Sales Account Research", desc: "Deep searches companies for pain points, active job listings, recent news, and technology stack changes to form a cohesive sales strategy.", inputs: "Company URL, target buyer role", outputs: "Bento Grid Intelligence Dossier", tools: ["LinkedIn", "Google Search", "TechStack Scraper"], successRate: "98.2%", executions: 345 },
  { name: "Proposal Writer", desc: "Analyzes company intel and drafts a multi-section consulting proposal detailing the ROI, implementation plan, pricing, and business case.", inputs: "Intelligence Dossier, custom criteria", outputs: "Word & PDF Business Proposal", tools: ["Notion", "Proposal Generator"], successRate: "94.7%", executions: 182 },
  { name: "Executive Brief Generator", desc: "Condenses news, hiring triggers, and financials into a single-page PDF briefing for C-suite briefings.", inputs: "Company Name", outputs: "Brief PDF", tools: ["LinkedIn", "Financial Scraper"], successRate: "99.1%", executions: 512 },
  { name: "Interview Preparation", desc: "Generates tailored questions and talking points for sales calls based on hiring signals and tech stack changes.", inputs: "Target Company Profile", outputs: "Talking points doc", tools: ["Competitive Intelligence Engine"], successRate: "96.4%", executions: 94 },
  { name: "Competitive Intelligence", desc: "Performs matrix comparisons across target competitors to identify relative pricing vulnerabilities and technical advantages.", inputs: "Company, Industry", outputs: "Competitive Matrix", tools: ["LinkedIn", "Market Intelligence Database"], successRate: "91.8%", executions: 220 },
  { name: "Investor Research", desc: "Audits funding history, investor lists, valuation, and executive profiles for diligence reviews.", inputs: "Startup Name", outputs: "Investor Due Diligence Report", tools: ["Crunchbase Scraper", "News API"], successRate: "95.5%", executions: 141 }
];

export const agentLogSequence = {
  research: [
    { step: "Researching Company", desc: "Analyzing company structure, funding history, and leadership...", duration: "1.2s", tool: "Wappalyzer API", logs: "Connecting to database records...\nCrawl targets established: zoho.com.\nRetrieved overview parameters: Profitable bootstrapped SaaS.\nScraped founder profiles: Sridhar Vembu." },
    { step: "Analyzing Hiring Trends", desc: "Identifying hiring volumes and active recruit pipelines...", duration: "1.0s", tool: "LinkedIn Recruiter", logs: "Scanning active job listings for Zoho Corporation...\nDetected 200+ hiring requirements.\nHigh density in technical hiring roles. Bottlenecks found in Austin and Chennai sourcing pools." },
    { step: "Finding Decision Makers", desc: "Matching target buyer positions and contact details...", duration: "0.8s", tool: "LinkedIn Scraper", logs: "Querying contact matrix for Zoho CHRO...\nFound matching profile: Deepa Krishnan (CHRO).\nFound secondary contact: Gopal Vembu (Global HR Ops).\nRetrieving LinkedIn handles." },
    { step: "Generating Proposal", desc: "Drafting structural proposal doc & estimating ROI...", duration: "1.6s", tool: "Proposal Writer", logs: "Calculating ROI models for TalentIQ assessments...\nProjected overhead compression: 65%.\nCalculating setup implementation fee: $8,000.\nFormulating executive summaries." },
    { step: "Creating Presentation", desc: "Structuring widescreen slides based on target requirements...", duration: "1.4s", tool: "PPTX Engine", logs: "Generating slide structures. Mode: 10 slides outline.\nDrawing title: Zoho Tech Sourcing.\nWriting slide nodes...\nDrawing ROI metrics: 450% projected yield." },
    { step: "Preparing Email Sequence", desc: "Drafting personalized cold outreach and follow-up templates...", duration: "1.1s", tool: "Outreach Compiler", logs: "Compiling template with variables.\nWriting subject line.\nDrafting Cold Outreach, Follow-up, and call-to-actions.\nOptimization score checked: 96/100." },
    { step: "Syncing Gmail Drafts", desc: "Injecting generated outreach directly to Gmail drafts...", duration: "0.6s", tool: "Gmail API Client", logs: "Connecting to Gmail client...\nPushing drafts to: draft_inbox.\nOAuth token checked: valid.\nDrafts synced successfully. System Idle." }
  ],
  proposal: [],
  presentation: [],
  email: []
};
