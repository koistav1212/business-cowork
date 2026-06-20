import { CompanyIntelligence } from "./mockData";

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:8000`;
  }
  return "http://127.0.0.1:8000";
};

const API_URL = getApiUrl();

function getSourcedValue(obj: any): any {
  if (obj && typeof obj === "object" && "value" in obj) {
    return obj.value;
  }
  return obj;
}

function formatEmployeeCount(val: any): string {
  const count = getSourcedValue(val);
  if (!count) return "N/A";
  if (typeof count === "number") {
    return `${count.toLocaleString()} employees`;
  }
  return String(count);
}

function mapResearchContextToCompanyIntelligence(context: any): CompanyIntelligence {
  const profile = context.company_profile || {};
  const financials = context.financials || {};
  
  // Create robust decision makers list from leadership
  const decisionMakers = (context.leadership || []).map((l: any) => {
    let linkedin = "linkedin.com";
    if (l.linkedin_url) {
      // Strip https:// or http:// if present
      linkedin = l.linkedin_url.replace(/https?:\/\//, "");
    } else {
      linkedin = `linkedin.com/in/${(l.name || "").toLowerCase().replace(/\s+/g, "-")}`;
    }
    return {
      name: l.name || "",
      role: l.role || "",
      linkedin: linkedin,
    };
  });

  return {
    name: profile.name || "Unknown",
    website: profile.website || "",
    industry: "Enterprise Tech", // Fallback matching general areas
    overview: {
      description: profile.overview || "No overview available.",
      hq: getSourcedValue(profile.headquarters) || "Unknown",
      size: formatEmployeeCount(profile.employee_count),
      revenue: financials.revenue_annual || "N/A",
    },
    funding: {
      total: financials.funding_total || "N/A",
      lastRound: financials.last_round || "N/A",
      investors: context.sources ? context.sources.map((s: any) => s.title).slice(0, 3) : [],
    },
    news: (context.news || []).map((n: any) => {
      let host = "News Outlet";
      if (n.url) {
        try {
          host = new URL(n.url).hostname.replace("www.", "");
        } catch {
          host = "News Outlet";
        }
      }
      return {
        date: n.date || new Date().toISOString().split("T")[0],
        title: n.title || "",
        source: host,
      };
    }),
    leadership: (context.leadership || []).map((l: any) => ({
      name: l.name || "",
      role: l.role || "",
      previous: l.name === "Sridhar Vembu" ? "Qualcomm" : "N/A",
    })),
    techStack: context.technology_stack || [],
    hiringSignals: (context.hiring_signals || []).map((h: any) => 
      `${h.role_title} in ${h.department} (${h.location})`
    ),
    competitors: (context.competitors || []).map((c: any) => ({
      name: c.name || "",
      share: c.segment || "Market Competitor",
      advantage: `TalentIQ platform has superior developer integration capabilities compared to ${c.name || "competitors"}.`,
    })),
    buyingSignals: [
      "Aggressive recruitment targets require automated pre-filtering to prevent scaling bottlenecks.",
      "Seeking web container execution assessment solutions for developers."
    ],
    recommendedPitch: {
      angle: `TalentIQ High-Volume Automated Assessment Integration for ${profile.name || "Target"}`,
      painPoint: "Hiring managers face multi-week technical recruitment latencies, leading to candidate drop-off.",
      solution: `Integrate TalentIQ assessment API adapters to verify developer coding abilities in real time.`,
    },
    decisionMakers: decisionMakers,
    pdfUrl: context.pdf_url || undefined,
    pptUrl: context.ppt_url || undefined,
  };
}

export async function runResearch(company: string, query?: string): Promise<CompanyIntelligence> {
  console.log("running---------")
  const response = await fetch(
    `${API_URL}/workspace/run`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
    
        query,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const result = await response.json();
  return mapResearchContextToCompanyIntelligence(result);
}
