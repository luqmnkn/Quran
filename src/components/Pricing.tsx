import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Star, Sparkles, Award } from 'lucide-react';

interface PricingProps {
  onBookTrial: (planName: string, planDetails: string) => void;
}

export default function Pricing({ onBookTrial }: PricingProps) {
  const [region, setRegion] = useState<'USA' | 'UK' | 'CANADA' | 'AUSTRALIA'>('USA');

  const getPriceInfo = (price: number) => {
    switch (region) {
      case 'UK':
        return { symbol: '£', value: Math.round(price * 0.8) };
      case 'CANADA':
        return { symbol: 'C$', value: Math.round(price * 1.4) };
      case 'AUSTRALIA':
        return { symbol: 'A$', value: Math.round(price * 1.5) };
      case 'USA':
      default:
        return { symbol: '$', value: price };
    }
  };

  const plans = [
    {
      id: 1,
      name: 'Plan 1',
      price: 38,
      oldPrice: 48,
      popular: false,
      features: [
        'Free Trial Class',
        '2 Days per Week',
        '30 Minutes / Class',
        '08 Classes / Month'
      ]
    },
    {
      id: 2,
      name: 'Plan 2',
      price: 38,
      oldPrice: 48,
      popular: false,
      features: [
        'Free Trial Class',
        '2 Days per Week',
        '30 Minutes / Class',
        '08 Classes / Month'
      ]
    },
    {
      id: 3,
      name: 'Plan 3',
      price: 68,
      oldPrice: 78,
      popular: false,
      features: [
        'Free Trial Class',
        '4 Days per Week',
        '30 Minutes / Class',
        '16 Classes / Month'
      ]
    },
    {
      id: 4,
      name: 'Plan 4',
      price: 83,
      oldPrice: 78,
      popular: false,
      features: [
        'Free Trial Class',
        '5 Days per Week',
        '30 Minutes / Class',
        '20 Classes / Month'
      ]
    },
    {
      id: 5,
      name: 'Plan 5',
      price: 100,
      oldPrice: 110,
      popular: true,
      features: [
        'Free Trial Class',
        '3 Days per Week',
        '1 Hour / Class',
        '12 Classes / Month'
      ]
    },
    {
      id: 6,
      name: 'Plan 6',
      price: 125,
      oldPrice: 135,
      popular: false,
      features: [
        'Free Trial Class',
        '4 Days per Week',
        '1 Hour / Class',
        '16 Classes / Month'
      ]
    },
    {
      id: 7,
      name: 'Plan 7',
      price: 160,
      oldPrice: 170,
      popular: false,
      features: [
        'Free Trial Class',
        '5 Days per Week',
        '1 Hour / Class',
        '20 Classes / Month'
      ]
    },
    {
      id: 8,
      name: 'Plan 8',
      price: 180,
      oldPrice: 200,
      popular: false,
      features: [
        'Free Trial Class',
        '6 Days per Week',
        '1 Hour / Class',
        '24 Classes / Month'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = (isPopular: boolean) => ({
    hidden: { opacity: 0, y: 40, scale: isPopular ? 0.98 : 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: isPopular ? 1.03 : 1, 
      transition: { type: 'spring', stiffness: 90, damping: 15 } 
    }
  });

  return (
    <section id="pricing" className="py-[100px] md:py-[140px] bg-white relative overflow-hidden">
      {/* Decorative luxury radial glow background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C8A24A]/4 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-12 left-12 w-[500px] h-[500px] bg-[#0A1A14]/3 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[#F5EDD6] border border-[#C8A24A]/30 px-4 py-1.5 rounded-full"
          >
            <Award className="text-[#8A6B20] w-4 h-4" />
            <span className="text-[11px] font-bold text-[#8A6B20] uppercase tracking-widest font-mono">
              Empowered Tuition Packages
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[54px] text-[#0A1A14] tracking-[-0.04em] leading-[1.1]"
          >
            Pricing & Plans
          </motion.h2>

          {/* Elegant gold divider */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent mx-auto mt-2"
          />

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="font-sans font-medium text-[16px] sm:text-[18px] text-[#4E625A] max-w-2xl mx-auto leading-relaxed pt-2"
          >
            Choose the perfect Quran learning plan that fits your schedule and learning goals.
          </motion.p>
        </div>

        {/* Region Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-14 max-w-3xl mx-auto relative z-10 px-4">
          {[
            { id: 'USA', flag: '🇺🇸', label: 'USA', currency: 'USD' },
            { id: 'UK', flag: '🇬🇧', label: 'UK', currency: 'GBP' },
            { id: 'CANADA', flag: '🇨🇦', label: 'Canada', currency: 'CAD' },
            { id: 'AUSTRALIA', flag: '🇦🇺', label: 'Australia', currency: 'AUD' }
          ].map((r) => {
            const isActive = region === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRegion(r.id as any)}
                className={`px-5 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center space-x-2 border shrink-0 ${
                  isActive
                    ? 'bg-[#0A1A14] text-[#C8A24A] border-[#C8A24A] shadow-[0_12px_28px_rgba(200,162,74,0.18)] scale-[1.03]'
                    : 'bg-[#FAFAF8] text-[#4E625A] border-[#ECECE6] hover:border-[#C8A24A]/40 hover:bg-white hover:scale-[1.01]'
                }`}
              >
                <span className="text-sm">{r.flag}</span>
                <span>{r.label}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-white/10 text-[#D8BB72]' : 'bg-gray-200/65 text-gray-500'}`}>{r.currency}</span>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch pt-2"
        >
          {plans.map((plan) => {
            const planPriceInfo = getPriceInfo(plan.price);
            const planOldPriceInfo = getPriceInfo(plan.oldPrice);
            const detailsText = `${plan.features[1]} - ${plan.features[2]} (${plan.features[3]}) - ${planPriceInfo.symbol}${planPriceInfo.value}/month`;
            
            return (
              <motion.div
                key={plan.id}
                variants={cardVariants(plan.popular)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-[#0A1A14] text-white border-2 border-[#C8A24A] shadow-[0_20px_50px_rgba(200,162,74,0.18)] lg:translate-y-[-12px] z-20' 
                    : 'bg-[#FAFAF8] text-[#0A1A14] border border-[#ECECE6] hover:border-[#C8A24A]/40 hover:bg-white shadow-[0_12px_35px_rgba(200,162,74,0.03)] z-10'
                }`}
              >
                {/* Visual Popular highlight background logic */}
                {plan.popular && (
                  <div className="absolute top-0 left-12 right-12 bottom-0 bg-gradient-to-b from-[#C8A24A]/10 to-transparent blur-2xl pointer-events-none"></div>
                )}

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#C29A3E] to-[#D8BB72] text-[#0A1A14] text-[10px] uppercase tracking-widest font-display font-black px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap">
                    <Star size={11} className="fill-current text-[#0A1A14]" />
                    <span>POPULAR</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Name & Tag */}
                  <div className="text-left space-y-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      plan.popular ? 'bg-white/10 text-[#D8BB72]' : 'bg-[#F5EDD6] text-[#8A6B20]'
                    }`}>
                      Elite Syllabus
                    </span>
                    <h3 className="font-display font-[900] text-xl mt-2 leading-none">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Pricing Display */}
                  <div className="text-left flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-display font-[900] tracking-tight">
                      {planPriceInfo.symbol}{planPriceInfo.value}
                    </span>
                    <span className={`text-xs font-mono font-medium ${plan.popular ? 'text-white/40' : 'text-gray-400'}`}>
                      / month
                    </span>
                    {plan.oldPrice && (
                      <span className={`text-xs ml-2 line-through font-mono lg:text-sm font-medium ${
                        plan.popular ? 'text-white/30' : 'text-gray-400/80'
                      }`}>
                        {planOldPriceInfo.symbol}{planOldPriceInfo.value}
                      </span>
                    )}
                  </div>

                  <hr className={`border-t ${plan.popular ? 'border-white/10' : 'border-[#ECECE6]'}`} />

                  {/* Bullet features */}
                  <ul className="space-y-3.5 text-left text-xs sm:text-[13px] font-sans font-semibold">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                          plan.popular 
                            ? 'bg-[#112A22] text-[#51DE78] border-[#C8A24A]/20' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          <Check size={11} className="stroke-[3]" />
                        </span>
                        <span className={plan.popular ? 'text-[#A6C0B5]' : 'text-[#4E625A]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit action CTA */}
                <div className="pt-8">
                  <button
                    onClick={() => onBookTrial(plan.name, detailsText)}
                    className={`w-full py-3.5 px-4 font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#C29A3E] to-[#D8BB72] hover:from-[#D1AC52] hover:to-[#EAD08D] text-[#0A1A14] hover:scale-[1.02] shadow-[0_12px_28px_rgba(200,162,74,0.3)] border-0'
                        : 'bg-[#0A1A14] hover:bg-[#C8A24A] text-white hover:text-[#0A1A14] hover:scale-[1.02] shadow-sm'
                    }`}
                  >
                    <span>Book Free Trial</span>
                    <Sparkles size={13} className={plan.popular ? 'text-[#0A1A14] animate-pulse' : 'text-current'} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
