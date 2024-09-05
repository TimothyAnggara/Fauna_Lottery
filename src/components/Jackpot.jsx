import React, { useState } from 'react';

export default function Jackpot({ jackpot, setJackpot }) {
  const [increaseValue, setIncreaseValue] = useState(0); // Local state to track input value
  const [decreaseValue, setDecreaseValue] = useState(0); // Local state to track input value

  // Function to increase the jackpot
  const handleIncrease = () => {
    setJackpot(jackpot + Number(increaseValue));
    setIncreaseValue(0);
  };

  // Function to decrease the jackpot
  const handleDecrease = () => {
    setJackpot(jackpot - Number(decreaseValue));
    setDecreaseValue(0);
  };

  // Function to reset the jackpot to 0
  const handleReset = () => {
    setJackpot(0);
  };

  return (
    <div className="w-full max-w-md mx-auto pt-8">
      {/* Input field for increasing jackpot */}
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={increaseValue}
          onChange={(e) => setIncreaseValue(e.target.value)}
          placeholder="Enter amount"
          className="w-1/4 px-2 py-1 border border-gray-300 rounded"
        />
        <button
          onClick={handleIncrease}
          className="w-3/4 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increase Jackpot
        </button>
      </div>
      
      {/* Input field for decreasing jackpot */}
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={decreaseValue}
          onChange={(e) => setDecreaseValue(e.target.value)}
          placeholder="Enter amount"
          className="w-1/4 px-2 py-1 border border-gray-300 rounded"
        />
        <button
          onClick={handleDecrease}
          className="w-3/4 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrease Jackpot
        </button>
      </div>

      {/* Button to reset jackpot */}
      <div>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Jackpot
        </button>
      </div>
    </div>
  );
}
