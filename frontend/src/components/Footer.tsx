import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-12 pb-16 border-t border-gray-200/80 text-gray-600 text-xs" role="contentinfo">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Brand & Mission Statement */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green">
              <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="14" fill="#2e7d32" />
                <path d="M50 4 L53 36 L47 36 Z" fill="#2e7d32" />
                <path d="M50 96 L53 64 L47 64 Z" fill="#2e7d32" />
                <path d="M4 50 L36 53 L36 47 Z" fill="#2e7d32" />
                <path d="M96 50 L64 53 L64 47 Z" fill="#2e7d32" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-base text-gray-900 tracking-tight">
              SolarSaathi
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed text-xs max-w-sm">
            An independent, non-commercial rooftop solar sizing and feasibility platform. Built to empower Indian households and small businesses with objective data before engaging commercial installers.
          </p>
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-1">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Zero customer tracking. Zero commercial affiliate kickbacks.</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3 flex flex-col gap-2.5">
          <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-1">
            Documentation &amp; Tools
          </div>
          <a href="#how-it-works" className="hover:text-brand-green transition-colors">How It Works</a>
          <a href="#why-it-matters" className="hover:text-brand-green transition-colors">Why Assessment Matters</a>
          <a href="#sample-estimate" className="hover:text-brand-green transition-colors">Sample Assessment</a>
          <a href="#methodology" className="hover:text-brand-green transition-colors">Methodology &amp; Formulas</a>
          <a href="#faqs" className="hover:text-brand-green transition-colors">Frequently Asked Questions</a>
        </div>

        {/* Official Indian Clean Energy Links */}
        <div className="md:col-span-4 flex flex-col gap-2.5">
          <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-1">
            Official Government Schemes
          </div>
          <a
            href="https://pmsuryaghar.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <span>PM Surya Ghar: Muft Bijli Yojana Portal</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
          <a
            href="https://mnre.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <span>Ministry of New and Renewable Energy (MNRE)</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
          <a
            href="https://cea.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <span>Central Electricity Authority (CEA) Baseline Data</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
          <a
            href="https://joint-research-centre.ec.europa.eu/pvgis-photovoltaic-geographical-information-system_en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <span>European Commission PVGIS Solar Radiation</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </a>
        </div>

      </div>

      {/* Legal & Regulatory Disclaimer */}
      <div className="pt-6 border-t border-gray-200/60 text-[11px] leading-relaxed text-gray-400 space-y-2">
        <p>
          <strong>Legal Disclaimer:</strong> SolarSaathi provides preliminary rooftop solar potential estimates for informational and educational purposes only. Calculations are derived from satellite meteorological models (European Commission PVGIS 5.2), CEA emission baselines, and user-provided inputs. These estimates do not constitute a formal engineering survey, structural guarantee, or commercial quotation. On-site structural inspection, shadow profiling, and state DISCOM distribution transformer approval are strictly required prior to any installation.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-gray-500">
          <span>&copy; {new Date().getFullYear()} SolarSaathi. Open-access engineering initiative.</span>
          <span>Designed with accessibility &amp; accuracy in focus.</span>
        </div>
      </div>
    </footer>
  );
};
