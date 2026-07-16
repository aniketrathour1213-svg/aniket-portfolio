import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import PortfolioSection from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <PortfolioSection />
      <Contact />
      <Footer />
    </main>
  );
}
