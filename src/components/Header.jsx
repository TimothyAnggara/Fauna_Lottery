import React from 'react';

 function Header({jackpot}){
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Green Top Bar */}
      <div className="bg-green-500 w-full h-16" />
      
      {/* White background and Text */}
      <div className="bg-white px-4 py-2 rounded-b-md flex flex-col items-center justify-center">
          <span className="font-bold text-sky-500">FaunaMart</span>
          <span className="font-bold text-yellow-400">WIN BIG JACKPOTS</span>
          <span className="font-bold text-yellow-400">Current Jackpot: {jackpot}</span>
      </div>
      <div className="bg-sky-400 w-full h-16" />
    </div>
  );
};

export default Header;
