'use client';

import React, { useEffect, useState } from 'react';

const getTailwindBreakpoint = (width: number): string => {
  if (width < 640) return 'xs (mobile)';
  if (width < 768) return 'sm (small)';
  if (width < 1024) return 'md (medium)';
  if (width < 1280) return 'lg (large)';
  if (width < 1536) return 'xl (extra-large)';
  return '2xl (extra-extra-large)';
};

const ScreenSizeDetector: React.FC = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [breakpoint, setBreakpoint] = useState<string>(getTailwindBreakpoint(width));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setBreakpoint(getTailwindBreakpoint(newWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-4 right-4 p-4 text-center text-white bg-gray-800 rounded-xl shadow-lg z-50">
      <p className="text-sm font-bold">Width: {width}px</p>
      <p className="text-xs mt-1">Breakpoint: <span className="font-mono">{breakpoint}</span></p>
    </div>
  );
};

export default ScreenSizeDetector;

