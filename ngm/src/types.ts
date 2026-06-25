export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'advertising' | 'content' | 'strategy' | 'technical';
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // fallback UI or beautiful generative placeholders
}

export interface CaseStudy {
  id: string;
  clientName: string;
  sector: string;
  title: string;
  results: {
    label: string;
    value: string;
  }[];
  description: string;
  teamMembers: string[]; // names of team members who worked on it
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}

export interface BookingDay {
  date: string; // YYYY-MM-DD
  slots: BookingSlot[];
}
