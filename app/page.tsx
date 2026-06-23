import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBand />
      <Services />
      <HowWeWork />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  );
}
