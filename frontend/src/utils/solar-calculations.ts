/**
 * SolarSaathi Pure Calculation Engine
 * Pure, deterministic functions implementing the formulas in docs/methodology.md
 */

export interface SizingInputs {
  usableAreaSqFt: number;
  monthlyBillInr: number;
  retailTariffInr: number;
  specificYieldKwhPerKwp?: number;
  sqFtPerKw?: number;
}

export interface SizingResult {
  roofKwLimit: number;
  demandKwLimit: number;
  suggestedCapacityKw: number;
  isRoofConstrained: boolean;
}

export interface FinancialResult {
  annualGenerationKwh: number;
  selfConsumedKwh: number;
  exportedKwh: number;
  annualSavingsInr: number;
  grossCapexInr: number;
  subsidyCfaInr: number;
  netCapexInr: number;
  simplePaybackYears: number | null;
}

/**
 * Benchmark constants
 */
export const CONSTANTS = {
  DEFAULT_SQ_FT_PER_KW: 100, // Modern mono-PERC panels + maintenance walkways
  DEFAULT_SPECIFIC_YIELD: 1480, // National average kWh/kWp/year from PVGIS
  DEFAULT_EXPORT_RATE: 2.75, // Average Pooled Power Purchase Cost (APPC) for DISCOMs
  CEA_GRID_EMISSION_FACTOR: 0.716, // CEA Baseline Database Version 19.0 (kg CO2 / kWh)
  BENCHMARK_CAPEX_PER_KW: 55000, // Average MNRE benchmark turnkey capex in INR
};

/**
 * Calculates physical roof capacity based on usable shadow-free area.
 */
export function calculateRoofCapacity(
  usableAreaSqFt: number,
  sqFtPerKw: number = CONSTANTS.DEFAULT_SQ_FT_PER_KW
): number {
  if (usableAreaSqFt <= 0 || sqFtPerKw <= 0) return 0;
  return Number((usableAreaSqFt / sqFtPerKw).toFixed(2));
}

/**
 * Calculates economic system capacity needed to meet annual electrical demand.
 */
export function calculateDemandCapacity(
  monthlyBillInr: number,
  retailTariffInr: number,
  specificYield: number = CONSTANTS.DEFAULT_SPECIFIC_YIELD
): number {
  if (monthlyBillInr <= 0 || retailTariffInr <= 0 || specificYield <= 0) return 0;
  const annualUnitsNeeded = (monthlyBillInr / retailTariffInr) * 12;
  return Number((annualUnitsNeeded / specificYield).toFixed(2));
}

/**
 * Sizes the system to the minimum of physical roof limit and economic demand limit,
 * rounded to standard 0.5 kW inverter intervals.
 */
export function calculateSuggestedCapacity(
  roofKw: number,
  demandKw: number
): { suggestedCapacityKw: number; isRoofConstrained: boolean } {
  if (roofKw <= 0 && demandKw <= 0) {
    return { suggestedCapacityKw: 0, isRoofConstrained: false };
  }
  const isRoofConstrained = roofKw < demandKw;
  const rawKw = Math.min(roofKw, demandKw);
  // Round to nearest 0.5 kW, minimum 1.0 kW
  const suggestedCapacityKw = Math.max(1.0, Math.round(rawKw * 2) / 2);
  return { suggestedCapacityKw, isRoofConstrained };
}

/**
 * Calculates PM Surya Ghar: Muft Bijli Yojana Central Financial Assistance (CFA) subsidy.
 * - 1 kWp: ₹30,000
 * - 2 kWp: ₹60,000
 * - >= 3 kWp: ₹78,000
 */
export function calculatePmSuryaGharSubsidy(capacityKw: number): number {
  if (capacityKw < 1.0) return 0;
  if (capacityKw >= 3.0) return 78000;
  if (capacityKw >= 2.0) return 60000;
  return 30000;
}

/**
 * Calculates annual savings splitting self-consumption and exported grid credits.
 */
export function calculateFinancialSavings(
  capacityKw: number,
  specificYield: number = CONSTANTS.DEFAULT_SPECIFIC_YIELD,
  retailTariffInr: number = 7.0,
  selfConsumptionRatio: number = 0.65,
  exportRateInr: number = CONSTANTS.DEFAULT_EXPORT_RATE
): FinancialResult {
  const annualGenerationKwh = Math.round(capacityKw * specificYield);
  const selfConsumedKwh = Math.round(annualGenerationKwh * selfConsumptionRatio);
  const exportedKwh = annualGenerationKwh - selfConsumedKwh;

  const annualSavingsInr = Math.round(
    selfConsumedKwh * retailTariffInr + exportedKwh * exportRateInr
  );

  const grossCapexInr = Math.round(capacityKw * CONSTANTS.BENCHMARK_CAPEX_PER_KW);
  const subsidyCfaInr = calculatePmSuryaGharSubsidy(capacityKw);
  const netCapexInr = Math.max(0, grossCapexInr - subsidyCfaInr);

  const simplePaybackYears =
    annualSavingsInr > 0 ? Number((netCapexInr / annualSavingsInr).toFixed(1)) : null;

  return {
    annualGenerationKwh,
    selfConsumedKwh,
    exportedKwh,
    annualSavingsInr,
    grossCapexInr,
    subsidyCfaInr,
    netCapexInr,
    simplePaybackYears,
  };
}

/**
 * Calculates potential avoided grid CO2 emissions using official CEA emission factor.
 */
export function calculateAvoidedEmissions(
  annualKwh: number,
  emissionFactorKgPerKwh: number = CONSTANTS.CEA_GRID_EMISSION_FACTOR
): { co2Kg: number; co2Tonnes: number; treeEquivalents: number } {
  const co2Kg = Math.round(annualKwh * emissionFactorKgPerKwh);
  const co2Tonnes = Number((co2Kg / 1000).toFixed(2));
  // 1 mature tree absorbs ~21.77 kg CO2 / year
  const treeEquivalents = Math.round(co2Kg / 21.77);
  return { co2Kg, co2Tonnes, treeEquivalents };
}
