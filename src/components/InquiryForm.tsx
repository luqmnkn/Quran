import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquirySubmission } from '../types';
import { Mail, Phone, Globe, MessageSquare, Check, AlertCircle, Trash2, Send, Clock, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

interface InquiryFormProps {
  prefilledCourse: string;
  onClearPrefill: () => void;
  onSubmitSuccess?: () => void;
  isModalMode?: boolean;
}

export default function InquiryForm({ prefilledCourse, onClearPrefill, onSubmitSuccess, isModalMode = false }: InquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [courseInterest, setCourseInterest] = useState('noorani-qaida');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [storedLeads, setStoredLeads] = useState<InquirySubmission[]>([]);
  const [showLeadViewer, setShowLeadViewer] = useState(false);

  // Sync Prefill Course Changes
  useEffect(() => {
    if (prefilledCourse) {
      if (prefilledCourse.toLowerCase().includes('qaida')) setCourseInterest('noorani-qaida');
      else if (prefilledCourse.toLowerCase().includes('reading') || prefilledCourse.toLowerCase().includes('recitation')) setCourseInterest('quran-reading');
      else if (prefilledCourse.toLowerCase().includes('tajweed')) setCourseInterest('tajweed');
      else if (prefilledCourse.toLowerCase().includes('memorization') || prefilledCourse.toLowerCase().includes('hifz')) setCourseInterest('memorization');
    }
  }, [prefilledCourse]);

  // Load leads from localStorage for simulation/demo features
  useEffect(() => {
    const raw = localStorage.getItem('quranrise_inquiries');
    if (raw) {
      try {
        setStoredLeads(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, [status]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address structure';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (phone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Please specify a valid contact phone number';
    }
    if (!message.trim()) {
      newErrors.message = 'Please provide a small message about your class requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Simulate Network delay for ultra professional conversion experience
    setTimeout(() => {
      const newLead: InquirySubmission = {
        id: 'lead_' + Math.random().toString(36).substr(2, 9),
        fullName,
        email,
        phone,
        country,
        courseInterest,
        message,
        submittedAt: new Date().toISOString(),
        status: 'New'
      };

      const existingLeads = localStorage.getItem('quranrise_inquiries');
      let leadsArray: InquirySubmission[] = [];
      if (existingLeads) {
        try {
          leadsArray = JSON.parse(existingLeads);
        } catch (e) {
          leadsArray = [];
        }
      }
      leadsArray.unshift(newLead);
      localStorage.setItem('quranrise_inquiries', JSON.stringify(leadsArray));
      setStoredLeads(leadsArray);

      setStatus('success');
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      onClearPrefill();
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Hide success tag after 6 seconds
      setTimeout(() => {
         setStatus('idle');
      }, 8000);

    }, 1200);
  };

  const handleDeleteLead = (id: string) => {
    const updated = storedLeads.filter(l => l.id !== id);
    localStorage.setItem('quranrise_inquiries', JSON.stringify(updated));
    setStoredLeads(updated);
  };

  const handleClearAllLeads = () => {
    if (confirm('Clear all local simulation leads?')) {
      localStorage.removeItem('quranrise_inquiries');
      setStoredLeads([]);
    }
  };

  if (isModalMode) {
    return (
      <div className="w-full text-left">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#FAFAF5] text-[#8A6B20] border-2 border-[#C8A24A]/30 flex items-center justify-center mx-auto shadow-sm">
                <Check size={28} className="stroke-[3]" />
              </div>
              <h3 className="font-display font-[900] text-xl text-[#0A1A14]">
                Trial Booked!
              </h3>
              <p className="text-xs text-[#4E625A] leading-relaxed max-w-sm mx-auto">
                Alhamdulillah. Your trial slots are securely registered. Coordinator will message you on WhatsApp shortly to confirm.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                  Full Name / Parent Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Salim Al-Mansoor"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) delete errors.fullName;
                  }}
                  className={`w-full bg-[#FAFAF8] border ${
                    errors.fullName ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                  } rounded-xl px-4 py-3 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-400`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                    <AlertCircle size={12} />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. salim@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) delete errors.email;
                    }}
                    className={`w-full bg-[#FAFAF8] border ${
                      errors.email ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                    } rounded-xl px-4 py-3 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-450`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (315) 555-0100"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) delete errors.phone;
                    }}
                    className={`w-full bg-[#FAFAF8] border ${
                      errors.phone ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                    } rounded-xl px-4 py-3 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-450`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                      <AlertCircle size={12} />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#ECECE6] focus:border-[#C8A24A] rounded-xl px-4 py-3 text-xs text-[#0A1A14] outline-none transition-all cursor-pointer"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="United Arab Emirates">UAE</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                    Quran Course
                  </label>
                  <select
                    value={courseInterest}
                    onChange={(e) => setCourseInterest(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[#ECECE6] focus:border-[#C8A24A] rounded-xl px-4 py-3 text-xs text-[#0A1A14] outline-none transition-all cursor-pointer"
                  >
                    <option value="noorani-qaida">Noorani Qaida Basics</option>
                    <option value="quran-reading">Quran Recitation</option>
                    <option value="tajweed">Tajweed al Quran</option>
                    <option value="memorization">Quran Memorization</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A1A14] mb-1.5">
                  Age & Level / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Learner details, specific timing bounds, male/female tutor preference..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) delete errors.message;
                  }}
                  className={`w-full bg-[#FAFAF8] border ${
                    errors.message ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                  } rounded-xl px-4 py-2.5 text-sm text-[#0A1A14] outline-none transition-all resize-none placeholder-gray-400`}
                ></textarea>
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                    <AlertCircle size={12} />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-12 bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] font-display font-extrabold rounded-xl uppercase tracking-widest text-[11px] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Clock size={14} className="animate-spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Book 3-Day Free Trial</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section 
      id="contact" 
      className="py-24 md:py-36 lg:py-48 bg-[#FAFAF8] border-t border-[#ECECE6] relative overflow-hidden"
    >
      {/* Visual background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#C8A24A]/5 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#0A1A14]/3 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Premium Spacing */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F5EDD6] border border-[#C8A24A]/30 px-4 py-2 rounded-full shadow-sm">
            <ShieldCheck className="text-[#8A6B20] w-4.5 h-4.5" />
            <span className="text-xs font-bold text-[#8A6B20] uppercase tracking-widest font-mono">
              Secure Enrollment Hub
            </span>
          </div>
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] text-[#0A1A14] tracking-[-0.035em] leading-[1.05]">
            Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A6B20] via-[#C8A24A] to-[#D8BB72] underline underline-offset-8 decoration-4">Free Trial Lesson</span>
          </h2>
          <p className="text-sm sm:text-base text-[#526B62] max-w-lg mx-auto leading-relaxed">
             Join risk-free. No credit card required. Our coordinator coordinates direct class setups on WhatsApp within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto text-left">
          
          {/* Left Column: Core benefits + Trust callouts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-[#0A1A14] text-white rounded-[32px] p-8 sm:p-10 space-y-8 relative overflow-hidden border border-[#112A22] shadow-2xl flex-1">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8A24A]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="font-display font-extrabold text-[#D8BB72] text-[20px]">
                What Happens Next?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 text-sm">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    1
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">WhatsApp Coordination</strong>
                    <p className="text-[#89A296] text-xs mt-1 leading-relaxed">Our coordinator contacts you on WhatsApp immediately to set up appropriate lesson timings and dates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-sm">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    2
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">Certified 3-Day Assessment</strong>
                    <p className="text-[#89A296] text-xs mt-1 leading-relaxed">Connect directly with a friendly, certified native Arab tutor to map spelling and recitation levels.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-sm">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C8A24A] to-[#D8BB72] text-[#0A1A14] flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    3
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">Custom Student Syllabus</strong>
                    <p className="text-[#89A296] text-xs mt-1 leading-relaxed">If 100% satisfied, lock in regular classes on your own flexible schedule at highly accessible sibling pricing.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-[#7B9B8E]">
                <span className="flex items-center space-x-2">
                  <Check size={15} className="text-[#D8BB72]" strokeWidth={2.5} />
                  <span>Secure 256-bit encryption</span>
                </span>
                <span>Response: Under ~1 hour</span>
              </div>
            </div>

            {/* Direct contact info card */}
            <div className="bg-white rounded-[28px] border border-[#ECECE6] p-8 space-y-5 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
              <h4 className="font-display font-[800] text-[#0A1A14] text-sm uppercase tracking-wider font-mono">
                Direct Registration Channels
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="https://wa.me/13156364022" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-4 p-4 bg-[#FAFAF8] rounded-2xl hover:bg-[#F2F2EC] border border-[#ECECE6] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#51DE78]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider">Fast Coordinator WhatsApp</span>
                    <p className="text-[#0A1A14] font-extrabold mt-0.5 text-sm">+1 (315) 636-4022</p>
                  </div>
                </a>

                <a 
                  href="mailto:support@quranrise.com" 
                  className="flex items-center space-x-4 p-4 bg-[#FAFAF8] rounded-2xl hover:bg-[#F2F2EC] border border-[#ECECE6] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8A6B20]/10 text-[#8A6B20] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider">Direct Helpdesk Email</span>
                    <p className="text-[#0A1A14] font-extrabold mt-0.5 text-sm">support@quranrise.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#ECECE6] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center space-y-5"
                >
                  <div className="w-20 h-20 rounded-full bg-[#FAFAF5] text-[#8A6B20] border-2 border-[#C8A24A]/30 flex items-center justify-center mx-auto shadow-sm">
                    <Check size={36} className="stroke-[3]" />
                  </div>
                  <h3 className="font-display font-[900] text-2xl text-[#0A1A14]">
                    Trial Lesson Booked!
                  </h3>
                  <p className="text-sm text-[#4E625A] max-w-md mx-auto leading-relaxed">
                    Alhamdulillah. Your free slots have been registered in our scheduling coordinator board. Check your WhatsApp notifications — you will receive a direct setup message shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-[#FAFAF5] hover:bg-[#F2F2EC] border border-[#ECECE6] text-gray-700 font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl cursor-pointer"
                  >
                    Request Another Slot
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Full name input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                      Full Name / Parent Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Salim Al-Mansoor"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) delete errors.fullName;
                      }}
                      className={`w-full bg-[#FAFAF8] border ${
                        errors.fullName ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                      } rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-400`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                        <AlertCircle size={13} />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Grid of Double inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. salim@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) delete errors.email;
                        }}
                        className={`w-full bg-[#FAFAF8] border ${
                          errors.email ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                        } rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-400`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                          <AlertCircle size={13} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                        WhatsApp Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (315) 555-0100"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) delete errors.phone;
                        }}
                        className={`w-full bg-[#FAFAF8] border ${
                          errors.phone ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                        } rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all placeholder-gray-400`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                          <AlertCircle size={13} />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country / Course Interest Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Country Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                        Country of Residence
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#ECECE6] focus:border-[#C8A24A] rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all cursor-pointer"
                      >
                        <option value="United States">United States (USA)</option>
                        <option value="United Kingdom">United Kingdom (UK)</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="United Arab Emirates">UAE (Dubai, Sharjah)</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Other">Other Country</option>
                      </select>
                    </div>

                    {/* Course selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                        Select Quran Course
                      </label>
                      <select
                        value={courseInterest}
                        onChange={(e) => setCourseInterest(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#ECECE6] focus:border-[#C8A24A] rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all cursor-pointer"
                      >
                        <option value="noorani-qaida">Noorani Qaida Basics</option>
                        <option value="quran-reading">Quran Recitation & Reading</option>
                        <option value="tajweed">Tajweed al Quran Rules</option>
                        <option value="memorization">Quran Memorization (Hifz)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message text area */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0A1A14] mb-2.5">
                      Your Requirements / Student's Age and level
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify learner details, age, preferred teacher gender (male/female), or convenient schedule bounds..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) delete errors.message;
                      }}
                      className={`w-full bg-[#FAFAF8] border ${
                        errors.message ? 'border-red-500' : 'border-[#ECECE6] focus:border-[#C8A24A]'
                      } rounded-xl px-4 py-3.5 text-sm text-[#0A1A14] outline-none transition-all resize-none placeholder-gray-400`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                        <AlertCircle size={13} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Height 56px-64px CTA conforming to premium specs */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full h-15 bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] hover:scale-[1.01] text-[#0A1A14] font-display font-extrabold rounded-2xl uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Clock size={16} className="animate-spin" />
                        <span>Arranging Class Slots...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="stroke-[2.5]" />
                        <span>Securely Book 3-Day Free Trial</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-gray-400 leading-normal">
                    🛡️ Zero auto-spam policy. Your personal coordinates are encrypted securely.
                  </p>
                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Dynamic Verification Utility block (extremely neat client-side proof-of-concept simulation tool) */}
        <div className="mt-20 pt-8 border-t border-[#ECECE6] max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#F6F7F3] border border-[#ECECE6]">
            <div className="flex items-center space-x-3 text-xs text-gray-600 text-left">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-700 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <div>
                <strong>Simulation Sandbox:</strong> Submitted leads are persisted securely inside the browser's <code>localStorage</code> sandbox environment for convenient preview mapping.
              </div>
            </div>
            
            <button
              onClick={() => setShowLeadViewer(!showLeadViewer)}
              className="text-xs bg-white hover:bg-[#FAFAF8] border border-[#ECECE6] font-extrabold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm text-gray-700"
            >
              {showLeadViewer ? 'Hide Sandbox Viewer' : `Show Sandbox Viewer (${storedLeads.length})`}
            </button>
          </div>

          <AnimatePresence>
            {showLeadViewer && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-6 bg-white border border-[#ECECE6] rounded-3xl p-6 sm:p-8 text-left space-y-5 shadow-inner max-h-96 overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-[#F2F2EC] pb-4">
                  <div className="flex items-center space-x-2.5">
                    <BookOpen size={18} className="text-[#8A6B20]" />
                    <h4 className="font-display font-[800] text-sm text-[#0A1A14]">
                      Simulated Lead Registry Console (Web Local DB)
                    </h4>
                  </div>
                  {storedLeads.length > 0 && (
                    <button
                      onClick={handleClearAllLeads}
                      className="text-xs text-red-500 font-bold flex items-center space-x-1.5 hover:underline cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Purge Database</span>
                    </button>
                  )}
                </div>

                {storedLeads.length === 0 ? (
                  <div className="text-center py-12 text-xs text-gray-400 font-bold font-mono">
                    -- NO LEAD ENTRIES SUBMITTED TO THIS LOCAL PREVIEW DEV CONTAINER YET --
                  </div>
                ) : (
                  <div className="space-y-4">
                    {storedLeads.map((lead) => (
                      <div key={lead.id} className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#ECECE6] text-xs relative flex flex-col justify-between">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete inquiry record"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          <div className="space-y-1">
                            <span className="text-gray-400 block font-bold text-[9px] uppercase font-mono">Inquirer Details</span>
                            <strong className="text-[#0A1A14] block text-sm">{lead.fullName}</strong>
                            <span className="text-gray-500 block">{lead.email}</span>
                            <span className="text-gray-500 block">{lead.phone}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-gray-400 block font-bold text-[9px] uppercase font-mono">Curriculum Focus</span>
                            <span className="text-[#8A6B20] font-extrabold block text-sm uppercase">{lead.courseInterest.replace('-', ' ')}</span>
                            <span className="text-gray-500 block">Location: {lead.country}</span>
                            <span className="text-gray-400 block font-mono text-[9px]">{new Date(lead.submittedAt).toLocaleString()}</span>
                          </div>

                          <div className="sm:col-span-2 lg:col-span-1 border-t sm:border-t-0 sm:pt-0 pt-3 text-gray-600 bg-white p-3.5 rounded-xl border border-[#ECECE6] shadow-sm">
                            <span className="text-gray-400 block font-bold text-[9px] uppercase font-mono mb-1">Coordinating Note</span>
                            <p className="italic leading-relaxed text-[11px] font-medium text-gray-800">"{lead.message}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
