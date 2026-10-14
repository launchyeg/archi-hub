import { useState } from 'react';
import AboutSection from '../components/home/AboutSection.jsx';
import ClientVoicesSection from '../components/home/ClientVoicesSection.jsx';
import ContactSection from '../components/home/ContactSection.jsx';
import DeliverSection from '../components/home/DeliverSection.jsx';
import FaqSection from '../components/home/FaqSection.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import LabPreviewSection from '../components/home/LabPreviewSection.jsx';
import WhereWeWorkSection from '../components/home/WhereWeWorkSection.jsx';
import WhySection from '../components/home/WhySection.jsx';

export default function Home() {
  const [need, setNeed] = useState(undefined);

  return (
    <main>
      <HeroSection onStartProject={() => setNeed('inquiry')} />
      <AboutSection />
      <WhySection />
      <DeliverSection />
      <LabPreviewSection />
      <ClientVoicesSection />
      <WhereWeWorkSection />
      <FaqSection />
      <ContactSection need={need} />
    </main>
  );
}
