// AnimatedHamburgerIcon.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedHamburgerIcon = ({ isOpen, onClick }) => {
  const iconRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    const [top, middle, bottom] = Array.from(iconRef.current.children);

    gsap.set([top, middle, bottom], { transformOrigin: '50% 50%' });

    timeline.current = gsap.timeline({ paused: true })
      // Animate middle bar out
      .to(middle, { scaleX: 0, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
      // Move top and bottom bars to center
      .to(top, { y: 8, duration: 0.3, ease: 'power3.inOut' }, 0)
      .to(bottom, { y: -8, duration: 0.3, ease: 'power3.inOut' }, 0)
      // Rotate bars into an X
      .to(top, { rotation: 45, duration: 0.3, ease: 'power3.out' }, 0.2)
      .to(bottom, { rotation: -45, duration: 0.3, ease: 'power3.out' }, 0.2);

  }, []);

  useEffect(() => {
    if (isOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isOpen]);

  return (
    <button
      onClick={onClick}
      className="fixed top-8 left-8 z-50 w-16 h-16 flex items-center justify-center focus:outline-none group"
      aria-label="Toggle Navigation"
    >
      <svg
        ref={iconRef}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="overflow-visible"
      >
        <rect className="top" width="32" height="4" y="4" fill="white" rx="2" />
        <rect className="middle" width="32" height="4" y="14" fill="white" rx="2" />
        <rect className="bottom" width="32" height="4" y="24" fill="white" rx="2" />
      </svg>
    </button>
  );
};

export default AnimatedHamburgerIcon;