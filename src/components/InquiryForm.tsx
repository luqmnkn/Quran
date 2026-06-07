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
  const [website, setWebsite] = useState('');
  const [botField, setBotField] = useState('');
  
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    if (errors.submit) {
      const updatedErrors = { ...errors };
      delete updatedErrors.submit;
      setErrors(updatedErrors);
    }

    try {
      // POST the lead data to our centralized backend email service
      const apiUrl = import.meta.env.VITE_API_URL;
      const endpoint = apiUrl ? `${apiUrl}/send-email` : '/api/send-email';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          country,
          courseInterest,
          message,
          website,
          botField,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Error occurred during form processing');
      }

      // Record for sandbox simulation log
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
        } catch (err) {
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
      setWebsite('');
      setBotField('');
      onClearPrefill();
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Keep success state for 12 seconds so users can read the detailed prompt, then return to idle
      setTimeout(() => {
         setStatus('idle');
      }, 12000);

    } catch (err: any) {
      console.error("Submission failed:", err);
      setStatus('error');
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'A transmission error occurred. Please verify your internet connection or reach us on WhatsApp.'
      }));
    }
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
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-center space-x-2 font-semibold animate-in fade-in duration-200">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errors.submit}</span>
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
          <div className="lg:col-span-7 bg-white rounded-[1.75rem] sm:rounded-[32px] border border-[#ECECE6] p-4 xs:p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            
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
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center space-x-2 font-semibold animate-in fade-in duration-200">
                      <AlertCircle size={16} className="shrink-0 animate-pulse" />
                      <span>{errors.submit}</span>
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
                    className="w-full h-13 sm:h-15 bg-gradient-to-r from-[#C8A24A] to-[#D8BB72] hover:scale-[1.01] text-[#0A1A14] font-display font-extrabold rounded-xl sm:rounded-2xl uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-xs px-2.5 sm:px-6 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-amber-500/10"
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

        {/* Demo Leads Area */}
        <div id="sandbox-leads" className="mt-16 pt-10 border-t border-[#ECECE6] max-w-5xl mx-auto text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 sm:p-6 border border-[#ECECE6] shadow-sm">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-[#8A6B20]/80 uppercase tracking-widest block bg-[#F5EDD6] px-2.5 py-0.5 rounded-full w-fit">
                Developer Live Sandbox
              </span>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-[#0A1A14]">
                How do I access form submissions?
              </h4>
              <p className="text-xs text-[#526B62] leading-relaxed max-w-lg">
                Your entries are saved instantly to the local sandbox database for testing. Click the toggle to verify data capture, payloads, and WhatsApp integration schemas.
              </p>
            </div>
            
            <button
              onClick={() => setShowLeadViewer(!showLeadViewer)}
              className="px-5 py-2.5 bg-[#0A1A14] text-white hover:bg-[#153428] font-display font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow"
            >
              <Sparkles size={13} className="text-[#D8BB72]" />
              <span>{showLeadViewer ? "Hide Lead Registry" : `Open Lead Registry (${storedLeads.length})`}</span>
            </button>
          </div>

          <AnimatePresence>
            {showLeadViewer && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[24px] border border-[#ECECE6] p-6 sm:p-8 text-left space-y-6 shadow-md"
              >
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#F2F2EC] pb-4">
                  <div>
                    <h5 className="font-display font-black text-sm text-[#0A1A14] uppercase tracking-wider">
                      Sandbox Database Logs
                    </h5>
                    <p className="text-xs text-[#7B9B8E] mt-0.5">
                      Submissions stored locally in browser <code>localStorage</code> (Key: <code>quranrise_inquiries</code>)
                    </p>
                  </div>
                  
                  {storedLeads.length > 0 && (
                    <button
                      onClick={handleClearAllLeads}
                      className="text-xs font-mono font-bold text-red-500 hover:text-red-600 space-x-1 flex items-center transition-colors px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer border-0"
                    >
                      <Trash2 size={13} />
                      <span>Clear Database Logs</span>
                    </button>
                  )}
                </div>

                {storedLeads.length === 0 ? (
                  <div className="text-center py-12 space-y-2">
                    <p className="text-sm font-medium text-gray-400">
                      No sandbox records found.
                    </p>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Fill out and submit the "Schedule Your Free Trial" form above to watch your submission capture in real-time with flawless details!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {storedLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="bg-[#FAFAF8] p-4 sm:p-5 rounded-2xl border border-[#ECECE6] hover:border-[#C8A24A]/30 relative group transition-all"
                      >
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1 bg-transparent border-0 cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="space-y-3">
                          <div className="flex items-start justify-between pr-6">
                            <div>
                              <span className="text-[10px] font-mono font-bold bg-[#F5EDD6] text-[#8A6B20] px-2 py-0.5 rounded uppercase tracking-wider">
                                {lead.courseInterest.replace('-', ' ')}
                              </span>
                              <h6 className="font-display font-[900] text-sm text-[#0A1A14] mt-1.5">
                                {lead.fullName}
                              </h6>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {new Date(lead.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-[#526B62]">
                            <div className="flex items-center space-x-2">
                              <Mail size={12} className="text-[#8A6B20]" />
                              <span>{lead.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone size={12} className="text-[#51DE78]" />
                              <span>{lead.phone}</span>
                              <a
                                href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] bg-[#51DE78]/10 text-emerald-800 hover:bg-[#51DE78]/20 px-1.5 py-0.5 rounded font-bold underline ml-2 inline-flex items-center space-x-0.5"
                              >
                                <span>WhatsApp Setup</span>
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe size={12} className="text-[#8A6B20]" />
                              <span>Residence: <strong>{lead.country}</strong></span>
                            </div>
                          </div>

                          {lead.message && (
                            <div className="bg-white p-2.5 rounded-xl border border-[#ECECE6] text-xs text-[#4E625A] italic mt-2">
                              "{lead.message}"
                            </div>
                          )}

                          <div className="text-[9px] text-gray-400 font-mono">
                            ID: {lead.id}
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
