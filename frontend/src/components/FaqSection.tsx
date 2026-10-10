import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does SolarSaathi sell solar panels or provide installation quotations?',
      a: 'No. SolarSaathi is strictly an independent, educational sizing and feasibility platform. We do not sell hardware, take installer referral commissions, or pass your private details to marketing agencies. Our sole purpose is to equip property owners with unbiased numbers before they engage commercial contractors.'
    },
    {
      q: 'How does the central PM Surya Ghar: Muft Bijli Yojana subsidy apply in 2026?',
      a: 'The central government provides a Direct Benefit Transfer (DBT) subsidy for residential rooftop solar: ₹30,000 for a 1 kWp system, ₹60,000 for a 2 kWp system, and a maximum of ₹78,000 for systems 3 kWp and above. Systems above 3 kWp do not receive additional central subsidy. To qualify, systems must use Made-in-India (DCR-compliant) solar modules and be installed by an empaneled vendor through the national portal.'
    },
    {
      q: 'What is the crucial difference between Net Metering and Net Billing / Gross Metering?',
      a: 'Under Net Metering, every kilowatt-hour of solar energy generated offsets one kilowatt-hour of grid electricity at your full retail tariff (e.g. ₹7–₹9/kWh). Under Net Billing or Gross Metering, excess solar energy fed into the grid is credited only at the DISCOM’s Average Pooled Power Purchase Cost (APPC, typically ₹2.50–₹3.50/kWh). This is why sizing your system to daytime self-consumption is vital.'
    },
    {
      q: 'Can rooftop solar power air conditioners, pumps, and refrigerators?',
      a: 'Yes. In a grid-tied rooftop solar system (the most common and economical configuration), the solar inverter synchronizes with the grid. Solar electricity supplies your appliances first; if a heavy load like a 1.5-ton AC exceeds instantaneous solar output, the grid seamlessly supplies the remaining balance without flickering or interruptions.'
    },
    {
      q: 'How much shadow-free rooftop space is required per kilowatt?',
      a: 'Using modern high-efficiency monocrystalline PERC solar panels (540W–580W ratings), approximately 90 to 110 square feet of shadow-free rooftop area is required per 1 kWp. A typical 3 kWp household system requires roughly 270 to 330 square feet of clear, unshaded terrace space.'
    },
    {
      q: 'What happens to electricity generation during monsoons and cloudy winter days?',
      a: 'Solar modules still produce electricity from diffuse daylight during overcast and rainy periods, but output typically declines by 40% to 65% compared to clear summer days. SolarSaathi’s PVGIS model automatically incorporates 10+ years of satellite meteorological data to reflect these seasonal dips in your annual generation estimate.'
    }
  ];

  return (
    <section id="faqs" className="py-16 md:py-24 border-t border-gray-100" aria-labelledby="faq-title">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sage border border-brand-green-border text-brand-green text-xs font-semibold uppercase tracking-wider mb-3">
          Knowledge &amp; Clarity
        </div>
        <h2 id="faq-title" className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About Rooftop Solar in India
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3">
          Clear answers to common technical, financial, and policy questions.
        </p>
      </div>

      <div className="max-w-3xl flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-brand-green-border shadow-sm'
                  : 'bg-white/80 border-gray-200/80 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-base sm:text-lg text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 ml-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-green' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/60 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
