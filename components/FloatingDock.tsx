'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, List } from 'lucide-react';

const FloatingDock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`
        flex items-center justify-center
        bg-black backdrop-blur-md dark:bg-white dark:backdrop-blur-none
        rounded-lg transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-56 h-16' : 'w-16 h-16'}
      `}>
        <Link href="/" className={`
          flex items-center justify-center
          text-white hover:bg-green-500 dark:text-black transition-colors rounded-s-lg
          ${isExpanded ? 'w-1/2 h-full' : 'w-full h-full'}
        `}>
          <Home size={24} />
          {isExpanded && <span className="ml-2">Home</span>}
        </Link>
        {isExpanded && <div className="h-8 w-px bg-gray-600"></div>}
        <Link href="/watchlist" className={`
          flex items-center justify-center
          text-white hover:bg-green-500 dark:text-black transition-colors rounded-e-lg
          ${isExpanded ? 'w-1/2 h-full' : 'hidden'}
        `}>
          <List size={24} />
          <span className="ml-2">Watchlist</span>
        </Link>
      </div>
    </div>
  );
};

export default FloatingDock;