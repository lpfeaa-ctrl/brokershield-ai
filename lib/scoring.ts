import { DealFormData, AnalysisResult, RiskLevel } from "./types";

export function calculateDealScore(form: DealFormData): AnalysisResult {
  let score = 50; // Neutral baseline
  const redFlags: string[] = [];
  const strengths: string[] = [];
  const missingInfo: string[] = [];

  // --- Positive factors ---
  if (form.directBuyer) {
    score += 20;
    strengths.push("Direct buyer confirmed — no additional chain risk");
  }
  if (form.directSeller) {
    score += 20;
    strengths.push("Direct seller confirmed — source of product is clear");
  }
  if (form.corporateEmail) {
    score += 10;
    strengths.push("Corporate email verified — institutional counterparty");
  }
  if (form.pofAvailable) {
    score += 15;
    strengths.push("Proof of Funds available — buyer liquidity confirmed");
  }
  if (form.popAvailable) {
    score += 15;
    strengths.push("Proof of Product available — seller capacity confirmed");
  }
  if (form.kycAccepted) {
    score += 10;
    strengths.push("KYC accepted — compliance willingness demonstrated");
  }
  if (form.clearProcedure) {
    score += 10;
    strengths.push("Procedure is clear and industry-standard");
  }
  if (form.realisticPrice) {
    score += 10;
    strengths.push("Price is within realistic market range");
  }
  if (form.documentsConsistent) {
    score += 10;
    strengths.push("Documents are consistent and appear legitimate");
  }

  // --- Negative factors ---
  if (form.tooManyIntermediaries) {
    score -= 25;
    redFlags.push("Too many intermediaries in the chain — bypass risk is high");
  }
  if (form.genericEmail) {
    score -= 10;
    redFlags.push("Generic email address (Gmail/Yahoo) — not a professional entity");
  }
  if (!form.pofAvailable) {
    score -= 20;
    missingInfo.push("Proof of Funds not provided — buyer liquidity unverified");
  }
  if (!form.popAvailable) {
    score -= 20;
    missingInfo.push("Proof of Product not available — seller capacity unverified");
  }
  if (form.unrealisticPrice) {
    score -= 25;
    redFlags.push("Price or discount appears unrealistic — possible scam indicator");
  }
  if (form.refusesKyc) {
    score -= 30;
    redFlags.push("Counterparty refuses KYC — CRITICAL compliance red flag");
  }
  if (!form.clearProcedure) {
    score -= 20;
    missingInfo.push("No clear or standard procedure defined for this deal");
  }
  if (form.noCompanyWebsite) {
    score -= 10;
    redFlags.push("No verifiable company website — authenticity cannot be confirmed");
  }
  if (form.highUrgencyPressure) {
    score -= 15;
    redFlags.push("High urgency pressure from counterparty — classic manipulation tactic");
  }
  if (form.unclearCommission) {
    score -= 10;
    redFlags.push("Commission structure is unclear — risk of dispute or bypass");
  }

  // Additional inferred missing info
  if (!form.buyerName) missingInfo.push("Buyer identity not specified");
  if (!form.sellerName) missingInfo.push("Seller identity not specified");
  if (!form.origin) missingInfo.push("Product origin country not provided");
  if (!form.destination) missingInfo.push("Destination country not specified");
  if (!form.paymentTerms) missingInfo.push("Payment terms not defined");
  if (!form.incoterm) missingInfo.push("Incoterm not specified");

  // Clamp score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine risk level
  let riskLevel: RiskLevel;
  let riskLabel: string;
  let recommendedAction: string;
  let professionalAssessment: string;

  if (score >= 80) {
    riskLevel = "strong";
    riskLabel = "Strong Opportunity";
    recommendedAction =
      "Proceed to formal negotiation. Request final documentation package (POP, POF, LC draft) and schedule compliance verification. This deal shows strong indicators for successful closure.";
    professionalAssessment =
      `This operation presents a strong commercial opportunity with a risk score of ${score}/100. All major verification criteria are met. The counterparty profile indicates institutional credibility and operational capacity. We recommend advancing to the formal negotiation stage with a full compliance review. Commission structure should be finalized in writing before proceeding. Estimated closing probability is high.`;
  } else if (score >= 60) {
    riskLevel = "qualified";
    riskLabel = "Qualified — Needs Verification";
    recommendedAction =
      "Continue due diligence. Request missing documents and clarify open points before committing. Schedule a direct call or video verification with key counterparties. Do not sign any agreement until all red flags are resolved.";
    professionalAssessment =
      `This operation qualifies for continued evaluation with a risk score of ${score}/100. The deal shows promising indicators but contains gaps that require resolution before advancement. Focus on obtaining the missing documentation identified and verifying counterparty credentials directly. A structured due diligence process is strongly recommended before proceeding to negotiation.`;
  } else if (score >= 40) {
    riskLevel = "medium";
    riskLabel = "Medium Risk";
    recommendedAction =
      "Proceed with caution. Address all red flags before investing further time. Request video call verification and complete KYC. Avoid signing any LOI or NDA until critical items are resolved.";
    professionalAssessment =
      `This operation carries medium risk with a score of ${score}/100. Several factors raise concern and require immediate attention. The number of unresolved red flags suggests that this deal requires significant additional verification before it can be considered viable. We recommend a structured checklist review and direct counterparty authentication before further engagement.`;
  } else if (score >= 20) {
    riskLevel = "high";
    riskLabel = "High Risk";
    recommendedAction =
      "Do not advance without resolving critical red flags. Request immediate KYC, direct counterparty access, and professional legal review. Strongly consider withdrawing until credibility is established.";
    professionalAssessment =
      `This operation is classified as HIGH RISK with a score of ${score}/100. Multiple critical red flags have been identified that indicate a high probability of fraud, misrepresentation, or deal failure. We strongly advise against committing any resources, capital, or time until each identified risk is thoroughly investigated and resolved. Legal counsel should be consulted.`;
  } else {
    riskLevel = "critical";
    riskLabel = "Not Recommended";
    recommendedAction =
      "Reject this operation. The risk profile indicates this deal is not viable and may represent a fraudulent attempt. Document your findings and do not engage further.";
    professionalAssessment =
      `This operation receives a critical risk classification with a score of ${score}/100. The combination of red flags identified strongly suggests that this is either a fraudulent deal or fundamentally unworkable from a compliance and commercial standpoint. BrokerShield AI strongly recommends declining this opportunity and documenting the interaction for future reference. Do not engage further.`;
  }

  // Calculate closing probability
  const closingProbability = Math.round((score / 100) * 85 + 5);

  return {
    score,
    riskLevel,
    riskLabel,
    closingProbability,
    redFlags,
    strengths,
    missingInfo,
    recommendedAction,
    professionalAssessment,
  };
}

