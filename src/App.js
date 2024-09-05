import { useState, useEffect } from 'react';
import Header from './components/Header';
import Jackpot from './components/Jackpot';
import Ticket from './components/Ticket';

function App() {
  // Initialize jackpot from localStorage if it exists, else default to 0
  const [jackpot, setJackpot] = useState(() => {
    const storedJackpot = localStorage.getItem("jackpot");
    return storedJackpot ? parseInt(storedJackpot, 10) : 0;
  });

  // Save jackpot to localStorage whenever the jackpot changes
  useEffect(() => {
    if (jackpot !== null) {
      localStorage.setItem("jackpot", jackpot.toString());
    }
  }, [jackpot]);

  return (
    <div>
      <Header jackpot={jackpot} />
      <Jackpot jackpot={jackpot} setJackpot={setJackpot} />
      <Ticket />
    </div>
  );
}

export default App;
