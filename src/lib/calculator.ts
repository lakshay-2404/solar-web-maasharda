import {
  DCR_SYSTEM_COST_PER_KW,
  ELECTRICITY_RATE,
  UNITS_PER_KW_PER_MONTH,
  SUBSIDY_RATES,
  MAX_SUBSIDY,
} from "./constants";

export interface CalculatorInput {
  monthlyBill: number;
}

export interface CalculatorResult {
  systemKw: number;
  unitsPerMonth: number;
  monthlySavings: number;
  annualSavings: number;
  subsidy: number;
  estimatedSystemCost: number;
  postSubsidyCost: number;
}

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

export function calculate(input: CalculatorInput): CalculatorResult {
  const { monthlyBill } = input;

  const rawKw = monthlyBill / ELECTRICITY_RATE / UNITS_PER_KW_PER_MONTH;
  const systemKw = Math.max(0.5, roundToHalf(rawKw));

  const unitsPerMonth = systemKw * UNITS_PER_KW_PER_MONTH;
  const monthlySavings = unitsPerMonth * ELECTRICITY_RATE;
  const annualSavings = monthlySavings * 12;

  const subsidyKw = Math.min(systemKw, 3);
  const subsidy =
    subsidyKw <= 1
      ? SUBSIDY_RATES[1]
      : subsidyKw <= 2
        ? SUBSIDY_RATES[2]
        : MAX_SUBSIDY;

  const estimatedSystemCost =
    Math.round((systemKw * DCR_SYSTEM_COST_PER_KW) / 500) * 500;
  const postSubsidyCost = Math.max(0, estimatedSystemCost - subsidy);

  return {
    systemKw,
    unitsPerMonth,
    monthlySavings,
    annualSavings,
    subsidy,
    estimatedSystemCost,
    postSubsidyCost,
  };
}
