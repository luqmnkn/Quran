import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, UserCheck, CalendarRange, GraduationCap, Users, Sparkles } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';
import learningSessionImg from '../assets/images/learning_session_1780674957111.png';

interface AboutProps {
  onOpenTrialModal: () => void;
}

export default function About({ onOpenTrialModal }: AboutProps) {
  const steps = [
    {
      num: '01',
      title: 'Book a Free Trial',
      desc: 'Fill out our simple inquiry form. Our scheduling coordinator will reach out directly on WhatsApp to coordinate a convenient time.',
      icon: 'CalendarRange'
    },
    {
      num: '02',
      title: 'Meet Your Tutor',
      desc: 'Connect live with a certified native Arab tutor. We assess the learner\'s levels and suggest a customized curriculum path.',
      icon: 'UserCheck'
    },
    {
      num: '03',
      title: 'Begin Quran Classes',
      desc: 'Lock in your weekly class slots and join highly interactive 1-on-1 virtual sessions. Watch your family\'s Tajweed skills rise.',
      icon: 'GraduationCap'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const renderCardContent = (step: typeof steps[0]) => (
    <div className="bg-white rounded-2xl border border-[#ECECE6] p-6 sm:p-7 md:p-8 shadow-[0_12px_30px_rgba(200,162,74,0.03)] flex flex-col justify-between items-center text-center space-y-4 hover:shadow-[0_15px_30px_rgba(200,162,74,0.08)] transition-all duration-300 relative group overflow-hidden h-full min-h-[285px]">
      {/* Top indicator ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

      <span className="absolute top-4 right-5 font-mono font-black text-[10px] text-[#C8A24A]/40 uppercase tracking-widest">
        {step.num}
      </span>

      {/* Round icon badge layout */}
      <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#8A6B20] border border-[#ECECE6] flex items-center justify-center shadow-inner group-hover:bg-[#0A1A14] group-hover:text-white transition-all duration-300 shrink-0">
        {step.icon === 'CalendarRange' && <CalendarRange size={18} className="stroke-[2.2]" />}
        {step.icon === 'UserCheck' && <UserCheck size={18} className="stroke-[2.2]" />}
        {step.icon === 'GraduationCap' && <GraduationCap size={18} className="stroke-[2.2]" />}
      </div>

      <div className="space-y-2">
        <h4 className="font-display font-[800] text-base text-[#0A1A14]">
          {step.title}
        </h4>
        <p className="text-xs text-[#526B62] leading-relaxed font-sans font-medium">
          {step.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section 
      id="about" 
      className="py-[100px] md:py-[140px] lg:py-[180px] bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C8A24A]/3 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* SPLIT SECTION LAYOUT: Mission & Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center mb-28 text-left">
          
          {/* Left Column: Learning visual display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -top-6 -left-6 w-80 h-80 bg-[#C8A24A]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Multi borders */}
            <div className="relative rounded-[32px] overflow-hidden border border-[#ECECE6] bg-white p-3 shadow-[0_22px_50px_rgba(200,162,74,0.08)]">
              <img
                src={learningSessionImg}
                alt="Student learning session with certified female tutor represented by QuranRise classes"
                className="w-full h-auto rounded-[24px] object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#0A1A14]/90 text-white p-5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-between shadow-2xl">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] flex items-center justify-center font-display font-extrabold text-[#0A1A14] shadow shrink-0">
                    1:1
                  </div>
                  <div>
                    <h5 className="font-display font-extrabold text-sm text-white leading-tight">Live Personalized Space</h5>
                    <p className="text-[11px] text-[#A6C0B5] mt-1 leading-none animate-pulse">Dedicated interactive atmosphere</p>
                  </div>
                </div>
                <Users size={20} className="text-[#D8BB72]" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission with Manrope 900 custom heights */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-[#F5EDD6] border border-[#C8A24A]/30 px-4 py-2 rounded-full shadow-sm">
              <BookOpen className="text-[#8A6B20] w-4.5 h-4.5" />
              <span className="text-xs font-bold text-[#8A6B20] uppercase tracking-widest font-mono">
                Our Academy Vision
              </span>
            </div>

            <h2 className="font-display font-[900] text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] text-[#0A1A14] tracking-[-0.040em] leading-[1.1] filter drop-shadow-sm">
              A Kind, Compassionate Pathway toward <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A6B20] via-[#C8A24A] to-[#D8BB72]">Noble Quran Tajweed</span>
            </h2>

            <p className="font-sans font-medium text-[18px] text-[#4E625A] leading-relaxed">
              At <strong>QuranRise</strong>, we establish a warm, encouraging environment connecting families globally with highly certified, authorized Native Arab educators from the comfort of home.
            </p>

            <p className="font-sans font-medium text-[16px] text-[#4E625A] leading-relaxed">
              We appreciate that every student is unique and advances at their own natural speed. Our live classes are conducted as supportive, friendly dialogs rather than stressful examinations. We seamlessly fuse classic Arabic spelling (Noorani Qaida) rules with interactive video platforms, ensuring your children read the verses with absolute beauty, correct pronunciation, and deep admiration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#FAFAF8] border border-[#ECECE6] hover:border-[#C8A24A]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0A1A14] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8A24A]"></span>
                  <span>Perfect Makharij Accuracy</span>
                </h4>
                <p className="text-xs text-[#526B62] leading-relaxed">
                  Focusing closely on native tongue and throat positions so children learn correct letter origins.
                </p>
              </div>
              
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#FAFAF8] border border-[#ECECE6] hover:border-[#C8A24A]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0A1A14] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8A24A]"></span>
                  <span>Patient Female Specialists</span>
                </h4>
                <p className="text-xs text-[#526B62] leading-relaxed">
                   Gentle and loving certified female Sheikhahs highly protective of young kids and sisters.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3 STEPS ONBOARDING */}
        <div className="pt-20 border-t border-[#ECECE6] text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#8A6B20]">
              The Simplest Process
            </span>
            <h3 className="font-display font-[900] text-3xl sm:text-[45px] text-[#0A1A14] tracking-[-0.04em] leading-tight">
              Begin Your Path in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A6B20] via-[#C8A24A] to-[#B3923B] underline underline-offset-8 decoration-4">3 Elegant Steps</span>
            </h3>
          </div>

          {/* 1. DESKTOP VIEW: Adaptive grid */}
          <motion.div 
            className="hidden md:grid grid-cols-3 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#F5EDD6] via-[#C8A24A]/30 to-[#F5EDD6] -z-10"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={childVariants}
                className="h-full"
              >
                {renderCardContent(step)}
              </motion.div>
            ))}
          </motion.div>

          {/* 2. MOBILE VIEW: Horizontal scroll */}
          <div className="block md:hidden">
            <PremiumCarousel>
              {steps.map((step, idx) => (
                <div key={idx} className="h-full">
                  {renderCardContent(step)}
                </div>
              ))}
            </PremiumCarousel>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <button
              onClick={onOpenTrialModal}
              className="px-10 py-5 font-display font-black text-xs uppercase tracking-widest text-[#0A1A14] bg-gradient-to-r from-[#C29A3E] to-[#D8BB72] hover:from-[#D1AC52] hover:to-[#EAD08D] hover:scale-[1.02] border-0 transition-all rounded-xl shadow-[0_12px_36px_rgba(200,162,74,0.3)] cursor-pointer inline-flex items-center space-x-2.5"
            >
              <span>Schedule 3-Day Free Trial Now</span>
              <Sparkles size={14} className="animate-pulse" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
