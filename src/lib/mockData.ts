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
}

export const mockCompanies: Record<string, CompanyIntelligence> = {
  stripe: {
    name: "Stripe",
    website: "stripe.com",
    industry: "Fintech / Payment Processing",
    overview: {
      description: "Financial infrastructure for the internet. Millions of businesses—from startups to large enterprises—use Stripe to accept payments, send payouts, and manage their businesses online.",
      hq: "San Francisco, CA & Dublin, Ireland",
      size: "8,500+ employees",
      revenue: "$14.3B (2025 est.)",
    },
    funding: {
      total: "$2.4B raised",
      lastRound: "Secondary Market (Valuation: $70B)",
      investors: ["Sequoia Capital", "Andreessen Horowitz", "Peter Thiel", "Elon Musk"],
    },
    news: [
      { date: "2026-05-12", title: "Stripe Launches Unified AI Billing Platform for SaaS", source: "TechCrunch" },
      { date: "2026-04-01", title: "Stripe Processes Record $1.2 Trillion in Transaction Volume", source: "Bloomberg" },
    ],
    leadership: [
      { name: "Patrick Collison", role: "CEO & Co-founder", previous: "Auctomatic" },
      { name: "John Collison", role: "President & Co-founder", previous: "Harvard University" },
      { name: "Dhivya Suryadevara", role: "CFO (Former)", previous: "General Motors" },
    ],
    techStack: ["Ruby on Rails", "Scala", "Go", "React", "MongoDB", "AWS", "Kafkastream", "LlamaIndex"],
    hiringSignals: [
      "Aggressive hiring for AI Integration Engineers within the Stripe Billing team",
      "Expanding enterprise sales leadership in Europe and APAC",
      "New job postings for Regulatory Compliance specialists in Latin America",
    ],
    competitors: [
      { name: "Adyen", share: "Strong Europe, unified commerce", advantage: "Stripe's developer ecosystem & startup mindshare is vastly superior" },
      { name: "PayPal / Braintree", share: "High consumer trust", advantage: "Stripe offers cleaner multi-product api structures and developer APIs" },
    ],
    buyingSignals: [
      "Stripe is migrating enterprise billing models to hybrid usage-based schemas",
      "Recent acquisition of TaxJar suggests focus on automated global compliance upsells",
      "Expanding support channels for large-scale enterprise merchant migrations",
    ],
    recommendedPitch: {
      angle: "Enterprise Usage-Based Billing Optimization",
      painPoint: "Enterprise customers struggle to reconcile complex, dynamic usage billing rates with existing ERP integrations.",
      solution: "Implement an automated billing gateway adapter linked with CRM logs, improving reconciliation speed by 92% and reducing customer churn.",
    },
    decisionMakers: [
      { name: "Sarah Franklin", role: "Head of Enterprise Sales", linkedin: "linkedin.com/in/sfranklin" },
      { name: "Liam O'Connor", role: "VP of Developer Relations", linkedin: "linkedin.com/in/loconnor" },
    ],
  },
  vercel: {
    name: "Vercel",
    website: "vercel.com",
    industry: "Cloud Infrastructure / DevTools",
    overview: {
      description: "Vercel provides the developer experience and infrastructure to build, deploy, and scale the frontend web. Vercel enables developers to host websites that are fast, secure, and dynamically scaled.",
      hq: "New York, NY (Remote-first)",
      size: "950+ employees",
      revenue: "$180M ARR (2025 est.)",
    },
    funding: {
      total: "$313M raised",
      lastRound: "Series D ($150M at $2.5B Valuation)",
      investors: ["TCV", "8VC", "GV", "Accel", "Bedrock"],
    },
    news: [
      { date: "2026-05-20", title: "Vercel introduces v0 Next-Gen AI interface engine", source: "Vercel Blog" },
      { date: "2026-03-10", title: "Next.js 16 Released with Native WebMCP Integrations", source: "Vercel Ship" },
    ],
    leadership: [
      { name: "Guillermo Rauch", role: "CEO & Founder", previous: "Socket.io Creator" },
      { name: "Lee Robinson", role: "VP of Developer Experience", previous: "Hy-Vee" },
    ],
    techStack: ["Next.js", "React", "Rust (Turbopack)", "AWS (Lambda/CloudFront)", "Vercel Edge Network", "Node.js"],
    hiringSignals: [
      "Recruiting Solutions Engineers for the Enterprise Web team in EMEA",
      "Hiring for WebAssembly Core performance engineers",
    ],
    competitors: [
      { name: "Netlify", share: "Static web & composable arch", advantage: "Vercel has the unfair advantage of owning Next.js development" },
      { name: "AWS Amplify / Cloudflare Pages", share: "Cheap serverless hosting", advantage: "Vercel provides a significantly better developer experience (DX) and v0 integration" },
    ],
    buyingSignals: [
      "Enterprise clients complain about rising bandwith egress pricing models",
      "Vercel is pushing heavily into enterprise security (WAF, SSO, HIPAA compliance)",
    ],
    recommendedPitch: {
      angle: "Zero-Trust Edge Performance & Egress Mitigation",
      painPoint: "Enterprise apps face scaling spikes and unexpected bills from heavy serverless function executions and data egress.",
      solution: "Deploy static-generation fallbacks with incremental site revalidation (ISR) and localized edge caching middleware.",
    },
    decisionMakers: [
      { name: "Guillermo Rauch", role: "CEO & Founder", linkedin: "linkedin.com/in/rauchg" },
      { name: "Katy Turner", role: "VP of Enterprise Marketing", linkedin: "linkedin.com/in/kturner" },
    ],
  },
  openai: {
    name: "OpenAI",
    website: "openai.com",
    industry: "Artificial Intelligence",
    overview: {
      description: "AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
      hq: "San Francisco, CA",
      size: "2,000+ employees",
      revenue: "$4B ARR (2025 est.)",
    },
    funding: {
      total: "$13B+ raised",
      lastRound: "Strategic investment from Microsoft & Thrive Capital",
      investors: ["Microsoft", "Thrive Capital", "Khosla Ventures", "Y Combinator"],
    },
    news: [
      { date: "2026-06-05", title: "OpenAI releases GPT-5 Omni with Native Multi-Agent Scheduling", source: "AI Wire" },
      { date: "2026-04-18", title: "OpenAI Opens Enterprise Office in Tokyo", source: "Nikkei" },
    ],
    leadership: [
      { name: "Sam Altman", role: "CEO & Co-founder", previous: "Y Combinator President" },
      { name: "Greg Brockman", role: "President & Co-founder", previous: "Stripe CTO" },
      { name: "Jakub Pachocki", role: "Chief Scientist", previous: "OpenAI Research Director" },
    ],
    techStack: ["Python", "PyTorch", "Kubernetes", "Azure Cloud Infrastructure", "Rust", "Triton", "React"],
    hiringSignals: [
      "Hiring for Superalignment Safety research engineers",
      "Expanding high-performance GPU cluster compute engineering teams",
    ],
    competitors: [
      { name: "Anthropic", share: "Strong safety branding", advantage: "OpenAI has the first-mover scale, consumer brand loyalty, and Microsoft backing" },
      { name: "Google Gemini", share: "Deep search integration", advantage: "OpenAI has standard API ecosystems and developer mindshare" },
    ],
    buyingSignals: [
      "High compute costs force custom model distillation for mobile integrations",
      "Expanding enterprise data isolation agreements to attract finance clients",
    ],
    recommendedPitch: {
      angle: "On-Premises District Distillation & Routing",
      painPoint: "High-security financial and healthcare companies are reluctant to send proprietary customer profiles to public endpoints.",
      solution: "Construct a secure model routing middleware with local token filtering, and deploy distilled model subsets on private cloud VPCs.",
    },
    decisionMakers: [
      { name: "Brad Lightcap", role: "Chief Operating Officer", linkedin: "linkedin.com/in/blightcap" },
      { name: "Mira Murati", role: "VP of Product Engineering", linkedin: "linkedin.com/in/mmurati" },
    ],
  },
  generic: {
    name: "Custom Corp",
    website: "customcorp.io",
    industry: "Technology Services",
    overview: {
      description: "A growing technology services enterprise focusing on digital transformation, cloud integrations, and business automation solutions.",
      hq: "Boston, MA",
      size: "250+ employees",
      revenue: "$45M ARR",
    },
    funding: {
      total: "$15M raised",
      lastRound: "Series A ($12M)",
      investors: ["Bessemer Venture Partners", "Local Angels"],
    },
    news: [
      { date: "2026-01-10", title: "Custom Corp Appoints New CTO to Lead Cloud Efforts", source: "BusinessWire" },
    ],
    leadership: [
      { name: "David Chen", role: "CEO & Founder", previous: "Accenture Lead" },
      { name: "Sarah Jenkins", role: "CTO", previous: "AWS Senior Principal Engineer" },
    ],
    techStack: ["TypeScript", "Next.js", "Postgres", "AWS", "Python", "Docker"],
    hiringSignals: [
      "Hiring for senior cloud architects and software engineers",
    ],
    competitors: [
      { name: "Global Systems", share: "Large traditional contracts", advantage: "Custom Corp is agile, modern, and implements AI-augmented development cycles" },
    ],
    buyingSignals: [
      "Expanding corporate operations to support remote teams in South America",
      "Migrating legacy database backends to modern cloud providers",
    ],
    recommendedPitch: {
      angle: "AI-Augmented Cloud Migration Framework",
      painPoint: "Legacy databases hinder application scaling, but manual migrations are costly and prone to data integrity issues.",
      solution: "Deploy a script-based migration engine with AI-driven schema conversion validation to slash transition time by 60%.",
    },
    decisionMakers: [
      { name: "David Chen", role: "CEO & Founder", linkedin: "linkedin.com/in/dchen" },
      { name: "Sarah Jenkins", role: "CTO", linkedin: "linkedin.com/in/sjenkins" },
    ],
  },
};

