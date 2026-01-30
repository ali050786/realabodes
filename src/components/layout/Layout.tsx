import { ReactNode, useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  removeTopPadding?: boolean;
}

export function Layout({ children, removeTopPadding = false }: LayoutProps) {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      }
    });

    return () => {
      scroll.destroy();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${removeTopPadding ? 'pt-0' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
