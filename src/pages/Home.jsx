import Hero from "../components/home/Hero.jsx";
import CaseStudies from "../components/home/CaseStudies.jsx";
import Services from "../components/home/Services.jsx";
import Showcase from "../components/home/Showcase.jsx";
import WhyUs from "../components/home/WhyUs.jsx";

export default function Home() {
  return (
    // The gap between sections lives here, so adding a section never doubles the space.
    <main className="flex flex-col gap-24 pb-24 md:gap-40 md:pb-40">
      <Hero />
      <WhyUs />
      <Showcase />
      <Services />
      <CaseStudies />
    </main>
  );
}
