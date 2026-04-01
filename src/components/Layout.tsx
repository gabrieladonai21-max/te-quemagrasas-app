import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7FAF5] flex flex-col">
      <div className="flex-1 w-full max-w-[1400px] mx-auto relative">
        {children}
      </div>
    </div>
  );
};
