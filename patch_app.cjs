const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const newApp = `
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Erp } from './pages/Erp';
import { Portfolio } from './pages/Portfolio';
import { AiLearning } from './pages/AiLearning';
import { Contact } from './pages/Contact';

const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
          <Route path="about" element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
          <Route path="services" element={<PageTransitionWrapper><Services /></PageTransitionWrapper>} />
          <Route path="erp" element={<PageTransitionWrapper><Erp /></PageTransitionWrapper>} />
          <Route path="portfolio" element={<PageTransitionWrapper><Portfolio /></PageTransitionWrapper>} />
          <Route path="learning" element={<PageTransitionWrapper><AiLearning /></PageTransitionWrapper>} />
          <Route path="contact" element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
`;

fs.writeFileSync('src/App.tsx', newApp.trim() + '\n');
