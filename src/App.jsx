import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import SmoothScroll from "./components/layout/SmoothScroll.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import Careers from "./pages/Careers.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";
import Home from "./pages/Home.jsx";
import Journal from "./pages/Journal.jsx";
import Lab from "./pages/Lab.jsx";
import Legal from "./pages/Legal.jsx";
import Method from "./pages/Method.jsx";
import Studio from "./pages/Studio.jsx";

function App() {
  return (
    // The page column fills the screen, so on short pages the footer still sits at the bottom.
    <div className="flex min-h-svh flex-col">
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
