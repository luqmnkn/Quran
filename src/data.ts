import { Course, Testimonial, TrustStat } from './types';

export const COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida Basics',
    arabicTitle: 'القاعدة النورانية',
    shortDescription: 'The foundational course for beginners to learn Arabic letters, correct pronunciation (Makharij), and basic reading rules.',
    fullDescription: 'This course is the gateway to reading the Quran. Designed for children who are starting from scratch and adults who want to correct their pronunciation. Using the world-renowned Noorani Qaida syllabus, we teach you letter shapes, connections, vowel sounds (Harakat), and the foundational phonetic elements needed to recite Quranic verses with confidence.',
    icon: 'BookOpen',
    ageGroup: 'Kids (4+) & Adults',
    duration: '2-3 Months (Based on pace)',
    level: 'Beginner',
    learningOutcomes: [
      'Recognize and pronounce all 28 Arabic letters in their individual and compound forms.',
      'Master the correct articulation points (Makharij) of each sound.',
      'Understand basic signs like Fatha, Kasra, Damma, Tanween, and Madd.',
      'Learn how to join letters to form correct words and short phrases.',
      'Develop reading speed, rhythm, and structural word recognition.'
    ],
    curriculum: [
      'Lesson 1-5: Alphabet, Makharij, and Letter Shapes',
      'Lesson 6-9: Vowels (Harakat) and Tanween (Double Vowels)',
      'Lesson 10-12: Standing Vowels (Maddah) and Joint Letters',
      'Lesson 13-15: Jazm, Tashdeed (Doubled Letters), and Silent Letters',
      'Lesson 16-17: Comprehensive exercises reading actual Quranic phrases'
    ]
  },
  {
    id: 'quran-reading',
    title: 'Quran Recitation & Reading',
    arabicTitle: 'تلاوة القرآن الكريم',
    shortDescription: 'Learn to read the Holy Quran fluently and smoothly. Ideal for students who finished Qaida and want to read the entire Quran.',
    fullDescription: 'For those who have completed the Noorani Qaida or possess basic reading skills, this course guides students step-by-step through reading the actual Quranic text. Our teachers observe your reading, gently pointing out pronunciation gaps, pacing issues, and grammatical pauses, molding your recitation until you can navigate any Surah independently and beautifully.',
    icon: 'Book',
    ageGroup: 'All age groups',
    duration: '6-12 Months (Ongoing)',
    level: 'Intermediate',
    learningOutcomes: [
      'Read Quranic verses directly from the Mushaf at a comfortable, natural pace.',
      'Apply primary reading connectors, sentence pause signs (Waqf) correctly.',
      'Build vocabulary of high-frequency Quranic terms and expressions.',
      'Read Surahs with correct posture, respect, and devotional mindfulness.',
      'Eliminate stuttering and hesitations by developing natural word recognition.'
    ],
    curriculum: [
      'Recitation of Juz Amma (30th Chapter) with continuous assessment',
      'Special focus on transition words and complex phonetic combinations',
      'Systematic progression into longer chapters (Surah Al-Baqarah, etc.)',
      'Practical training on stopping rules and breath management during recitation',
      'Daily feedback log specifying words practiced and verses assigned'
    ]
  },
  {
    id: 'tajweed',
    title: 'Tajweed al Quran',
    arabicTitle: 'قواعد التجويد',
    shortDescription: 'Master the rules of Tajweed to recite the Holy Quran exactly the way it was revealed to Prophet Muhammad (PBUH).',
    fullDescription: 'Tajweed refers to pronouncing each letter with its proper rights and characteristics. This advanced course details rules like Noon Sakinah & Tanween, Meem Sakinah, Mudood (elongation), and heavy/light letters. Highly recommended for students who can already read the Quran but want to bring professional melody, precision, and excellence to their recitation.',
    icon: 'Award',
    ageGroup: 'Ages 8+ to Adults',
    duration: '4-6 Months',
    level: 'Advanced',
    learningOutcomes: [
      'Understand the semantic and physical rules of Tajweed theoretically and practically.',
      'Correctly apply Izhar, Idghaam, Iqlaab, and Ikhfaa during active recitation.',
      'Master the types of Madd (Elongations) and calculate their respective lengths.',
      'Read with authentic classical Arabic vocal style (Tarteel).',
      'Differentiate between soft-sounding and deep-resonant (Tafkheem/Tarqeeq) letters.'
    ],
    curriculum: [
      'Module 1: Definition of Tajweed, Makharij refresher, and Sifaat (Attributes)',
      'Module 2: Rules of Noon Sakinah, Tanween, and Meem Sakinah',
      'Module 3: Rules of Laam, Idghaam types, and Ghunnah features',
      'Module 4: Mudood (Elongations) and its 6 major sub-categories',
      'Module 5: Stop signs (Waqf), starting rules, and final validation projects'
    ]
  },
  {
    id: 'memorization',
    title: 'Quran Memorization (Hifz)',
    arabicTitle: 'حفظ القرآن الكريم',
    shortDescription: 'A structured, personalized plan to memorize the Quran with expert guidance, periodic revision, and spiritual support.',
    fullDescription: 'Become a Hafiz of the Quran under the systematic instruction of our teachers. We build a highly individualized daily Hifz schedule. Every session is split into three phases: Sabaq (new memorization), Sabqi (recent revision to reinforce short-term memory), and Manzil (old revision to guard long-term retention). We keep classes encouraging and structured to avoid mental fatigue.',
    icon: 'Brain',
    ageGroup: 'Ages 6+ & Adults',
    duration: 'Custom (1 to 3 Years)',
    level: 'All Levels',
    learningOutcomes: [
      'Memorize selected Surahs, particular Juzs, or the complete Quran.',
      'Establish a resilient retaining circle (Manzil) to prevent forgetting past lessons.',
      'Build supreme mental discipline, focus, and memory structures.',
      'Understand the general themes and spiritual rewards of the Surahs memorized.',
      'Recite memorized verses fluently by heart without looking at the Mushaf.'
    ],
    curriculum: [
      'Sabaq: Daily recitation and memorization of a designated number of new verses',
      'Sabqi: Daily review of the past 10-15 lessons memorized to cement recall',
      'Manzil: Daily massive review of older memorized chapters supporting retention',
      'Monthly revision exams and live recitation evaluation',
      'Spiritual mentorship lessons on patience, sincerity, and applying Quranic life lessons'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Rahman',
    role: 'Parent',
    feedback: 'Both my 7-year-old and 9-year-old started Quranic learning from scratch with QuranRise. The teachers are incredibly patient, warm, and encourage children. Their Noorani Qaida sessions are interactive, and the flexible schedule matches my active calendar seamlessly.',
    rating: 5,
    location: 'Houston, USA',
    avatarInitials: 'SR'
  },
  {
    id: 't2',
    name: 'Dr. Tariq Mahmood',
    role: 'Adult Student',
    feedback: 'As a busy medical professional, finding time for continuous Tajweed improvement was difficult. QuranRise matched me with a certified, highly learned tutor. The live one-on-one session feels focused and high-yield, correcting pronunciation rules that I had struggled with for years.',
    rating: 5,
    location: 'Birmingham, UK',
    avatarInitials: 'TM'
  },
  {
    id: 't3',
    name: 'Amina Al-Farsi',
    role: 'Parent',
    feedback: 'QuranRise has transformed our homeschooling routine. My daughter is doing Quran Memorization (Hifz) with a qualified female tutor. The teacher utilizes highly engaging techniques, breaking verses down into memorable rhythmic blocks. The progress tracking dashboard keeps me informed weekly.',
    rating: 5,
    location: 'Toronto, Canada',
    avatarInitials: 'AF'
  },
  {
    id: 't4',
    name: 'Omar Khayyam',
    role: 'Adult Student',
    feedback: 'I had been looking for online classes where I could study Quran recitation with correct Makharij. The teachers here are amazing. They listen attentively, correct my rhythm instantly, and provide very clear guidance. Highly recommend to anyone seeking deep Tajweed instruction.',
    rating: 5,
    location: 'Sydney, Australia',
    avatarInitials: 'OK'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Certified Expert Tutors',
    description: 'Learn from highly qualified, certified educators who have graduated from prestigious Islamic institutions and hold authorized chains of recitation (Ijazah).',
    icon: 'ShieldCheck'
  },
  {
    title: 'Live 1-on-1 Sessions',
    description: 'Get focused attention with personal classes customized around your learning speed, unique strengths, and continuous educational goals.',
    icon: 'UserCheck'
  },
  {
    title: 'Flexible scheduling 24/7',
    description: 'Pick your preferred days and timings. Change or reschedule classes to coordinate elegantly with busy school, work, or family schedules.',
    icon: 'CalendarDays'
  },
  {
    title: 'Male & Female Teachers',
    description: 'We prioritize comfort and ease by offering children and adults the choice between dedicated male and experienced female Quran tutors.',
    icon: 'Users'
  },
  {
    title: 'Affordable & High Quality',
    description: 'No hidden registration fees or long commitments. Transparent, competitive packages structured to keep online Quran studies accessible to everyone.',
    icon: 'CheckCircle'
  },
  {
    title: 'Weekly Progress Reports',
    description: 'Parents stay fully briefed with automated progress logs outlining verses memorized, points of improvement, and attendance metrics.',
    icon: 'TrendingUp'
  }
];

