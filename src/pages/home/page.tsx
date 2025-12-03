import { useState } from 'react';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Categories from './components/Categories';
import FeaturedArticles from './components/FeaturedArticles';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Mission />
      <Categories />
      <FeaturedArticles />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}