import Hero from "../components/home/Hero.jsx";
import CaseStudies from "../components/home/CaseStudies.jsx";
import Services from "../components/home/Services.jsx";
import Showcase from "../components/home/Showcase.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import Faq from "../components/home/Faq.jsx";
import Contact from "../components/home/Contact.jsx";
import WhereWeWork from "../components/home/WhereWeWork.jsx";
import WhyUs from "../components/home/WhyUs.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Showcase />
      <Services />
      <CaseStudies />
      <Testimonials />
      <WhereWeWork />
      <Faq />
      <Contact />
    </main>
  );
}
