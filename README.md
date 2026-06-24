
```text
ChatGPT Research
Claude Research
Claude Code
Manus
Perplexity Labs
```

then the architecture must change fundamentally.

---

# Phase 1 — Split Research From Execution

Currently:

```python
ResearchOrchestrator
```

is doing:

```python
intent
entity resolution
planning
provider selection
execution
verification
reporting
ui generation
```

all inside one process. 

Instead:

```text
Host Agent
│
├── Planner Agent
├── Research Director Agent
├── Tool Router Agent
├── Synthesizer Agent
├── UI Agent
└── Critic Agent
```

Every one becomes an independent service.

---

# Phase 2 — Convert Providers Into MCP Servers

Currently:

```python
CompanyProvider
NewsProvider
PeopleProvider
WebProvider
SECProvider
```

are Python classes. 

Convert each to:

```text
MCP Server
```

Example:

```text
/company-mcp
/news-mcp
/sec-mcp
/web-mcp
/people-mcp
/reddit-mcp
```

Each exposes tools:

```json
{
  "name": "get_company_profile"
}
```

```json
{
  "name": "scrape_company_website"
}
```

```json
{
  "name": "search_news"
}
```

The Host discovers tools dynamically.

No hardcoded imports.

---

# Phase 3 — Agent Registry

Create:

```python
AgentRegistry
```

```python
{
   "financial_analyst": "...",
   "competitive_analyst": "...",
   "industry_analyst": "...",
   "technology_analyst": "...",
   "valuation_analyst": "...",
   "risk_analyst": "...",
   "sales_analyst": "...",
   "ui_designer": "...",
   "report_writer": "...",
}
```

Then:

```python
agents = registry.get_agents(intent)
```

instead of:

```python
provider_calls = {...}
```

which you currently have. 

---

# Phase 4 — Dynamic Task Graph

Today:

```python
research_plan.providers
```

returns static providers. 

Future:

```json
{
  "tasks": [
    {
      "agent": "financial_analyst",
      "objective": "Analyze financial health"
    },
    {
      "agent": "competitor_analyst",
      "objective": "Analyze competitors"
    },
    {
      "agent": "industry_analyst",
      "objective": "Analyze industry"
    }
  ]
}
```

Graph is generated dynamically.

---

# Phase 5 — Parallel Agent Runtime

Current:

```python
provider1
provider2
provider3
```

Future:

```python
asyncio.gather(
    financial_agent.run(),
    competitor_agent.run(),
    industry_agent.run(),
    news_agent.run(),
    tech_agent.run()
)
```

Every agent has:

```python
memory
tools
scratchpad
sources
citations
```

Anthropic describes a similar orchestrator-worker approach where a lead researcher delegates independent investigations to parallel subagents and then synthesizes the results. ([Anthropic][1])

---

# Phase 6 — Shared Research Memory

Add:

```python
ResearchMemory
```

backed by:

```text
Postgres
Redis
Vector DB
Knowledge Graph
```

Store:

```json
{
   "visited_urls": [],
   "facts": [],
   "evidence": [],
   "contradictions": [],
   "open_questions": []
}
```

Every agent reads/writes here.

---

# Phase 7 — Evidence Store

Your EvidenceGraph is good but too small. 

Expand into:

```text
Evidence Warehouse
```

Tables:

```sql
sources
facts
claims
relationships
citations
contradictions
```

Think:

```text
Neo4j
ArangoDB
GraphDB
```

instead of:

```python
EvidenceGraph(nodes=[])
```

---

# Phase 8 — Research Loops

Today:

```text
Search once
Write report
Done
```

Future:

```text
Search
↓
Evaluate
↓
Gap Detection
↓
Search Again
↓
Evaluate
↓
Search Again
```

Example:

```python
for round in range(5):
    investigate()
    evaluate()
    fill_gaps()
```

This is where report quality jumps massively.

---

# Phase 9 — Real Website Deep Crawling

Currently you scrape only:

```text
company website
news
reddit
finance
```

Need:

```text
Official Website
About Page
Leadership Page
Products Page
Investor Relations
Annual Reports
SEC
Careers
Press Releases
Blog
GitHub
LinkedIn
Crunchbase
Glassdoor
Reddit
News
Patents
Documentation
```

For each source:

```python
WebsiteAgent
```

performs:

```text
crawl
extract
summarize
store evidence
```

---

# Phase 10 — Replace Company Extractor

Your Groq extractor:

```python
extract_company_from_prompt_groq()
```

only extracts one company. 

Need:

```json
{
  "companies": [],
  "people": [],
  "industries": [],
  "products": [],
  "comparison_targets": [],
  "research_objectives": []
}
```

For example:

```text
Compare Nvidia vs AMD AI strategy
```

should return:

```json
{
  "companies": [
    "Nvidia",
    "AMD"
  ],
  "research_type": "competitive_analysis"
}
```

not a single company.

---

# Phase 11 — Claude Code Style Execution

Add:

```text
Code Agent
```

Tools:

```text
Filesystem MCP
Git MCP
Terminal MCP
Docker MCP
Github MCP
```

Flow:

```text
Plan
↓
Generate Code
↓
Run Tests
↓
Fix
↓
Run Again
↓
Commit
```

This is how Claude Code works conceptually.

---

# Phase 12 — Dynamic UI Agent

Your current UI generation is still widget registry based.

Replace with:

```text
UI Agent
```

Input:

```json
{
  "workspace_type": "CEO_REPORT",
  "industry": "Semiconductors",
  "evidence": [...]
}
```

Output:

```json
{
  "pages":[
    {
      "title":"Executive Dashboard"
    },
    {
      "title":"Competitive Analysis"
    },
    {
      "title":"Financial Performance"
    },
    {
      "title":"AI Strategy"
    },
    {
      "title":"Risk Assessment"
    }
  ]
}
```

---

# Your Final Production Architecture

```text
Frontend (React/NextJS)

        ↓

API Gateway

        ↓

Host Agent

        ↓

Planner Agent
        ↓
Research Director

        ↓

Task Graph Builder

        ↓

Agent Runtime
 ├── Financial Agent
 ├── Industry Agent
 ├── Competitor Agent
 ├── Technology Agent
 ├── News Agent
 ├── Hiring Agent
 ├── Patent Agent
 ├── Risk Agent
 ├── Valuation Agent
 ├── UI Agent
 └── Critic Agent

        ↓

MCP Tool Layer
 ├── Web Search MCP
 ├── Browser MCP
 ├── SEC MCP
 ├── Finance MCP
 ├── News MCP
 ├── LinkedIn MCP
 ├── GitHub MCP
 ├── CRM MCP
 ├── Gmail MCP
 ├── Drive MCP
 └── Custom MCPs

        ↓

Research Memory
(Postgres + Redis + VectorDB + GraphDB)

        ↓

Evidence Store

        ↓

Fusion Agent

        ↓

Report Agent

        ↓

UI Agent

        ↓

React Dynamic Workspace
```

The biggest mistake would be continuing to add more logic into `orchestrator.py`. Your next major refactor should be:

```text
orchestrator.py
      ↓
HostAgent

research_planner.py
      ↓
TaskGraphBuilder

providers/*
      ↓
MCP Servers

ResearchContext
      ↓
ResearchMemory + EvidenceStore
```

[1]: https://www.anthropic.com/engineering/multi-agent-research-system?utm_source=chatgpt.com "How we built our multi-agent research system"
