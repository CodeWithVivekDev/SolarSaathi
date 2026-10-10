import React, { useState, useEffect } from 'react';
import { X, Calculator, CheckCircle, Info, ShieldCheck, Download } from 'lucide-react';
import {
  calculateRoofCapacity,
  calculateDemandCapacity,
  calculateSuggestedCapacity,
  calculateFinancialSavings,
  calculateAvoidedEmissions,
} from '../utils/solar-calculations';

interface EstimatorQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EstimatorQuickModal: React.FC<EstimatorQuickModalProps> = ({ isOpen, onClose }) => {
  // Input states
  const [city, setCity] = useState('Delhi');
  const [monthlyBill, setMonthlyBill] = useState(4500);
  const [usableRoofArea, setUsableRoofArea] = useState(500);
  const [orientation, setOrientation] = useState('South');

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // City solar radiation multipliers (kWh/kWp/year benchmark based on PVGIS)
  const cityYields: Record<string, { yield: number; tariff: number }> = {
    Delhi: { yield: 1480, tariff: 7.20 },
    Bengaluru: { yield: 1520, tariff: 6.80 },
    Mumbai: { yield: 1500, tariff: 8.50 },
    Ahmedabad: { yield: 1600, tariff: 7.00 },
    Jaipur: { yield: 1620, tariff: 7.50 },
    Chennai: { yield: 1550, tariff: 6.50 },
    Hyderabad: { yield: 1560, tariff: 7.40 },
    Kolkata: { yield: 1420, tariff: 7.80 },
    Pune: { yield: 1540, tariff: 7.90 },
    Lucknow: { yield: 1460, tariff: 7.00 },
  };

  const currentCityConfig = cityYields[city] || { yield: 1500, tariff: 7.00 };

  // Pure methodology calculations
  const roofKwLimit = calculateRoofCapacity(usableRoofArea);
  const demandKwLimit = calculateDemandCapacity(monthlyBill, currentCityConfig.tariff, currentCityConfig.yield);
  const { suggestedCapacityKw: suggestedKw, isRoofConstrained } = calculateSuggestedCapacity(roofKwLimit, demandKwLimit);

  const financial = calculateFinancialSavings(
    suggestedKw,
    currentCityConfig.yield,
    currentCityConfig.tariff,
    0.65
  );

  const annualGenerationKwh = financial.annualGenerationKwh;
  const annualSavingsInr = financial.annualSavingsInr;
  const subsidyInr = financial.subsidyCfaInr;
  const grossCapexInr = financial.grossCapexInr;
  const netCapexInr = financial.netCapexInr;

  const emissions = calculateAvoidedEmissions(annualGenerationKwh);
  const avoidedCo2Tonnes = emissions.co2Tonnes;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-estimator-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-surface-sage flex items-center justify-center text-brand-green">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-estimator-title" className="font-display font-extrabold text-xl text-gray-900">
                Preliminary Solar Sizing Estimator
              </h2>
              <p className="text-xs text-gray-500">
                Instant explainable calculation based on PVGIS and MNRE benchmarks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Input Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Location (Solar Region)
              </label>
              <select
                id="city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
              >
                {Object.keys(cityYields).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="orientation-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Roof Orientation
              </label>
              <select
                id="orientation-select"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
              >
                <option value="South">True South (Optimal: 100% yield)</option>
                <option value="Flat">Flat Terrace (Standard mounting)</option>
                <option value="EastWest">East / West Sloped (-12% yield)</option>
              </select>
            </div>
          </div>

          {/* Monthly Bill Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
              <label htmlFor="modal-bill-slider">Average Monthly Electricity Bill</label>
              <span className="text-sm font-extrabold text-brand-green px-2.5 py-0.5 rounded-full bg-brand-green-light">
                ₹{monthlyBill.toLocaleString('en-IN')}/mo
              </span>
            </div>
            <input
              id="modal-bill-slider"
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full accent-brand-green cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>₹1,000/mo</span>
              <span>₹10,000/mo</span>
              <span>₹20,000/mo</span>
            </div>
          </div>

          {/* Usable Roof Area Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
              <label htmlFor="modal-roof-slider">Usable Shadow-Free Roof Area</label>
              <span className="text-sm font-extrabold text-brand-green px-2.5 py-0.5 rounded-full bg-brand-green-light">
                {usableRoofArea.toLocaleString('en-IN')} sq ft
              </span>
            </div>
            <input
              id="modal-roof-slider"
              type="range"
              min="100"
              max="2000"
              step="50"
              value={usableRoofArea}
              onChange={(e) => setUsableRoofArea(Number(e.target.value))}
              className="w-full accent-brand-green cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>100 sq ft</span>
              <span>1,000 sq ft</span>
              <span>2,000 sq ft</span>
            </div>
          </div>

          {/* Sizing Constraint Warning */}
          {isRoofConstrained ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Space Constrained:</strong> Your electricity consumption would benefit from a {demandKwLimit.toFixed(1)} kWp system, but your {usableRoofArea} sq ft roof safely accommodates <strong>{suggestedKw} kWp</strong>.
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-brand-green-light/60 border border-brand-green-border text-brand-green text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Optimally Sized to Demand:</strong> Sized at {suggestedKw} kWp to offset ~90% of your bill without generating excess low-value export units.
              </span>
            </div>
          )}

          {/* Calculated Output Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-surface-sage border border-brand-green-border">
              <div className="text-[11px] text-brand-green font-semibold">Recommended</div>
              <div className="font-display font-extrabold text-xl text-gray-900 mt-0.5">
                {suggestedKw} kWp
              </div>
              <div className="text-[10px] text-gray-500">System Capacity</div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] text-gray-500 font-semibold">Annual Yield</div>
              <div className="font-display font-extrabold text-xl text-gray-900 mt-0.5">
                {annualGenerationKwh.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-gray-500">kWh units/year</div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] text-gray-500 font-semibold">Annual Savings</div>
              <div className="font-display font-extrabold text-xl text-brand-green mt-0.5">
                ₹{annualSavingsInr.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-gray-500">Bill reduction</div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-[11px] text-gray-500 font-semibold">Avoided CO₂</div>
              <div className="font-display font-extrabold text-xl text-gray-900 mt-0.5">
                {avoidedCo2Tonnes} T
              </div>
              <div className="text-[10px] text-gray-500">CEA Factor</div>
            </div>
          </div>

          {/* Subsidies & Capex Summary */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-700">Financial Benchmark (PM Surya Ghar):</span>
              <span className="text-[11px] text-brand-green font-semibold">
                Subsidy: - ₹{subsidyInr.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>Est. Gross System Cost: ₹{grossCapexInr.toLocaleString('en-IN')}</span>
              <span className="font-bold text-gray-900">
                Net Outlay: ₹{netCapexInr.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="mt-2 text-[10px] text-gray-400">
              *Calculated using MNRE benchmark rates. Exact installer quotations and structural costs may vary.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>No contact info required. Pure mathematical output.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Summary</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-brand-dark text-white text-xs font-semibold hover:bg-brand-dark-hover transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
