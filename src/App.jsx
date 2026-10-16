import { Route, Routes } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import Careers from './pages/Careers.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Home from './pages/Home.jsx';
import Journal from './pages/Journal.jsx';
import Lab from './pages/Lab.jsx';
import Legal from './pages/Legal.jsx';
import Method from './pages/Method.jsx';
import Studio from './pages/Studio.jsx';

function App() {
  return (
    <>
      <SmoothScroll />
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
    </>
  );
}

export default App;
