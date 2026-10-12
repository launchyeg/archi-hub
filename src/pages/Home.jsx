import FeaturedProject from '../components/FeaturedProject.jsx';
import HomeHero from '../components/HomeHero.jsx';
import StartProjectBand from '../components/StartProjectBand.jsx';
import TrustStrip from '../components/TrustStrip.jsx';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FeaturedProject />
      <TrustStrip />
      <StartProjectBand />
    </main>
  );
}
