import React, { useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

const HeroSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && sectionRef.current) {
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Only apply parallax if we're within or above the section
        if (scrollPosition <= sectionTop + sectionHeight) {
          // Move the video at half the scroll speed
          const yOffset = scrollPosition * 0.5;
          videoRef.current.style.transform = `translate(-50%, calc(-50% + ${yOffset}px))`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-slate-900"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 z-10" />
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute min-w-full min-h-full w-auto h-auto max-w-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <source src="assets/videos/bg.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 mb-8 backdrop-blur-sm">
            Beta Release
          </div>
          
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl">
            Effortless Substitution Management for
            <span className="relative whitespace-nowrap text-blue-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-orange-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative"> Youth Sports</span>
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-300">
            Keep every player engaged and ensure equal playtime with
            SubSquad—the ultimate tool for coaches to track active time and
            manage substitutions seamlessly.
          </p>
          
          <div className="mt-10 flex justify-center gap-x-6">
            <a
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white"
              href="/login"
            >
              Get started for free
            </a>
            <a
              className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-white text-white hover:ring-blue-300 active:ring-blue-400 active:text-blue-300 focus-visible:outline-white backdrop-blur-sm"
              href="#features"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;