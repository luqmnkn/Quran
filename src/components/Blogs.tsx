import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, BookOpen, Quote, Sparkles, ChevronRight } from 'lucide-react';

interface BlogsProps {
  onNavigateHome: () => void;
  onOpenTrialModal: () => void;
}

export default function Blogs({ onNavigateHome, onOpenTrialModal }: BlogsProps) {
  const [selectedBlogId, setSelectedBlogId] = React.useState(1);

  const currentArticle = BLOG_ARTICLES.find((a) => a.id === selectedBlogId) || BLOG_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A1A14] flex flex-col pt-24 md:pt-28 pb-16 relative overflow-hidden">
      {/* Background ambient gold & green blur elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[580px] bg-[#C8A24A]/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-24 left-1/4 w-[500px] h-[500px] bg-[#0A1A14]/3 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow">
        
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

        {/* Dynamic Dual Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Side */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Blog Post Main Article Container */}
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ECECE6] shadow-[0_12px_45px_rgba(10,26,20,0.02)] overflow-hidden">
              
              {/* Article Meta Tags header */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6 text-xs text-[#4E625A] font-semibold">
                <span className="bg-[#FAF6EC] text-[#8A6B20] border border-[#C8A24A]/25 px-3 py-1 rounded-full uppercase tracking-wider font-mono text-[10px]">
                  {currentArticle.category}
                </span>
                <div className="flex items-center space-x-1.5 ml-1">
                  <Calendar size={13} className="text-[#C8A24A]" />
                  <span>{currentArticle.date}</span>
                </div>
                <div className="flex items-center space-x-1.5 border-l border-gray-200 pl-3">
                  <Clock size={13} className="text-[#C8A24A]" />
                  <span>{currentArticle.readTime}</span>
                </div>
              </div>

              {/* Heading */}
              <h1 className="font-display font-[900] text-xl sm:text-3xl lg:text-[38px] text-[#0A1A14] tracking-tight leading-[1.15] mb-5 text-left transition-all duration-300">
                {currentArticle.title}
              </h1>

              {/* Author info tag */}
              <div className="flex items-center space-x-3 pb-6 border-b border-gray-100 mb-8">
                <div className="w-10 h-10 bg-[#0A1A14]/5 rounded-full flex items-center justify-center border border-gray-100 text-[#C8A24A]">
                  <User size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#0A1A14]">{currentArticle.author}</p>
                  <p className="text-[10px] text-[#89A296] font-medium font-mono uppercase tracking-wider">Islamic Academy Board Member</p>
                </div>
              </div>

              {/* Article Body Content */}
              <div className="space-y-6 text-[#2D3E36] font-sans text-sm sm:text-base leading-relaxed text-left">
                {currentArticle.content.map((block, index) => {
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
                        <p className="font-display font-medium text-sm sm:text-base leading-relaxed text-[#ECECE6]">
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

          </div>

          {/* Right Sidebar Menu - "Like a navbar" */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 border border-[#ECECE6] shadow-[0_12px_45px_rgba(10,26,20,0.02)]">
              <h3 className="font-display font-black text-[11px] uppercase tracking-widest text-[#0A1A14] pb-4 mb-4 border-b border-gray-100 flex items-center gap-2">
                <BookOpen size={14} className="text-[#C8A24A]" />
                <span>Quranic Blog Archives</span>
              </h3>
              
              <div className="flex flex-col gap-3">
                {BLOG_ARTICLES.map((item) => {
                  const isCurrent = item.id === selectedBlogId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedBlogId(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-2 group relative cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0A1A14] border-[#0A1A14] text-white shadow-[0_12px_32px_rgba(10,26,20,0.15)] scale-[1.01]'
                          : 'bg-[#FAFAF8] border-[#ECECE6] text-[#4E625A] hover:border-[#C8A24A]/40 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      {/* Category and Read time */}
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isCurrent ? 'bg-white/10 text-[#D8BB72]' : 'bg-[#FAF6EC] text-[#8A6B20]'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-[10px] font-medium font-mono opacity-80">
                          {item.readTime}
                        </span>
                      </div>

                      {/* Blog Title */}
                      <h4 className={`font-display font-[800] text-xs sm:text-sm leading-snug tracking-tight transition-colors ${
                        isCurrent ? 'text-[#D8BB72]' : 'text-[#0A1A14] group-hover:text-[#C8A24A]'
                      }`}>
                        {item.title}
                      </h4>

                      {/* Author & Arrow Indicator */}
                      <div className="flex items-center justify-between mt-1 text-[10px] opacity-85">
                        <span className="font-semibold">{item.author}</span>
                        <ChevronRight size={14} className={`transform transition-transform ${
                          isCurrent ? 'translate-x-1 text-[#D8BB72]' : 'group-hover:translate-x-1 text-[#C8A24A]'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

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
                Apply Tajweed principles live with an expert certified instructor. Access 3 assessment sessions with no strings attached.
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

const BLOG_ARTICLES = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: 'The Memory Palace of the Heart: Cognitive Science Secrets to Memorize Quran 3x Faster',
    excerpt: 'How blending spiritual devotion with cognitive psychology unlocks the ultimate memory retention protocol. Learn the power of Fajr dopamine cycles and spaced repetition.',
    category: 'Hifz Mastery',
    date: 'June 13, 2026',
    readTime: '5 Min Read',
    author: 'Dr. Farhan Al-Mubarak',
    content: [
      {
        type: 'intro',
        text: 'Have you ever wondered why some people memorize verses easily, while others struggle with the same page for hours? The difference is not talent—it is technique. Neuro-cognitive science shows that memorization is a biological path of synaptic connections. When we pair traditional Hifz with brain science, we can dramatically increase retention speed and accuracy while reducing mental fatigue.'
      },
      {
        type: 'subheading',
        text: '1. Unlocking the Fajr Dopamine and Alpha Wave Cycle'
      },
      {
        type: 'paragraph',
        text: 'In the early morning, right after Fajr prayer, the human brain is in a state of high plasticity. With cortisol levels low and alpha waves active, your focus is sharp and distraction-free. Memorizing just 15 minutes during this golden window produces stronger synaptic roots than 2 hours of study at night when the brain is exhausted. The quiet of the morning matches the natural rhythmic flow of the verses, creating a state of deep neural cohesion.'
      },
      {
        type: 'subheading',
        text: '2. The Spaced Repetition (Tafteesh) Strategy'
      },
      {
        type: 'paragraph',
        text: 'Many students memorize a new portion and immediately abandon it, causing rapid memory decay. To prevent this, implement the spaced repetition pattern: review the new page 1 hour after memorization, then 1 day, then 3 days, and finally 1 week later. This sequence forces the hippocampus to retrieve the data repeatedly, signaling to the brain that this knowledge is vital and must be transferred into long-term permanent storage.'
      },
      {
        type: 'quote',
        text: '“Cognitive science proves that memory is not a bucket to fill, but a muscle to train. Reviewing at precise intervals builds pathways that last a lifetime.”'
      },
      {
        type: 'subheading',
        text: '3. The "Visual Anchoring" Hook'
      },
      {
        type: 'paragraph',
        text: 'Our brains are incredibly visual. When memorizing, use the exact same print of the Mushaf. Do not switch between apps and different physical copies. Your brain creates a mental photograph of the page, linking verses to their physical position on the sheet (top-left, center, bottom-right). This visual blueprint acts as an instant search index when you recite by heart.'
      }
    ]
  },
  {
    id: 3,
    title: 'Anatomical Sounds of Quran: Secrets to Perfecting Arabic Letters',
    excerpt: 'Struggling with the deep Arabic sounds like Ayn (ع) or Ha (ح)? Discover physics-based muscle training secret keys to native-level articulation and recite with confidence.',
    category: 'Phonetics & Tajweed',
    date: 'June 12, 2026',
    readTime: '6 Min Read',
    author: 'Ustadha Fatima Al-Zahra',
    content: [
      {
        type: 'intro',
        text: 'For non-native English or European speakers, certain Arabic letters can feel like a physical impossibility. Letters like the throat-deep Ha (ح), throat-friction Ayn (ع), or the heavy Dad (ض) do not exist in Western vocabularies. However, proper articulation of these sounds is not an innate gift of nationality—it is a pure mechanical function of anatomy that anyone can learn with targeted practice.'
      },
      {
        type: 'subheading',
        text: '1. Mapping the Vocal Tract (Makharij)'
      },
      {
        type: 'paragraph',
        text: 'Every sound has a precise starting point in your mouth, throat, or nose. For instance, the letter Ha (ح) comes from the middle of the throat (Wast al-Halq). It is produced by constricting the throat muscles and releasing a warm, clean stream of air—similar to fogging a glass surface. If you feel it in your chest or mouth, the letter is wrong. By learning exactly where to direct the air pressure, you remove the mystery of pronunciation.'
      },
      {
        type: 'subheading',
        text: '2. The "Dad" Tongue-Lock Coordination'
      },
      {
        type: 'paragraph',
        text: 'The heavy Dad (ض) is often called the most unique sound on Earth. It is produced by pressing the left or right side of the tongue against the upper molars while keeping the tip of the tongue loose near the front. If you use the tip of the tongue, it sounds like Da (د) and changes the meaning of the verse. Learning to isolate side tongue muscles is like practicing piano—it takes simple, isolated exercises.'
      },
      {
        type: 'quote',
        text: '“Reciting the Quran with correct Makharij is an act of love and respect for the divine words. It ensures the original intended meaning is preserved exactly as it was revealed.”'
      },
      {
        type: 'subheading',
        text: '3. Breathing Exercises for Perfect Stops'
      },
      {
        type: 'paragraph',
        text: 'Tajweed is closely tied to proper breath management. Running out of breath in the middle of a verse can distort pronunciation. Practice diaphragmatic breathing before recitation. By controlling your support and learning the designated places for stopping (Waqf) and restarting (Ibtida), you will never feel hurried or breathless during long recitation sessions.'
      }
    ]
  },
  {
    id: 4,
    title: 'From Screens to Deen: Keeping Digital Kids Mentally Engaged in Online Hifz',
    excerpt: 'How to use positive gamification, visual progress maps, and reward loops to turn your child’s weekly Quran sessions into their absolute favorite hour.',
    category: 'Digital Parenting',
    date: 'June 11, 2026',
    readTime: '5 Min Read',
    author: 'Sheikh Salim Al-Baqir',
    content: [
      {
        type: 'intro',
        text: 'In an era of high-speed video games and social media apps designed for instant gratification, sitting down to memorize lines from a Holy Book can feel like an uphill battle for children. But the secret is not to ban screens—the secret is to elevate the digital experience of Deen. With the right psychological triggers, parent support, and interactive tools, online Hifz can become the highlight of your child’s week.'
      },
      {
        type: 'subheading',
        text: '1. Establish Interactive Gamified Reward Systems'
      },
      {
        type: 'paragraph',
        text: 'Children crave structural achievement. Instead of pressure, formulate a visual progress map. Create a "Star Chart" or a physical progress ladder indicating Surah milestones. Let them earn customizable rewards after completing a Surah. Celebrate their progress openly with family members. This positive neural association wires their young minds to link Quranic progress with feelings of joy, family pride, and victory.'
      },
      {
        type: 'subheading',
        text: '2. Craft a Dedicated, Beautiful Learning Sanctuary'
      },
      {
        type: 'paragraph',
        text: 'Environment dictates mindset. Do not let your child attend their online Quran session lying in bed or sitting in a chaotic family room. Designate a specific, quiet corner of the house. Add a beautiful rehal (bookstand), a clean prayer rug, and a headset to block ambient noise. When they step into this space, their brain shifts from recreational to spiritual mode, immediately increasing focus during class.'
      },
      {
        type: 'quote',
        text: '“When the learning environment feels special and honored, the child views the knowledge they receive as equal in value and importance.”'
      },
      {
        type: 'subheading',
        text: '3. Partnering with the Tutor for Micro-Victories'
      },
      {
        type: 'paragraph',
        text: 'Communicate with your child’s certified online Sheikh to implement the "Micro-Victory" approach. Instead of asking for a long page, aim to perfect 2 or 3 verses. When a child masters small chunks perfectly, the feeling of accomplishment releases a wave of focus and builds the drive to learn the next set. Small steps, taken consistently, reach the highest peaks.'
      }
    ]
  }
];
