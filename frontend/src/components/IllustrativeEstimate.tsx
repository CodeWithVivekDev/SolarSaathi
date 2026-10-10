import React, { useState } from 'react';
import { ArrowUpRight, AlertCircle, BarChart3 } from 'lucide-react';

interface IllustrativeEstimateProps {
  onOpenEstimator: () => void;
}

interface Scenario {
  name: string;
  location: string;
  propertyType: string;
  usableAreaSqFt: number;
  monthlyBillInr: number;
  retailTariffInr: number;
  suggestedCapacityKw: number;
  annualGenerationKwh: number;
  annualSavingsInr: number;
  grossCapexInr: number;
  subsidyCfaInr: number;
  netCapexInr: number;
  avoidedCo2Tonnes: number;
  monthlyGeneration: number[];
}

export const IllustrativeEstimate: React.FC<IllustrativeEstimateProps> = ({ onOpenEstimator }) => {
  const scenarios: Scenario[] = [
    {
      name: 'Delhi NCR Independent Villa',
      location: 'Delhi (BRPL/BYPL)',
      propertyType: 'Residential',
      usableAreaSqFt: 500,
      monthlyBillInr: 4500,
      retailTariffInr: 7.20,
      suggestedCapacityKw: 3.5,
      annualGenerationKwh: 5120,
      annualSavingsInr: 38400,
      grossCapexInr: 195000,
      subsidyCfaInr: 78000,
      netCapexInr: 117000,
      avoidedCo2Tonnes: 3.67,
      // Monthly distribution (Jan - Dec) showing Indian weather patterns
      monthlyGeneration: [340, 390, 480, 520, 540, 440, 360, 350, 430, 470, 410, 380]
    },
    {
      name: 'Bengaluru Urban Rowhouse',
      location: 'Bengaluru (BESCOM)',
      propertyType: 'Residential',
      usableAreaSqFt: 300,
      monthlyBillInr: 2800,
      retailTariffInr: 6.80,
      suggestedCapacityKw: 2.0,
      annualGenerationKwh: 3050,
      annualSavingsInr: 21800,
      grossCapexInr: 120000,
      subsidyCfaInr: 60000,
      netCapexInr: 60000,
      avoidedCo2Tonnes: 2.18,
      monthlyGeneration: [270, 290, 320, 280, 240, 190, 180, 190, 230, 270, 280, 290]
    },
    {
      name: 'Ahmedabad Light Commercial MSME',
      location: 'Ahmedabad (Torrent / UGVCL)',
      propertyType: 'Commercial Daytime',
      usableAreaSqFt: 1000,
      monthlyBillInr: 14000,
      retailTariffInr: 8.50,
      suggestedCapacityKw: 8.0,
      annualGenerationKwh: 12400,
      annualSavingsInr: 96800,
      grossCapexInr: 410000,
      subsidyCfaInr: 0, // Commercial does not receive PM Surya Ghar residential subsidy
      netCapexInr: 410000,
      avoidedCo2Tonnes: 8.88,
      monthlyGeneration: [920, 1010, 1220, 1310, 1350, 1080, 780, 750, 990, 1150, 980, 860]
    }
  ];

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const current = scenarios[activeScenarioIndex];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxGen = Math.max(...current.monthlyGeneration);

  return (
    <section id="sample-estimate" className="py-16 md:py-24 border-t border-gray-100" aria-labelledby="sample-title">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
          Illustrative Benchmark Model
        </div>
        <h2 id="sample-title" className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
          Sample Rooftop Solar Feasibility Assessment
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3">
          Explore how SolarSaathi structures transparent estimates across typical Indian property configurations.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8" role="tablist" aria-label="Sample Scenarios">
        {scenarios.map((scenario, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeScenarioIndex === index}
            onClick={() => setActiveScenarioIndex(index)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
              activeScenarioIndex === index
                ? 'bg-brand-dark text-white shadow-sm'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {scenario.name}
          </button>
        ))}
      </div>

      {/* Main Assessment Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-elevated p-6 sm:p-9">
        
        {/* Notice Banner */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs mb-8">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Illustrative Scenario Disclosure:</strong> The metrics below demonstrate model outputs using European Commission PVGIS 5.2 radiation figures and CEA emission factors for the stated location assumptions. Actual generation depends on physical roof slope, orientation, shading, and local DISCOM net-metering approvals.
          </div>
        </div>

        {/* Inputs Overview vs Calculated Outputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sizing & Economic Breakdown */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Evaluated Baseline Inputs
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[11px] text-gray-500">Usable Roof Area</div>
                  <div className="font-display font-bold text-base text-gray-900 mt-0.5">
                    {current.usableAreaSqFt} sq ft
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[11px] text-gray-500">Avg. Monthly Bill</div>
                  <div className="font-display font-bold text-base text-gray-900 mt-0.5">
                    ₹{current.monthlyBillInr.toLocaleString('en-IN')}/mo
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-[11px] text-gray-500">DISCOM Location</div>
                  <div className="font-display font-bold text-sm text-gray-900 mt-0.5 truncate" title={current.location}>
                    {current.location}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Recommended System &amp; Generation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-surface-sage border border-brand-green-border">
                  <div className="text-xs font-semibold text-brand-green">Suggested Capacity</div>
                  <div className="font-display font-black text-2xl text-gray-900 mt-1">
                    {current.suggestedCapacityKw} kWp
                  </div>
                  <div className="text-[11px] text-gray-600 mt-1">Capped by load &amp; area</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-600">Est. Annual Yield</div>
                  <div className="font-display font-black text-2xl text-gray-900 mt-1">
                    {current.annualGenerationKwh.toLocaleString('en-IN')}
                    <span className="text-sm font-semibold text-gray-500 ml-1">kWh</span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">PVGIS 14% loss factor</div>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-600">Est. Annual Savings</div>
                  <div className="font-display font-black text-2xl text-brand-green mt-1">
                    ₹{current.annualSavingsInr.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">Split retail &amp; export</div>
                </div>
              </div>
            </div>

            {/* Financial Summary & Subsidies */}
            <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Indicative Financial Capital Outlay
                </span>
                <span className="text-[11px] font-semibold text-gray-500">
                  MNRE Benchmark Bracket
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[11px] text-gray-500">Estimated Gross Capex</div>
                  <div className="font-display font-bold text-sm text-gray-900 mt-0.5">
                    ₹{current.grossCapexInr.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-brand-green font-semibold">PM Surya Ghar Subsidy</div>
                  <div className="font-display font-bold text-sm text-brand-green mt-0.5">
                    {current.subsidyCfaInr > 0 ? `- ₹${current.subsidyCfaInr.toLocaleString('en-IN')}` : 'Not Applicable'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-900 font-bold">Estimated Net Outlay</div>
                  <div className="font-display font-black text-base text-gray-900 mt-0.5">
                    ₹{current.netCapexInr.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>Avoided Grid Emissions: <strong className="text-gray-900">{current.avoidedCo2Tonnes} Tonnes CO₂/yr</strong> (CEA Baseline)</span>
                <span>Simple Payback: <strong className="text-brand-green">~{(current.netCapexInr / current.annualSavingsInr).toFixed(1)} Years</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Monthly Solar Generation Curve (Bar Visualizer) */}
          <div className="lg:col-span-5 bg-gray-50/70 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-brand-green" />
                  <span className="font-display font-bold text-sm text-gray-900">
                    Monthly Solar Generation (kWh)
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">Seasonal Curve</span>
              </div>

              {/* Bar Chart Representation */}
              <div className="h-44 flex items-end justify-between gap-1.5 pt-6 pb-2 px-1">
                {current.monthlyGeneration.map((val, i) => {
                  const heightPercent = Math.round((val / maxGen) * 100);
                  const isMonsoon = i === 6 || i === 7; // Jul, Aug
                  const isPeak = i === 3 || i === 4;   // Apr, May

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity whitespace-nowrap z-20">
                        {val} kWh
                      </div>
                      <div className="w-full flex items-end justify-center h-32">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[18px] rounded-t transition-all duration-300 ${
                            isPeak
                              ? 'bg-amber-500 group-hover:bg-amber-600'
                              : isMonsoon
                              ? 'bg-blue-300 group-hover:bg-blue-400'
                              : 'bg-brand-green group-hover:bg-brand-green-hover'
                          }`}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {months[i]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-brand-green"></span> Standard Yield
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Summer Peak
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-blue-300"></span> Monsoon Dip
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={onOpenEstimator}
                className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3 px-4 rounded-xl font-semibold text-sm shadow hover:bg-brand-green-hover transition-colors"
              >
                <span>Calculate For Your Exact Rooftop</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
