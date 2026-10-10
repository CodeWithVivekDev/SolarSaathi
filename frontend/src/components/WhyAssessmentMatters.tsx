import React from 'react';
import { AlertTriangle, TrendingDown, Scale, Compass } from 'lucide-react';

export const WhyAssessmentMatters: React.FC = () => {
  const insights = [
    {
      icon: <TrendingDown className="w-6 h-6 text-amber-600" />,
      title: 'The Over-Sizing Trap',
      desc: 'Commercial installers typically profit on raw wattage sold, often recommending 5 kWp or 7 kWp systems to customers who only need 3 kWp. Because DISCOMs credit exported solar power at nominal feed-in tariffs (₹2.25–₹3.50/kWh) compared to retail charges (₹7–₹9/kWh), oversized systems suffer poor return on investment.',
      badge: 'Economic Trap'
    },
    {
      icon: <Scale className="w-6 h-6 text-brand-green" />,
      title: 'DISCOM Sanctioned Load Constraints',
      desc: 'Most Indian state distribution companies (such as MSEDCL, BESCOM, UPPCL, and BSES) legally restrict rooftop solar capacity to 80%–100% of your property’s sanctioned electrical load. Sizing without verifying sanctioned load leads to rejected net-metering applications and unexpected load enhancement penalties.',
      badge: 'Regulatory Risk'
    },
    {
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      title: 'Usable Space vs. Total Roof Area',
      desc: 'A 1,000 sq ft terrace rarely provides 1,000 sq ft of solar potential. Parapet wall shadows, overhead water tanks, mumty/stairwell headroom, and mandatory cleaning walkways reduce usable area by 25% to 40%. Sizing against gross area results in unfeasible installation plans.',
      badge: 'Physical Geometry'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-purple-600" />,
      title: 'PM Surya Ghar Subsidy Thresholds',
      desc: 'The central government’s PM Surya Ghar Muft Bijli Yojana provides generous financial assistance up to 3 kWp (₹30,000 for 1 kWp, ₹60,000 for 2 kWp, ₹78,000 for ≥3 kWp). Above 3 kWp, zero additional subsidy is granted, making a 3 kWp system significantly more cost-effective per unit than 4 kWp.',
      badge: 'Incentive Structure'
    }
  ];

  return (
    <section id="why-it-matters" className="py-16 md:py-24 border-t border-gray-100" aria-labelledby="why-title">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sage border border-brand-green-border text-brand-green text-xs font-semibold uppercase tracking-wider mb-3">
          Market Realities in India
        </div>
        <h2 id="why-title" className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
          Why You Need an Independent Assessment Before Contacting Installers
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3">
          Solar is a 25-year capital investment. Understanding your true numbers upfront prevents costly mistakes and contractor misguidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item, index) => (
          <div
            key={index}
            className="p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
