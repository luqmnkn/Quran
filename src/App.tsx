import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import TrustCredibility from './components/TrustCredibility';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingControls from './components/FloatingControls';
import { X, Calendar, User, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedCourseSelection, setSelectedCourseSelection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Bar Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Course Selection scrolling directly to form
  const handleCourseSelection = (courseName: string) => {
    setSelectedCourseSelection(courseName);
    
    const targetElement = document.querySelector('#contact');
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Submit trigger from Quick Inquiry Hero
  const handleLeadSubmitInHero = (data: { fullName: string; email: string; phone: string; country: string; courseInterest: string; message: string }) => {
    // Lead successfully logged in InquiryForm already
    // This hook allows us to log any metrics or sync views
    console.log('Lead sync from hero:', data);
  };

  return (
    <div className="relative min-h-screen font-sans antialiased text-gray-950 bg-gray-50/50">
      

      {/* Header Sticky Component */}
      <Header onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenTrialModal={() => setIsTrialModalOpen(true)}
          onSubmitInquiry={handleLeadSubmitInHero}
        />

        {/* Services / Syllabus Showcase */}
        <Services
          onSelectCourse={handleCourseSelection}
          onOpenTrialModal={() => setIsTrialModalOpen(true)}
        />

        {/* About Academy & 3-Step Start Component */}
        <About onOpenTrialModal={() => setIsTrialModalOpen(true)} />

        {/* Why Choose Us features grid */}
        <WhyChooseUs />

        {/* Trust Credibility Stat meters */}
        <TrustCredibility />

        {/* Real student reviews & testimonials filter */}
        <Testimonials />

        {/* Primary Lead Generation Enrollment Form */}
        <InquiryForm
          prefilledCourse={selectedCourseSelection}
          onClearPrefill={() => setSelectedCourseSelection('')}
        />

        {/* FAQ Accordion Section */}
        <FAQSection />
      </main>

      {/* Layout Footer contacts */}
      <Footer />

      {/* Floating vibration WhatsApp trigger */}
      <WhatsAppButton />

      {/* Core Trial Request Popup Modal Wrapper */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header banner */}
            <div className="bg-emerald-custom-950 text-white p-5 pr-12 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-accent-500/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-gold-accent-400 w-5 h-5 shrink-0" />
                <h3 className="font-display font-extrabold text-lg text-white">
                  Schedule Free 3-Day Trial
                </h3>
              </div>
              <p className="text-xs text-emerald-custom-100/75 mt-1.5 leading-relaxed">
                Send your class request securely. No charges are billed for the evaluation sessions.
              </p>

              <button
                onClick={() => setIsTrialModalOpen(false)}
                className="absolute top-4 right-4 text-emerald-custom-100 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close scheduling modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body with embedded Inquiry Form */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              <InquiryForm
                prefilledCourse={selectedCourseSelection}
                onClearPrefill={() => setSelectedCourseSelection('')}
                isModalMode={true}
                onSubmitSuccess={() => {
                  // Wait briefly and close modal automatically on success
                  setTimeout(() => {
                    setIsTrialModalOpen(false);
                  }, 4000);
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Floating Controls system */}
      <FloatingControls onOpenTrialModal={() => setIsTrialModalOpen(true)} />

    </div>
  );
}
