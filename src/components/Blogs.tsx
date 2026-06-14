import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, BookOpen, Quote, Sparkles, ChevronRight } from 'lucide-react';

interface BlogsProps {
  onNavigateHome: () => void;
  onOpenTrialModal: () => void;
}

export default function Blogs({ onNavigateHome, onOpenTrialModal }: BlogsProps) {
  const article = {
    title: 'The Divine Rhythm: Why 1-on-1 Tajweed Mentorship Accelerates Quran Memorization',
    excerpt: 'Discover how personalized corrective feedback from a certified tutor transforms learning speeds, builds lifelong pronunciation accuracy, and fosters deep spiritual connection.',
    category: 'Quranic Insights',
    date: 'June 14, 2026',
    readTime: '4 Min Read',
    author: 'Sheikh Ahmad Al-Sayed',
    content: [
      {
        type: 'intro',
        text: 'For centuries, the traditional transmission of the Holy Quran has relied on oral recitation from master to disciple. In our modern digital landscape, this timeless methodology remains the most effective, safe, and nurturing environment for students seeking Tajweed absolute mastery. Quran memorization (Hifz) is not merely about verbal repetition—it is the fine art of internalizing divine pronunciation and rhythm.'
      },
      {
        type: 'subheading',
        text: '1. Instant Corrective Auditory Feedback'
      },
      {
        type: 'paragraph',
        text: 'When a student learns the Quran on their own or through prerecorded videos, subtle mistakes in the points of articulation (Makharij) and the rules of elongation or nasalization (Ghunnah) often go undetected. Over time, these mistakes get reinforced in the auditory memory, making them extremely difficult to correct later. A live 1-on-1 certified Quran teacher catches these deviation points instantly, helping the student adapt and recalibrate immediately.'
      },
      {
        type: 'subheading',
        text: '2. Psychological Safety and Tailored Pacing'
      },
      {
        type: 'paragraph',
        text: 'In a group setting, students can feel self-conscious or rushed, leading to anxiety and shallow retention. 1-on-1 sessions create a secure personal sanctuary. Whether a child requires extra patience to master the basic symbols of Noorani Qaida, or an adult aims to perfect the intricate rules of stops (Waqf) in advanced Surahs, the certified Sheikh tailors the tempo exactly to their capacity, building pure confidence.'
      },
      {
        type: 'quote',
        text: '“Prophet Muhammad (ﷺ) said: ‘The best among you are those who learn the Quran and teach it.’ Proper learning requires active listening and recitation under master mentorship.”'
      },
      {
        type: 'subheading',
        text: '3. Establishing the Rhythm of Consistency'
      },
      {
        type: 'paragraph',
        text: 'Consistency is the primary secret of retention. Having a scheduled, live interaction with a dedicated mentor who expects your recitation instills healthy accountability. Our students experience a 3x higher program completion and memorization rate compared to self-paced learners simply because of the positive human connection established with their native tutor.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A1A14] flex flex-col pt-24 md:pt-28 pb-16 relative overflow-hidden">
      {/* Background ambient gold & green blur elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[580px] bg-[#C8A24A]/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-24 left-1/4 w-[500px] h-[500px] bg-[#0A1A14]/3 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow">
        
        {/* Navigation Breadcrumb back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4E625A] hover:text-[#C8A24A] transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home Page</span>
        </motion.button>

        {/* Blog Post Main Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ECECE6] shadow-[0_12px_45px_rgba(10,26,20,0.02)] overflow-hidden">
          
          {/* Article Meta Tags header */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6 text-xs text-[#4E625A] font-semibold">
            <span className="bg-[#FAF6EC] text-[#8A6B20] border border-[#C8A24A]/25 px-3 py-1 rounded-full uppercase tracking-wider font-mono text-[10px]">
              {article.category}
            </span>
            <div className="flex items-center space-x-1.5 ml-1">
              <Calendar size={13} className="text-[#C8A24A]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-1.5 border-l border-gray-200 pl-3">
              <Clock size={13} className="text-[#C8A24A]" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-[900] text-2xl sm:text-3.5xl lg:text-[40px] text-[#0A1A14] tracking-tight leading-[1.15] mb-5 text-left"
          >
            {article.title}
          </motion.h1>

          {/* Author info tag */}
          <div className="flex items-center space-x-3 pb-6 border-b border-gray-100 mb-8">
            <div className="w-10 h-10 bg-[#0A1A14]/5 rounded-full flex items-center justify-center border border-gray-100 text-[#C8A24A]">
              <User size={18} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[#0A1A14]">{article.author}</p>
              <p className="text-[10px] text-[#89A296] font-medium font-mono uppercase tracking-wider">Islamic Academy Board Member</p>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="space-y-6 text-[#2D3E36] font-sans text-sm sm:text-base leading-relaxed text-left">
            {article.content.map((block, index) => {
              if (block.type === 'intro') {
                return (
                  <p key={index} className="text-base sm:text-lg text-[#0A1A14] font-medium leading-relaxed italic border-l-2 border-[#C8A24A] pl-4">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'subheading') {
                return (
                  <h3 key={index} className="font-display font-black text-lg sm:text-xl text-[#0a1a14] pt-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]"></span>
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'quote') {
                return (
                  <div key={index} className="bg-[#0A1A14]/95 text-white p-6 sm:p-8 rounded-2xl border-l-[4px] border-[#C8A24A] my-8 relative">
                    <Quote className="absolute top-4 right-4 text-[#C8A24A]/20 transform rotate-180" size={48} />
                    <p className="font-display font-bold text-sm sm:text-base leading-relaxed text-[#ECECE6]">
                      {block.text}
                    </p>
                  </div>
                );
              }
              return (
                <p key={index} className="text-sm sm:text-[15px] text-[#4E625A] leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Share / Bookmark row */}
          <div className="border-t border-gray-100 mt-10 pt-6 flex justify-between items-center text-xs text-[#89A296]">
            <span className="font-mono uppercase tracking-wider font-medium">Quranic Pedagogy Series</span>
            <span className="font-medium flex items-center gap-1">
              <BookOpen size={12} className="text-[#C8A24A]" />
              Verified Authentic Content
            </span>
          </div>

        </article>

        {/* Dedicated trial call to action for the blog reader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-gradient-to-br from-[#0A1A14] via-[#0E281F] to-[#0A1A14] rounded-3xl p-8 sm:p-10 border border-[#C8A24A]/30 text-white relative overflow-hidden shadow-xl"
        >
          {/* Subtle background Quranic/Gold theme glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#C8A24A]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between text-left gap-6">
            <div className="max-w-xl space-y-2">
              <span className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#D8BB72] font-mono">
                <Sparkles size={11} className="animate-pulse text-[#D8BB72]" />
                <span>Immediate Engagement Opportunity</span>
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                Experience the 1-on-1 Advantage For Free
              </h2>
              <p className="text-xs sm:text-sm text-[#A6C0B5] leading-relaxed">
                Apply Tajweed principles live with an expert native Arab Sheikh. Access 3 assessment sessions with no strings attached.
              </p>
            </div>
            
            <button
              onClick={onOpenTrialModal}
              className="px-6 py-4 bg-gradient-to-r from-[#C29A3E] to-[#D8BB72] hover:from-[#D1AC52] hover:to-[#EAD08D] text-[#0A1A14] font-display font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_12px_28px_rgba(200,162,74,0.25)] transition-all hover:scale-[1.02] cursor-pointer shrink-0 inline-flex items-center justify-center space-x-1.5"
            >
              <span>Book Your Free Trial</span>
              <ChevronRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
