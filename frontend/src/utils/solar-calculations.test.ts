import { describe, it, expect } from 'vitest';
import {
  calculateRoofCapacity,
  calculateDemandCapacity,
  calculateSuggestedCapacity,
  calculatePmSuryaGharSubsidy,
  calculateFinancialSavings,
  calculateAvoidedEmissions,
  CONSTANTS,
} from './solar-calculations';

describe('SolarSaathi Numerical Calculation Engine', () => {
  describe('Roof-Area Capacity Sizing (calculateRoofCapacity)', () => {
    it('calculates physical capacity for standard 100 sq ft/kWp benchmark', () => {
      expect(calculateRoofCapacity(500)).toBe(5.0);
      expect(calculateRoofCapacity(300)).toBe(3.0);
      expect(calculateRoofCapacity(1000)).toBe(10.0);
    });

    it('respects custom sq ft per kWp allowances', () => {
      expect(calculateRoofCapacity(300, 120)).toBe(2.5);
    });

    it('returns zero for non-positive areas', () => {
      expect(calculateRoofCapacity(0)).toBe(0);
      expect(calculateRoofCapacity(-150)).toBe(0);
    });
  });

  describe('Demand-Based Sizing (calculateDemandCapacity)', () => {
    it('calculates capacity matching household electricity consumption', () => {
      // ₹4,500 bill at ₹7.20/kWh = 625 units/month = 7,500 units/year
      // 7,500 / 1480 specific yield = 5.07 kWp
      const demand = calculateDemandCapacity(4500, 7.20, 1480);
      expect(demand).toBe(5.07);
    });

    it('returns zero for invalid inputs', () => {
      expect(calculateDemandCapacity(0, 7.0)).toBe(0);
      expect(calculateDemandCapacity(4500, 0)).toBe(0);
    });
  });

  describe('Balanced System Capacity (calculateSuggestedCapacity)', () => {
    it('flags space-constrained scenarios when roof is smaller than demand', () => {
      // Roof allows 3 kWp, demand needs 5.5 kWp -> must cap to 3 kWp
      const result = calculateSuggestedCapacity(3.0, 5.5);
      expect(result.suggestedCapacityKw).toBe(3.0);
      expect(result.isRoofConstrained).toBe(true);
    });

    it('prevents over-sizing when roof is much larger than household demand', () => {
      // Roof allows 12 kWp, demand needs 3.2 kWp -> recommend 3.0 or 3.5 kWp
      const result = calculateSuggestedCapacity(12.0, 3.2);
      expect(result.suggestedCapacityKw).toBe(3.0);
      expect(result.isRoofConstrained).toBe(false);
    });

    it('rounds to 0.5 kW intervals with a minimum of 1.0 kWp', () => {
      const result = calculateSuggestedCapacity(0.6, 0.7);
      expect(result.suggestedCapacityKw).toBe(1.0);
    });
  });

  describe('PM Surya Ghar Subsidy Logic (calculatePmSuryaGharSubsidy)', () => {
    it('awards ₹30,000 for 1 kWp systems', () => {
      expect(calculatePmSuryaGharSubsidy(1.0)).toBe(30000);
      expect(calculatePmSuryaGharSubsidy(1.5)).toBe(30000);
    });

    it('awards ₹60,000 for 2 kWp systems', () => {
      expect(calculatePmSuryaGharSubsidy(2.0)).toBe(60000);
      expect(calculatePmSuryaGharSubsidy(2.5)).toBe(60000);
    });

    it('caps subsidy at ₹78,000 for 3 kWp and larger systems', () => {
      expect(calculatePmSuryaGharSubsidy(3.0)).toBe(78000);
      expect(calculatePmSuryaGharSubsidy(5.0)).toBe(78000);
      expect(calculatePmSuryaGharSubsidy(10.0)).toBe(78000);
    });

    it('awards zero subsidy for sub-1kW systems', () => {
      expect(calculatePmSuryaGharSubsidy(0.8)).toBe(0);
    });
  });

  describe('Financial Savings & Payback (calculateFinancialSavings)', () => {
    it('separates self-consumed units from exported units realistically', () => {
      // 3 kWp system with 1480 yield = 4,440 kWh/year
      // 65% self-consumed = 2,886 kWh @ ₹7.00 = ₹20,202
      // 35% exported = 1,554 kWh @ ₹2.75 = ₹4,274
      // Total annual savings ≈ ₹24,476
      const result = calculateFinancialSavings(3.0, 1480, 7.0, 0.65, 2.75);

      expect(result.annualGenerationKwh).toBe(4440);
      expect(result.selfConsumedKwh).toBe(2886);
      expect(result.exportedKwh).toBe(1554);
      expect(result.annualSavingsInr).toBe(24476);
      expect(result.grossCapexInr).toBe(165000);
      expect(result.subsidyCfaInr).toBe(78000);
      expect(result.netCapexInr).toBe(87000);
      // Payback = 87000 / 24476 ≈ 3.6 years
      expect(result.simplePaybackYears).toBe(3.6);
    });
  });

  describe('Avoided Grid Emissions (calculateAvoidedEmissions)', () => {
    it('calculates avoided CO2 based on CEA 0.716 kg/kWh emission factor', () => {
      // 5,000 kWh * 0.716 = 3,580 kg = 3.58 tonnes
      const result = calculateAvoidedEmissions(5000, CONSTANTS.CEA_GRID_EMISSION_FACTOR);
      expect(result.co2Kg).toBe(3580);
      expect(result.co2Tonnes).toBe(3.58);
      expect(result.treeEquivalents).toBe(164); // 3580 / 21.77
    });
  });
});
