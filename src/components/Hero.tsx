import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Award, 
  Laptop, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Users, 
  ShieldCheck,
  Phone,
  Clock
} from 'lucide-react';
import heroImgUrl from '../assets/images/quran_hero_1780674937200.png';

interface HeroProps {
  onSubmitInquiry: (data: { fullName: string; email: string; phone: string; country: string; courseInterest: string; message: string }) => void;
  onOpenTrialModal: () => void;
}

export default function Hero({ onSubmitInquiry, onOpenTrialModal }: HeroProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('noorani-qaida');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [website, setWebsite] = useState('');
  const [botField, setBotField] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'inquiry'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotating text values representing the requested courses
  const rotatingWords = [
    'Tajweed',
    'Memorization',
    'Recitation',
    'Daily Duas',
    'Adhan',
    'Basics of Deen'
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Responsive switch observer
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile]);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const endpoint = apiUrl ? `${apiUrl}/send-email` : '/api/send-email';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email: `${name.toLowerCase().replace(/\s+/g, '') || 'student'}@quranrise-trial.com`, // Auto-generated safe mock email for quick leads
          phone: phone,
          country: 'Quick Trial Form',
          courseInterest: course,
          message: 'Quick lead generated from cinematic hero segment.',
          website,
          botField
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Transmission failed');
      }

      // Populate local sandbox/simulation storage
      const newLead = {
        id: 'lead_' + Math.random().toString(36).substr(2, 9),
        fullName: name,
        email: `${name.toLowerCase().replace(/\s+/g, '') || 'student'}@quranrise-trial.com`,
        phone: phone,
        country: 'Quick Trial Form',
        courseInterest: course,
        message: 'Quick lead generated from cinematic hero segment.',
        submittedAt: new Date().toISOString(),
        status: 'New'
      };

      const existingLeads = localStorage.getItem('quranrise_inquiries');
      let leadsArray = [];
      if (existingLeads) {
        try {
          leadsArray = JSON.parse(existingLeads);
        } catch (_) {}
      }
      leadsArray.unshift(newLead);
      localStorage.setItem('quranrise_inquiries', JSON.stringify(leadsArray));

      setSubmitted(true);
      setName('');
      setPhone('');
      setWebsite('');
      setBotField('');

      // Auto clear after 8 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 10000);

    } catch (err: any) {
      console.error("Hero submission error:", err);
      setErrorMsg(err.message || "Failed to submit. Please chat on WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen lg:h-screen lg:min-h-[820px] flex items-center bg-[#05110E] overflow-hidden"
    >
      {/* Background Graphic and Ambient Spotlights */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Continuous Background Video - plays natively on mobile and desktop */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="https://videos.pexels.com/video-files/9117001/9117001-sd_640_360_24fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/9117001/9117001-sd_960_506_24fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/9117001/9117001-uhd_1440_2560_24fps.mp4" type="video/mp4" />
          </video>
          {/* Left-to-right overlay for text legibility, top-to-bottom for subtle integration */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05110E]/95 via-[#05110E]/70 to-[#05110E]/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05110E] via-[#040E0B]/20 to-[#05110E]/60"></div>
        </div>

        <img
          src={heroImgUrl}
          alt="Quran study background"
          className="w-full h-full object-cover opacity-5 mix-blend-overlay filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05110E]/40 via-transparent to-[#05110E]"></div>
        
        {/* Soft elegant radial colors */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C8A24A]/4 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C8A24A]/4 rounded-full blur-[130px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 xs:pt-32 sm:pt-36 lg:pt-28 pb-8">
        
        {/* Mobile stacking layout order matched perfectly:
            1. Headline, 2. Description, 3. CTA, 4. Video Showcase, 5. Badges/indicators */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT SIDE: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8 text-left order-1 lg:order-none">
            
            {/* Apple/Stripe-level Heading style with react-bits rotating text replica */}
            <h1 className="font-display font-[900] text-[22px] xs:text-[26px] sm:text-[34px] md:text-[44px] lg:text-[48px] xl:text-[54px] text-white tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] filter drop-shadow-sm max-w-full sm:max-w-xl min-h-[4.5em] xs:min-h-[4.2em] sm:min-h-[3.8em] md:min-h-[3.5em]">
              Learn Quran Online<br />
              <span className="text-[#89A296] block sm:inline">with QuranRise and Master</span>
              <span className="inline-block relative overflow-hidden align-bottom min-w-[150px] xs:min-w-[180px] sm:min-w-[200px] ml-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A24A] via-[#D8BB72] to-[#FFF1D0] inline-block whitespace-nowrap"
                  >
                    → {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Premium subtitle in Inter 500 */}
            <p className="font-sans font-medium text-xs sm:text-base md:text-lg lg:text-[19px] text-[#A6C0B5] max-w-full sm:max-w-2xl leading-relaxed">
              Connect live with highly learned, certified native Arab tutors. Experience personalized, safe, 1-on-1 sessions designed with expert care for kids and adults.
            </p>

            {/* Combined 4-Button / Badges Grid for spacing efficiency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-full sm:max-w-xl xl:max-w-2xl pt-2 pb-4">
              {/* Button 1: Book 3-Day Free Trial */}
              <button
                onClick={onOpenTrialModal}
                className="h-12 sm:h-14 w-full px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] hover:from-[#D1AC52] hover:to-[#EAD08D] text-[#0A1A14] font-display font-black text-[11px] sm:text-xs uppercase tracking-widest shadow-[0_12px_24px_rgba(200,162,74,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer border border-[#EEDFBC]/20 shrink-0"
              >
                <span>Book Free Trial</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
              
              {/* Button 2: Chat on WhatsApp */}
              <a
                href="https://wa.me/13156364022"
                target="_blank"
                rel="noreferrer"
                className="h-12 sm:h-14 w-full px-4 sm:px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C8A24A]/30 text-[#E2C785] font-display font-bold text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <MessageCircle size={15} className="text-[#51DE78] fill-[#51DE78]/10" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Button 3: Certified Ijazah */}
              <div className="hidden sm:flex items-center space-x-3 bg-white/[0.03] border border-white/5 hover:border-[#C8A24A]/25 hover:bg-white/[0.05] p-3 rounded-xl transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-[#C8A24A]/10 flex items-center justify-center text-[#D8BB72] shrink-0">
                  <Award size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-white font-black text-[11px] sm:text-xs">Certified Ijazah</span>
                  <span className="text-[9px] sm:text-[10px] text-[#89A296] font-medium leading-none">Verified native tutors</span>
                </div>
              </div>

              {/* Button 4: Flexible 24/7 Hours */}
              <div className="hidden sm:flex items-center space-x-3 bg-white/[0.03] border border-white/5 hover:border-[#C8A24A]/25 hover:bg-white/[0.05] p-3 rounded-xl transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-[#C8A24A]/10 flex items-center justify-center text-[#D8BB72] shrink-0">
                  <Laptop size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-white font-black text-[11px] sm:text-xs">Flexible 24/7 Hours</span>
                  <span className="text-[9px] sm:text-[10px] text-[#89A296] font-medium leading-none">To fit your timeline</span>
                </div>
              </div>
            </div>

            {/* Underline stats validation */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#7B9B8E] border-t border-white/5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#51DE78] animate-pulse"></span>
                <span className="font-medium"><strong>241 Families</strong> online session active</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#C8A24A] fill-[#C8A24A]" />
                ))}
                <span className="ml-1 text-white font-bold text-[11px] font-mono">4.9/5 RATING</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Cinematic Video Presentation + Floating indicators - hidden on mobile to fit 100vh perfectly */}
          <div className="hidden lg:block lg:col-span-5 w-full relative">
            <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-[#C8A24A]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* Mode Selector for Cinematic Widescreen player vs Quick Inquiry Form overlay */}
            <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md mb-6 max-w-xs mx-auto">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-2.5 px-4 rounded-xl font-display font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] shadow'
                    : 'text-[#89A296] hover:text-white'
                }`}
              >
                <span>Live Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`flex-1 py-2.5 px-4 rounded-xl font-display font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === 'inquiry'
                    ? 'bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] shadow'
                    : 'text-[#89A296] hover:text-white'
                }`}
              >
                <span>Quick Inquiry</span>
              </button>
            </div>

            <div className="relative mx-auto max-w-[460px] min-h-[460px]">
              <AnimatePresence mode="wait">
                {activeTab === 'video' ? (
                  <motion.div
                    key="video-tab-preview"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative w-full aspect-[4/3] sm:aspect-square bg-[#05110E] rounded-[36px] sm:rounded-[44px] p-2 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.65)] overflow-hidden group"
                  >
                    {/* Golden edge glowing lines */}
                    <div className="absolute inset-0 rounded-[34px] sm:rounded-[42px] border-2 border-transparent bg-gradient-to-r from-[#C8A24A] via-transparent to-[#D8BB72] opacity-35 pointer-events-none z-20"></div>
                    
                    {/* Shadow masking overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10 pointer-events-none rounded-[34px]"></div>

                    {/* Responsive video loader - ONLY loads one video based on device breakpoint */}
                    {isMobile ? (
                      <video
                        key="mobile-video"
                        ref={videoRef}
                        src="/8488700-hd_1920_1080_25fps_1.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-[32px] sm:rounded-[40px] transition-transform duration-[5000ms] group-hover:scale-105"
                      />
                    ) : (
                      <video
                        key="desktop-video"
                        ref={videoRef}
                        src="/6671228-hd_1920_1080_25fps.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-[32px] sm:rounded-[40px] transition-transform duration-[5000ms] group-hover:scale-105"
                      />
                    )}

                    {/* FLOATING CARD 1: Connection indicator */}
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center space-x-2.5 max-w-[200px] shadow"
                    >
                      <span className="flex h-2 w-2 shrink-0 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-duration-1000"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <div className="text-left font-mono">
                        <h4 className="text-[9px] uppercase font-bold text-[#C8A24A] tracking-wider leading-none">Class Connection</h4>
                        <p className="text-[11px] text-white font-extrabold mt-1 leading-none">1:1 Sheikh Refresher</p>
                      </div>
                    </motion.div>

                    {/* FLOATING BADGE 2: Availability */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-[#C8A24A]/25 border border-[#C8A24A]/50 text-[#ECE5C1] text-[9px] font-bold uppercase tracking-widest rounded-xl backdrop-blur-sm shadow flex items-center space-x-1.5"
                    >
                      <Clock size={11} className="text-[#C8A24A]" />
                      <span>24/7 Live Availability</span>
                    </motion.div>

                    {/* FLOATING CARD 3: Comprehensive trust overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-6 left-6 right-6 z-20 bg-[#0A1A14]/85 backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-5 flex items-center justify-between shadow-2xl text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#115E59] text-white flex items-center justify-center font-display font-black text-xs shadow border border-white/5">
                          Hifz
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-[#D8BB72] text-xs">Native Arab Teachers</h4>
                          <p className="text-[10px] text-gray-300 mt-1 leading-none">Complete personalized Tajweed alignment</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                        ACTIVE
                      </span>
                    </motion.div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="inquiry-tab-overlay"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full bg-[#0A1D17]/95 border border-[#C8A24A]/25 p-8 rounded-[36px] sm:rounded-[44px] shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A24A]/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="text-center pb-5 mb-5 border-b border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D8BB72] font-mono">
                        Free Trial Registration
                      </span>
                      <h3 className="font-display font-[900] text-2xl text-white mt-1">
                        Secure Your Free Trial
                      </h3>
                      <p className="text-xs text-[#89A296] mt-2 max-w-sm mx-auto leading-relaxed">
                        Specify details to establish a patient male or female certified Sheikh block.
                      </p>
                    </div>

                    {submitted ? (
                      <div className="py-14 px-4 text-center space-y-4 animate-in fade-in duration-300">
                        <div className="w-14 h-14 rounded-full bg-[#C8A24A]/15 border border-[#C8A24A]/35 flex items-center justify-center mx-auto text-[#D8BB72]">
                          <CheckCircle size={28} />
                        </div>
                        <h4 className="font-display font-extrabold text-lg text-white">
                          Inquiry Logged!
                        </h4>
                        <p className="text-xs text-[#89A296] leading-relaxed">
                          Alhamdulillah. We have received your inquiry and sent a confirmation email to your inbox. Direct setup details sent to coordinator!
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleQuickSubmit} className="space-y-4">
                        {errorMsg && (
                          <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs px-3.5 py-2.5 rounded-xl text-left leading-relaxed">
                            {errorMsg}
                          </div>
                        )}

                        {/* Honeypot fields for anti-spam bot protection */}
                        <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                          <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            placeholder="Leave empty"
                          />
                          <input
                            type="text"
                            name="botField"
                            value={botField}
                            onChange={(e) => setBotField(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            placeholder="Do not fill"
                          />
                        </div>

                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A6C0B5] mb-2 font-mono">
                            Student / Parent Name
                          </label>
                          <input
                            type="text"
                            required
                            disabled={submitting}
                            placeholder="e.g. Brother Ahmad"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all disabled:opacity-55"
                          />
                        </div>

                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A6C0B5] mb-2 font-mono">
                            WhatsApp / Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            disabled={submitting}
                            placeholder="e.g. +1 (555) 019-2834"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all disabled:opacity-55"
                          />
                        </div>

                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A6C0B5] mb-2 font-mono">
                            Syllabus / Path Choice
                          </label>
                          <select
                            value={course}
                            disabled={submitting}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full bg-[#05110E] border border-white/10 focus:border-[#C8A24A] focus:ring-1 focus:ring-[#C8A24A] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer disabled:opacity-55"
                          >
                            <option value="noorani-qaida" className="bg-[#05110E]">Noorani Qaida Basics</option>
                            <option value="quran-reading" className="bg-[#05110E]">Quran Reading Fluency</option>
                            <option value="tajweed" className="bg-[#05110E]">Advanced Tajweed Rules</option>
                            <option value="memorization" className="bg-[#05110E]">Quran Memorization (Hifz)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] font-display font-black py-3.5 px-4 rounded-xl uppercase tracking-widest text-xs transition-all transform hover:scale-[1.01] hover:shadow-[0_4px_25px_rgba(200,162,74,0.3)] mt-2 cursor-pointer border border-[#EEDFBC]/30 disabled:opacity-50"
                        >
                          {submitting ? 'Registering...' : 'Book Free Lecture Slot'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