export const FAQS = [
  {
    question: 'How do the live classes work?',
    answer: 'Classes are conducted live over secure, stable video platforms like Zoom, Google Meet, or Skype. It is a one-on-one virtual classroom containing only the student and the certified tutor. The teacher shares screens to trace lessons, speaks clearly, and observes correct articulation live.'
  },
  {
    question: 'Are there separate female teachers for girls and female students?',
    answer: 'Yes, absolutely. We have a dedicated roster of highly qualified, certified female Quran teachers. Female students of all ages can request a female teacher when booking their free trial.'
  },
  {
    question: 'What are the required ages to start learning?',
    answer: 'We accept young students starting from 4 years old (for basic Noorani Qaida lessons) up to adults of any age. Content and training methodologies are carefully tailored for kids versus adults.'
  },
  {
    question: 'Can I choose my own schedule/timings?',
    answer: 'Yes! That is one of our primary value propositions. You can select your preferred days (weekday or weekend slots) and times. Our global instructors operate around the clock, so we can support lessons smoothly in any time zone.'
  },
  {
    question: 'How long are the online classes?',
    answer: 'Standard sessions are 30 minutes long. This keeps kids fully engaged without fatigue. However, adults or advanced students can opt for longer 45-minute or 60-minute classes based on interest.'
  },
  {
    question: 'How do I start the Free Trial class?',
    answer: "It is simple! Just fill out the Inquiry / Free Trial form on our website with your contact info. Our coordinator will contact you via WhatsApp or Email within 24 hours to schedule your student's first free trial lesson at a convenient time."
  }
];

export const TRUST_STATS: TrustStat[] = [
  { value: '15+', label: 'Years Experience', description: 'Delivering exceptional Islamic and Qur’anic teaching to international students.' },
  { value: '25,000+', label: 'Classes Completed', description: 'Successful live one-on-one sessions taught by our top-ranking certified tutors.' },
  { value: '98%', label: 'Student Satisfaction', description: 'Loved and recommended by international parents, children, and adult scholars.' },
  { value: '100%', label: 'Certified Educators', description: 'Instructors holding legitimate general degrees, Hifz certificates, and verified Ijazah.' }
];
