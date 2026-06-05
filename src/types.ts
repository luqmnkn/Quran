export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  ageGroup: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  learningOutcomes: string[];
  curriculum: string[];
}

export interface InquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  courseInterest: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Enrolled';
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Parent' | 'Adult Student' | 'Student';
  feedback: string;
  rating: number;
  location: string;
  avatarInitials: string;
}

export interface TrustStat {
  value: string;
  label: string;
  description: string;
}
