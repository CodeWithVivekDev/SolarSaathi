import React from 'react';
import { MapPin, Maximize2, Sun, FileSpreadsheet, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenEstimator: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEstimator }) => {
  const steps = [
    {
      num: '01',
      title: 'Geographic Location & DISCOM',
      desc: 'Enter your city or PIN code. SolarSaathi references local coordinates to query historical solar irradiance curves from the European Commission PVGIS satellite models.',
      icon: <MapPin className="w-6 h-6 text-brand-green" />,
      detail: 'Accounts for regional sun hours across northern, western, southern and eastern India.'
    },
    {
      num: '02',
      title: 'Shadow-Free Roof Geometry',
      desc: 'Specify your usable rooftop area. We filter out overhead tanks, parapet shading, and stairwell headrooms to calculate your true physical module capacity.',
      icon: <Maximize2 className="w-6 h-6 text-brand-green" />,
      detail: 'Benchmark: ~100 sq ft per 1 kWp of high-efficiency monocrystalline panels.'
    },
    {
      num: '03',
      title: 'Demand-Balanced Sizing',
      desc: 'Input your monthly bill or kWh consumption. Our engine balances physical space against electricity needs to prevent over-sizing and ensure optimal return on investment.',
      icon: <Sun className="w-6 h-6 text-brand-green" />,
      detail: 'Avoids contractor over-sizing by capping capacity to economic self-consumption.'
    },
    {
      num: '04',
      title: 'Explainable Feasibility Report',
      desc: 'Receive transparent monthly generation estimates, net-metering savings, PM Surya Ghar subsidy brackets, and potential grid emissions avoided.',
      icon: <FileSpreadsheet className="w-6 h-6 text-brand-green" />,
      detail: 'All calculations are pure, documented formulas that you can download or print.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-t border-gray-100" aria-labelledby="hiw-title">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sage border border-brand-green-border text-brand-green text-xs font-semibold uppercase tracking-wider mb-3">
          Explainable Process
        </div>
        <h2 id="hiw-title" className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
          How SolarSaathi Evaluates Your Rooftop
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3">
          No automated sales calls, no vendor bias. Just physics, verified satellite irradiance, and transparent math.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-green-border shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-display font-black text-2xl text-gray-200 group-hover:text-brand-green transition-colors">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-surface-sage flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {step.desc}
              </p>
            </div>
            
            <div className="pt-3 border-t border-gray-50 text-[11px] font-medium text-gray-400">
              {step.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onOpenEstimator}
          className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-hover font-semibold text-sm group"
        >
          <span>Ready to estimate your rooftop? Launch guided calculator</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
