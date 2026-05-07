// Core domain types for BrokerShield AI

export type RiskLevel = "strong" | "qualified" | "medium" | "high" | "critical";

export type DealStatus =
  | "New Lead"
  | "Under Review"
  | "Qualified"
  | "Negotiation"
  | "High Risk"
  | "Closed Won"
  | "Rejected";

export type CounterpartyType = "Buyer" | "Seller" | "Broker" | "Mandate";

// --- Deal / Operation ---
export interface Operation {
  id: string;
  product: string;
  buyer: string;
  seller: string;
  country: string;
  status: DealStatus;
  riskScore: number;
  riskLevel: RiskLevel;
  value: string;
  currency: string;
  date: string;
  origin?: string;
  destination?: string;
  incoterm?: string;
  paymentTerms?: string;
  notes?: string;
}

// --- Analyze Deal Form ---
export interface DealFormData {
  product: string;
  quantity: string;
  origin: string;
  destination: string;
  incoterm: string;
  price: string;
  buyerName: string;
  sellerName: string;
  brokerChain: string;
  paymentTerms: string;
  procedure: string;
  documentsAvailable: string[];
  notes: string;
  // Scoring flags
  directBuyer: boolean;
  directSeller: boolean;
  corporateEmail: boolean;
  pofAvailable: boolean;
  popAvailable: boolean;
  kycAccepted: boolean;
  clearProcedure: boolean;
  realisticPrice: boolean;
  documentsConsistent: boolean;
  tooManyIntermediaries: boolean;
  genericEmail: boolean;
  unrealisticPrice: boolean;
  refusesKyc: boolean;
  noCompanyWebsite: boolean;
  highUrgencyPressure: boolean;
  unclearCommission: boolean;
}

// --- Analysis Result ---
export interface AnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  riskLabel: string;
  closingProbability: number;
  redFlags: string[];
  strengths: string[];
  missingInfo: string[];
  recommendedAction: string;
  professionalAssessment: string;
}

// --- Due Diligence ---
export interface ChecklistItem {
  id: string;
  label: string;
  category: "buyer" | "seller" | "broker";
  checked: boolean;
  critical: boolean;
}

// --- Pipeline ---
export interface PipelineDeal {
  id: string;
  product: string;
  company: string;
  value: string;
  score: number;
  riskLevel: RiskLevel;
  country: string;
  status: DealStatus;
  flag?: string;
}

// --- Counterparty ---
export interface Counterparty {
  id: string;
  name: string;
  company: string;
  country: string;
  type: CounterpartyType;
  trustScore: number;
  riskLevel: RiskLevel;
  previousDeals: number;
  notes: string;
  email?: string;
  flag?: string;
}

// --- Report ---
export interface RiskReport {
  id: string;
  operationId: string;
  product: string;
  generatedAt: string;
  score: number;
  riskLevel: RiskLevel;
  summary: string;
  redFlags: string[];
  missingInfo: string[];
  recommendedAction: string;
  conclusion: string;
}
