'use client';

import Hero from '@/components/public/Hero';
import AboutSection from '@/components/public/AboutSection';
import ServicesSection from '@/components/public/ServicesSection';
import DifferentialsSection from '@/components/public/DifferentialsSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import FaqSection from '@/components/public/FaqSection';
import ContactSection from '@/components/public/ContactSection';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <DifferentialsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
