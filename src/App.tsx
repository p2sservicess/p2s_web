/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Preloader } from './components/Preloader';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AISolutionAssistant } from './components/AISolutionAssistant';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Home } from './pages/Home';
import { Packages } from './pages/Packages';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Scroll to top helper & SEO Title Updater component
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Dynamic SEO Metadata & Title setup
    switch (location.pathname) {
      case '/':
        document.title = 'P2S - Problem To Solution | Digital Growth Agency & Software';
        break;
      case '/packages':
        document.title = 'Social Media Growth Packages & Pricing | P2S Agency';
        break;
      case '/services':
        document.title = 'Custom ERP, Software & Digital Services | P2S Agency';
        break;
      case '/contact':
        document.title = 'Contact & Project Estimator | P2S - Problem To Solution';
        break;
      default:
        document.title = 'P2S - Problem To Solution Web Application';
    }
  }, [location]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

// Main Animated App Routes Component
const AnimatedRoutes: React.FC<{ onOpenAiAssistant: () => void }> = ({ onOpenAiAssistant }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home onOpenAiAssistant={onOpenAiAssistant} />
            </PageWrapper>
          }
        />
        <Route
          path="/packages"
          element={
            <PageWrapper>
              <Packages />
            </PageWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <PageWrapper>
              <Services />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const handleReplayPreloader = () => {
    setShowPreloader(true);
  };

  return (
    <BrowserRouter>
      {/* Step 1: Animated Welcome Splash Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Step 2: Dynamic Animated Canvas Particle Background */}
      <AnimatedBackground />

      {/* Main Layout Wrap */}
      <div className="relative min-h-screen flex flex-col justify-between z-10 selection:bg-[#2589D0]/30 selection:text-[#2589D0]">
        
        {/* Step 3: Navigation Header */}
        <Navbar
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          onReplayPreloader={handleReplayPreloader}
        />

        {/* Page Routing Architecture with AnimatePresence & PageWrapper */}
        <main className="flex-grow">
          <AnimatedRoutes onOpenAiAssistant={() => setIsAiAssistantOpen(true)} />
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Solution Finder Modal */}
        <AISolutionAssistant
          isOpen={isAiAssistantOpen}
          onClose={() => setIsAiAssistantOpen(false)}
        />

        {/* Floating Dynamic WhatsApp Widget */}
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
