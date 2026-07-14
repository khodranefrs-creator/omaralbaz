export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  caseType: string;
  urgency: "normal" | "urgent" | "veryUrgent";
  preferredContact: "phone" | "email" | "whatsapp";
  message: string;
}

export interface Article {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  category: string;
  date: string;
  slug: string;
}