// Color and label helpers
export function getRiskColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    strong:    "#22c55e",
    qualified: "#3b82f6",
    medium:    "#f59e0b",
    high:      "#f97316",
    critical:  "#ef4444",
  };
  return colors[level];
}

export function getRiskBg(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    strong:    "rgba(34, 197, 94, 0.1)",
    qualified: "rgba(59, 130, 246, 0.1)",
    medium:    "rgba(245, 158, 11, 0.1)",
    high:      "rgba(249, 115, 22, 0.1)",
    critical:  "rgba(239, 68, 68, 0.1)",
  };
  return colors[level];
}

export function getRiskLabel(level: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    strong: "Strong",
    qualified: "Qualified",
    medium: "Medium Risk",
    high: "High Risk",
    critical: "Critical",
  };
  return labels[level];
}

export function getRiskBorder(level: RiskLevel): string {
  const borders: Record<RiskLevel, string> = {
    strong:    "rgba(34, 197, 94, 0.25)",
    qualified: "rgba(59, 130, 246, 0.25)",
    medium:    "rgba(245, 158, 11, 0.25)",
    high:      "rgba(249, 115, 22, 0.25)",
    critical:  "rgba(239, 68, 68, 0.25)",
  };
  return borders[level];
}

export function getScoreFromLevel(level: RiskLevel): number {
  const scores: Record<RiskLevel, number> = {
    strong: 88,
    qualified: 72,
    medium: 52,
    high: 28,
    critical: 12,
  };
  return scores[level];
}
