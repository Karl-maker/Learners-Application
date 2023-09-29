"use client"

import React, { createContext, useEffect, useState, useContext } from 'react';
import values from './config';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface ScreenSizeContextType {
  screenSize: ScreenSize;
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

interface ScreenSizeProviderProps {
  children: React.ReactNode;
}

const getScreenSize = (): ScreenSize => {
    if (window.innerWidth < values.screen.sizes.mobile) {
      return 'mobile';
    } else if (window.innerWidth < values.screen.sizes.tablet) {
      return 'tablet';
    } else {
      return 'desktop';
    }
};

const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    // Update the screen size when the window is resized
    window.addEventListener('resize', handleResize);
    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setScreenSize(getScreenSize());
  };

  return (
    <ScreenSizeContext.Provider value={{ screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};

export { ScreenSizeProvider, useScreenSize };
