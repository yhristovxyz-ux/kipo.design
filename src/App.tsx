import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSProvider, useCMS } from './contexts/CMSContext';
import EditingToolbar from './components/cms/EditingToolbar';
import SectionManager from './components/cms/SectionManager';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import Services from './components/Services';
import Process from './components/Process';
import Studio from './components/Studio';
import Approach from './components/Approach';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import DesignSystemShowcase from './components/DesignSystemShowcase';

function HomePage() {
  const { isEditMode } = useCMS();
  
  return (
    <div className={`min-h-screen ${isEditMode ? 'pt-[60px]' : ''}`}>
      <EditingToolbar />
      <SectionManager />
      <Header />
      <HeroSection />
      <Services />
      <Process />
      <Studio />
      <Approach />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CMSProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/design-system" element={<DesignSystemShowcase />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </CMSProvider>
  );
}

export default App;