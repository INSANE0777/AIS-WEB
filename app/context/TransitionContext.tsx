// src/context/TransitionContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface TransitionContextType {
  isTransitionComplete: boolean;
  setTransitionComplete: (isComplete: boolean) => void;
}

// Create the context
const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

// Create a provider component that will wrap your app
export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitionComplete, setTransitionComplete] = useState(false);

  return (
    <TransitionContext.Provider value={{ isTransitionComplete, setTransitionComplete }}>
      {children}
    </TransitionContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useTransitionState = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransitionState must be used within a TransitionProvider');
  }
  return context;
};