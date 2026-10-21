import React, { useEffect, useRef, useState } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({ children, className = '', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Default true for zero-latency/fallback safety, then animate on observe if supported

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check if element is initially below the fold
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.92) {
      setIsVisible(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`reveal-section ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
};
