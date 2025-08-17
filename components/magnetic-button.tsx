// components/magnetic-button.tsx

"use client";

import { useRef, MouseEvent, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = button.getBoundingClientRect();
    
    // Calculate mouse position relative to the button's center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Animate the entire button. The text inside will now move with it.
    gsap.to(button, {
      x: x * 0.5, // Stronger pull effect
      y: y * 0.5,
      duration: 0.6, // Quicker, smoother response
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    // Animate the button back to its original position with a satisfying spring effect.
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* The children (text) are now direct descendants and will move correctly */}
      {children}
    </button>
  );
}