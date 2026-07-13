import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { ReactLenis } from 'lenis/react';

import { Helmet } from 'react-helmet-async';

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  '/': { title: 'P2S | Enterprise Digital Transformation', description: 'Award-winning digital agency turning problems into solutions with premium Websites, ERP Software, Mobile Apps, AI, and Digital Marketing.' },
  '/services': { title: 'Services | P2S', description: 'Explore our premium digital services including web development, ERP, AI automation, and digital marketing.' },
  '/erp': { title: 'Cloud ERP | P2S', description: 'Discover our premium cloud-based Enterprise Resource Planning subscription for modern businesses.' },
  '/portfolio': { title: 'Portfolio | P2S', description: 'View our award-winning case studies and successful digital transformation projects.' },
  '/learning': { title: 'AI Learning | P2S', description: 'Learn about the latest in AI, digital trends, and technology innovation from our experts.' },
  '/about': { title: 'About Us | P2S', description: 'Learn about our mission to provide end-to-end digital transformation for modern enterprises.' },
  '/contact': { title: 'Contact Us | P2S', description: 'Get in touch to start your digital transformation journey with P2S.' },
};

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const seo = ROUTE_SEO[location.pathname] || {
    title: 'P2S | Problem To Solution',
    description: 'Premier Digital Transformation Company helping businesses scale through technology.',
  };

  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
        <div className="flex flex-col min-h-screen bg-surface-950 transition-colors duration-500 overflow-x-hidden">
          <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
          </Helmet>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-20">
            <Outlet />
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}
