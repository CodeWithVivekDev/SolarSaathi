import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { WhyAssessmentMatters } from './components/WhyAssessmentMatters';
import { IllustrativeEstimate } from './components/IllustrativeEstimate';
import { MethodologySection } from './components/MethodologySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { EstimatorQuickModal } from './components/EstimatorQuickModal';

export const App: React.FC = () => {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-gray-900 py-4 sm:py-8 px-2 sm:px-6 md:px-8 flex flex-col items-center">
      
      {/* Main Elevated Content Frame (matching design-reference composition) */}
      <main className="w-full max-w-[1240px] bg-white rounded-frame shadow-mockup border border-gray-200/50 p-6 sm:p-10 md:p-12 transition-all duration-300">
        
        {/* Navigation Bar */}
        <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />

        {/* Hero Section */}
        <Hero onOpenEstimator={() => setIsEstimatorOpen(true)} />

        {/* How It Works Section */}
        <HowItWorks onOpenEstimator={() => setIsEstimatorOpen(true)} />

        {/* Why Solar Assessment Matters Section */}
        <WhyAssessmentMatters />

        {/* Illustrative Sample Estimate Section */}
        <IllustrativeEstimate onOpenEstimator={() => setIsEstimatorOpen(true)} />

        {/* Methodology Disclosure & Limitations */}
        <MethodologySection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Footer */}
        <Footer />

      </main>

      {/* Sizing Estimator Modal / Tool */}
      <EstimatorQuickModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

    </div>
  );
};

export default App;
