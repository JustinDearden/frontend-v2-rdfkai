// src/contexts/ApplicationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Application } from '../types';

interface ApplicationContextValue {
  application: Application | null;
  setApplication: (app: Application | null) => void;
}

const ApplicationContext = createContext<ApplicationContextValue | undefined>(
  undefined,
);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [application, setApplication] = useState<Application | null>(null);

  return (
    <ApplicationContext.Provider value={{ application, setApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      'useApplication must be used within an ApplicationProvider',
    );
  }
  return context;
};
