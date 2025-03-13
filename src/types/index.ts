export type Product = {
  id: number;
  name: string;
  family: 'VALUE_FLEX' | 'STANDARD';
  type: 'VARIABLE' | 'FIXED';
  term:
    | '1_YEAR'
    | '2_YEAR'
    | '3_YEAR'
    | '4_YEAR'
    | '5_YEAR'
    | '6_YEAR'
    | '7_YEAR'
    | '10_YEAR';
  insurable: boolean;
  insurance: 'INSURED' | 'CONVENTIONAL';
  prepaymentOption: 'STANDARD' | 'ENHANCED' | 'HELOC';
  restrictionsOption:
    | 'NO_RESTRICTIONS'
    | 'SOME_RESTRICTIONS'
    | 'MORE_RESTRICTIONS';
  restrictions: string;
  fixedPenaltySpread: 'SMALL_PENALTY' | 'BANK_PENALTY';
  helocOption: 'HELOC_WITH' | 'HELOC_WITHOUT';
  helocDelta: number;
  lenderName: string;
  lenderType: 'MONOLINE' | 'BIG_BANK';
  rateHold: '30_DAYS' | '45_DAYS' | '60_DAYS' | '90_DAYS' | '120_DAYS';
  rate: number;
  ratePrimeVariance: number;
  bestRate: number;
  created: string;
  updated: string;
};

export type Applicant = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Application = {
  readonly id: string;
  type: 'NEW' | 'RENEWAL' | 'REFINANCE';
  readonly createdAt: string;
  token: string;
  productId: number;
  applicants: Applicant[];
};

export type CreateApplication = {
  productId: number;
};

export interface CardProduct {
  id: number;
  type: 'Fixed' | 'Variable';
  name: string;
  bestRate: number;
  lenderName: string;
}
