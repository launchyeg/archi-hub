import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import Careers from './pages/Careers.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Home from './pages/Home.jsx';
import Journal from './pages/Journal.jsx';
import Lab from './pages/Lab.jsx';
import Legal from './pages/Legal.jsx';
import Method from './pages/Method.jsx';
import Studio from './pages/Studio.jsx';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SmoothScroll />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/method" element={<Method />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
