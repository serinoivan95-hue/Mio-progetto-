import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Why from './components/Why';
import Services from './components/Services';
import Acquisition from './components/Acquisition';
import CtaGreen from './components/CtaGreen';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import Team from './components/Team';
import SeparatorImage from './components/SeparatorImage';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-carta text-inchiostro antialiased selection:bg-fuoco selection:text-carta" id="main-container">
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-fuoco px-4 py-2 text-carta font-bold text-xs z-100">
        Vai al contenuto principale
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Why />
        <Services />
        <Acquisition />
        <CtaGreen />
        <CaseStudies />
        <Process />
        <Team />
        <SeparatorImage />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