export const defaultProposal = {
  title: "Enterprise AI Modernization Proposal",
  company: "Stripe",
  executiveSummary: "This proposal outlines the deployment of an AI-driven, usage-based billing optimization engine designed to integrate natively with Stripe's enterprise accounting workflows. By implementing custom data routing layers, Stripe can reduce customer billing reconciliation cycles from 15 days to under 4 hours, directly impacting operational efficiency and customer retention.",
  problemStatement: "Enterprise merchants utilizing Stripe processing face substantial frictions when reconciling variable, consumption-based pricing metrics with static ERP records. Manual reconciliation causes billing delays, revenue leakage, and increased client support tickets.",
  opportunity: "Expanding Stripe's core offering with a real-time ledger sync middleware creates a massive sticky upsell channel. This addresses a major operational bottleneck for high-volume enterprise clients who process over $50M annually.",
  solutionOverview: "We propose constructing a Next-Gen API Billing Adapter. Using lightweight WebMCP schemas, this adapter parses real-time client transaction logs, matches them against active contract billing formulas, and pushes automated invoices straight to QuickBooks and NetSuite.",
  roi: "Expected ROI: 310% within the first 12 months. Reduces billing administrative costs by $180k/year and captures an estimated $240k in previously leaked billing discrepancies.",
  implementationPlan: "Phase 1: Architecture design & API schema definitions (Weeks 1-2)\nPhase 2: Core ledger sync engine development & integration sandbox (Weeks 3-6)\nPhase 3: Pilot launch with 3 selected enterprise merchants (Weeks 7-9)\nPhase 4: Global rollout & SLA monitoring setup (Week 10)",
  pricing: "Implementation & Advisory: $120,000 flat fee.\nSaaS License & Maintenance: $4,500/month (billed annually).",
  caseStudies: "1. FinTech Hub: Reduced monthly billing exceptions by 94% using the prototype adapter.\n2. SaaSify Corp: Saved 40+ hours per month in finance reconciliation overhead.",
  nextSteps: "1. Review and sign the letter of intent.\n2. Schedule the technical alignment kickoff session.\n3. Establish sandboxed API permissions.",
};

