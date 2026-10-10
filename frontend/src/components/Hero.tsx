import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, Zap, ShieldCheck, Database, Award, Info } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator }) => {
  // Interactive Stat Card toggle
  const [metricIndex, setMetricIndex] = useState(0);

  const illustrativeMetrics = [
    {
      label: 'Energy Generated',
      value: '1.4 MW',
      unit: 'Annual Model',
      trend: '+18% peak summer yield',
      detail: 'Derived from European Commission PVGIS 5.2 radiation database for central India coordinates.',
      icon: <Zap className="w-5 h-5 text-brand-green" />
    },
    {
      label: 'Estimated Bill Offset',
      value: '₹39,500',
      unit: 'per year',
      trend: '65% daytime self-consumed',
      detail: 'Based on average DISCOM tariff ₹7.00/kWh and ₹2.75/kWh net-billing export rate.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-green" />
    },
    {
      label: 'Potential Avoided CO₂',
      value: '3.6 Tons',
      unit: 'per year',
      trend: '≈ 165 mature trees equivalent',
      detail: 'Calculated using official CEA CO₂ baseline emission factor (0.716 kg CO₂/kWh).',
      icon: <Award className="w-5 h-5 text-brand-green" />
    }
  ];

  const currentMetric = illustrativeMetrics[metricIndex];

  const handleNextMetric = () => {
    setMetricIndex((prev) => (prev + 1) % illustrativeMetrics.length);
  };

  return (
    <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16" aria-labelledby="hero-heading" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Headline, Narrative, CTAs, Verifiable Principles */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Status Badge: Genuine, non-fabricated status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-sage border border-brand-green-border text-brand-green text-xs font-semibold tracking-tight mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-slow" aria-hidden="true"></span>
            <span>Preliminary Rooftop Solar Estimator for India</span>
          </div>

          {/* Headline matching directive: "Know Your Roof. Own Your Energy Future." */}
          <h1 
            id="hero-heading" 
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight text-gray-900 mb-5"
          >
            Know Your Roof.{' '}
            <span className="block text-brand-green mt-1">
              Own Your Energy Future.
            </span>
          </h1>

          {/* Subtitle with transparent, objective positioning */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
            Objective, physics-based solar sizing and transparent bill savings for Indian homes and small businesses — calculated with European Commission PVGIS irradiance data and CEA grid emissions factors.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center justify-center gap-2.5 bg-brand-dark text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-pill hover:bg-brand-dark-hover hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green w-full sm:w-auto"
              aria-label="Check My Roof - Launch Sizing Estimator"
            >
              <span>Check My Roof</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 text-gray-800 hover:text-brand-green font-semibold text-sm px-4 py-3 rounded-full hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
            >
              <span>Explore Methodology</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          {/* Verifiable Engineering Baseline Pillars (replaces fake star ratings/logos) */}
          <div className="pt-6 border-t border-gray-100 w-full">
            <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
              Independent Analytical Foundation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <Database className="w-4 h-4 text-brand-green shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight">PVGIS 5.2</div>
                  <div className="text-[11px] text-gray-500">EC Solar Radiation</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight">CEA CO₂ Baseline</div>
                  <div className="text-[11px] text-gray-500">0.716 kg/kWh factor</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <Award className="w-4 h-4 text-brand-green shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight">MNRE Benchmark</div>
                  <div className="text-[11px] text-gray-500">PM Surya Ghar Ready</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Solar Eco-Villa Showcase & Floating Stat Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
          <div className="relative w-full max-w-[500px]">
            
            {/* 3D Solar Villa Diorama with subtle float */}
            <div className="relative overflow-hidden rounded-2xl group">
              <img
                src="/assets/hero-diorama.jpg"
                alt="3D isometric rendering of a modern eco villa with rooftop solar panels, manicured green landscape, and wind turbines on a circular pedestal"
                className="w-full h-auto object-contain drop-shadow-xl animate-float transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
                width="600"
                height="450"
              />
            </div>

            {/* Floating Glassmorphic Stat Card (matching design reference) */}
            <aside 
              onClick={handleNextMetric}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNextMetric(); } }}
              tabIndex={0}
              role="button"
              aria-label={`Illustrative solar metric: ${currentMetric.label}. Click to cycle metrics.`}
              className="absolute top-4 sm:top-8 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-elevated border border-gray-100 max-w-[260px] cursor-pointer hover:border-brand-green-border hover:shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              {/* Card Header with Lightning Badge */}
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand-green-light flex items-center justify-center shrink-0">
                  {currentMetric.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      {currentMetric.label}
                    </span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green" title="Interactive metric toggle"></span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-display font-extrabold text-2xl text-gray-900 leading-none">
                      {currentMetric.value}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500">
                      {currentMetric.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trend Tag */}
              <div className="flex items-center gap-1 text-xs font-semibold text-brand-green mb-2">
                <span>↗</span>
                <span>{currentMetric.trend}</span>
              </div>

              {/* Explicit Label: Illustrative Demonstration Disclaimer */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-gray-400" />
                  Illustrative Scenario
                </span>
                <span className="text-brand-green font-semibold underline">Click to switch</span>
              </div>
            </aside>

          </div>
        </div>

      </div>
    </section>
  );
};