export const defaultSlides = [
  { id: "1", title: "Executive Overview", content: "Optimizing Stripe's Billing Engine for Enterprise Scale and Real-time Ledger Synchronization." },
  { id: "2", title: "The Operational Friction", content: "Enterprise client billing reconciliation takes 12-15 days, costing accounting teams hundreds of manual hours and risking invoice errors." },
  { id: "3", title: "The Solution: Real-Time Sync", content: "A web-based API adapter utilizing event-driven microservices to bind billing cycles directly with ERP ledger systems." },
  { id: "4", title: "Financial Impact & ROI", content: "Calculated savings of $180k in overhead and 92% compression in reconciliation lag time, delivering 300%+ ROI in Year 1." },
  { id: "5", title: "Rollout & Next Steps", style: "bg-purple-900/20 border-purple-500/30", content: "Kickoff scheduled for Q3. Sandbox development commences immediately post agreement signature." }
];

export const mockConnectors = [
  { id: "gmail", name: "Gmail", desc: "Sync and trigger client email outreach", logo: "✉️", category: "Communication", status: "Connected", sync: "10 mins ago", permissions: ["Read emails", "Send outreach drafts"] },
  { id: "hubspot", name: "HubSpot", desc: "Pull account metadata and sync buying signals", logo: "🧡", category: "CRM", status: "Disconnected", sync: "Never", permissions: ["Read contacts", "Update opportunities"] },
  { id: "slack", name: "Slack", desc: "Stream agent activity alerts to internal channels", logo: "💬", category: "Communication", status: "Connected", sync: "1 min ago", permissions: ["Post messages", "Read public channels"] },
  { id: "salesforce", name: "Salesforce", desc: "Automate account mapping and lead insertion", logo: "☁️", category: "CRM", status: "Disconnected", sync: "Never", permissions: ["Read/Write accounts", "Manage tasks"] },
  { id: "gdrive", name: "Google Drive", desc: "Export reports, presentations, and spreadsheets", logo: "📁", category: "Storage", status: "Connected", sync: "2 hours ago", permissions: ["Create files", "View directories"] },
  { id: "linkedin", name: "LinkedIn", desc: "Identify company decision makers and hiring signals", logo: "💼", category: "Research", status: "Connected", sync: "1 hour ago", permissions: ["Search profiles", "View company pages"] },
  { id: "notion", name: "Notion", desc: "Sync generated briefings and internal documentation", logo: "📓", category: "Productivity", status: "Connected", sync: "5 mins ago", permissions: ["Read pages", "Create workspace tables"] },
  { id: "postgres", name: "Postgres", desc: "Store structured market intelligence profiles", logo: "🐘", category: "Productivity", status: "Connected", sync: "Real-time", permissions: ["Query tables", "Insert rows"] },
  { id: "apollo", name: "Apollo.io", desc: "Acquire verified executive contact email lists", logo: "🚀", category: "Research", status: "Disconnected", sync: "Never", permissions: ["Enrich emails", "Search positions"] },
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
    { step: "Planning", desc: "Analyzing target company: Stripe. Planning information retrieval parameters...", duration: "0.8s", tool: "Agent Brain", logs: "Received request: Stripe (stripe.com), Depth: Deep Intelligence, Target Audience: CEO.\nGenerating task graph...\nTask 1: Search Crunchbase & funding datasets.\nTask 2: Query LinkedIn API for leadership and hiring trends.\nTask 3: Run tech stack scanner on stripe.com.\nTask 4: Pull news articles from past 30 days." },
    { step: "Tool Selection", desc: "Selecting research scrapers, LinkedIn profile analyzers, and tech stack detectors...", duration: "0.5s", tool: "Tool Registry", logs: "Loading APIs...\nLinkedIn Scraper: ACTIVE\nWappalyzer SDK: ACTIVE\nGoogle Search Custom Engine: ACTIVE\nFinancial API Gateway: ACTIVE" },
    { step: "Execution", desc: "Querying database, scraping website headers, and resolving executive profiles...", duration: "2.4s", tool: "LinkedIn Scraper", logs: "Scraping stripe.com headers...\nDetected HTTP Headers: Server: cloudflare, Cache-Control: max-age=0.\nRunning reverse DNS...\nFound public endpoints: api.stripe.com, billing.stripe.com.\nResolving leadership profiles: Patrick Collison, John Collison found.\nFound 124 active job listings. High density in 'Enterprise AI billing integration'." },
    { step: "Verification", desc: "Deduplicating findings, structuring financial entries, and validating key buying signals...", duration: "1.2s", tool: "Agent Validator", logs: "Comparing competitor lists with HubSpot active leads.\nAdyen, PayPal verified as competitors.\nCross-checking funding data against Crunchbase records. Series I/Secondary valuation: $70B.\nData completeness score: 98.4%." },
    { step: "Artifact Generation", desc: "Compiling information cards and preparing bento board widgets...", duration: "1.1s", tool: "Bento Builder", logs: "Structuring outputs into JSON template...\nCreating cards: Overview, Funding, Recent News, Technology Stack, Hiring, Competitive Analysis, Selling Pitch.\nFormatting markdown text templates..." },
    { step: "Completion", desc: "Research compiled. Business intelligence workspace updated successfully.", duration: "0.3s", tool: "Agent Brain", logs: "All agent runs completed successfully in 6.3 seconds.\nResult payload sent to client.\nCleaning cache files.\nSystem Idle." }
  ],
  proposal: [
    { step: "Planning", desc: "Analyzing company intelligence & drafting proposal structure...", duration: "1.0s", tool: "Agent Brain", logs: "Reading Stripe intelligence profile...\nFormulating Executive Summary, Opportunity mapping, Solution overview, and ROI models." },
    { step: "Execution", desc: "Generating consulting-grade paragraphs & mapping pricing tiers...", duration: "2.8s", tool: "Proposal Writer", logs: "Generating section 1: Executive Summary...\nGenerating section 2: Problem statement...\nCalculating ROI formulas: 310% based on $180k savings on a $120k budget.\nFormatting PDF structures..." },
    { step: "Verification", desc: "Validating proposal consistency and run-time spell checks...", duration: "0.9s", tool: "Validation Engine", logs: "Verifying formatting templates.\nWord count: 852. Tone check: Professional / High-Trust Consulting." },
    { step: "Artifact Generation", desc: "Building proposal PDF and creating file directory link...", duration: "1.5s", tool: "PDF Publisher", logs: "Compiling latex document...\nPDF successfully created at: /artifacts/stripe_proposal_v1.pdf." },
    { step: "Completion", desc: "Proposal generation complete. Document added to Artifacts folder.", duration: "0.4s", tool: "Agent Brain", logs: "Proposal draft compiled. Ready for download." }
  ],
  presentation: [
    { step: "Planning", desc: "Structuring 5-slide deck based on enterprise ledger integration proposal...", duration: "0.6s", tool: "Agent Brain", logs: "Structuring outline...\nSlide 1: Executive Overview\nSlide 2: Operational Friction\nSlide 3: Real-Time Sync\nSlide 4: Financial Impact\nSlide 5: Rollout Schedule" },
    { step: "Execution", desc: "Applying visual theme & inserting slide content templates...", duration: "1.9s", tool: "PPTX Builder", logs: "Drawing custom slides in memory...\nApplying custom layouts, typography styling, and bullet offsets.\nAdding modern purple accent highlight colors." },
    { step: "Artifact Generation", desc: "Compiling PowerPoint presentation file...", duration: "1.2s", tool: "PPTX Exporter", logs: "Writing PPTX zip stream...\nFile successfully exported to: /artifacts/stripe_presentation.pptx" },
    { step: "Completion", desc: "PowerPoint presentation generated successfully.", duration: "0.2s", tool: "Agent Brain", logs: "Slides ready." }
  ],
  email: [
    { step: "Planning", desc: "Analyzing recipient list and selecting best personalizations...", duration: "0.5s", tool: "Agent Brain", logs: "Loading recipient target: Sarah Franklin (Salesforce & Stripe metadata).\nSubject line optimization check..." },
    { step: "Execution", desc: "Drafting email outreach & scoring spam indicators...", duration: "1.2s", tool: "Email Compiler", logs: "Drafting message using personalization tokens...\nRunning spam filters (checking for triggers like 'free', 'guaranteed', excessive caps).\nSpam index score: 0.12 (Very Low).\nReadability score: Grade 8 (Optimal)." },
    { step: "Verification", desc: "Verifying Gmail API connection credentials...", duration: "0.8s", tool: "Gmail Connector", logs: "Checking OAuth token validity. Token is valid.\nSender account: executive@copilot.io." },
    { step: "Completion", desc: "Email outreach generated and synced with Gmail drafts.", duration: "0.3s", tool: "Agent Brain", logs: "Outreach scheduled as draft." }
  ]
};
