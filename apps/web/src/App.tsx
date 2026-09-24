import { useEffect, useState } from 'react';
import './App.css';
import StatusCard from './components/StatusCard';

type ApiHealth = {
  status: string;
  service: string;
  timestamp: string;
};

function App() {
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [error, setError] = useState(false);

  async function checkApi() {
    try {
      setError(false);

      const response = await fetch('http://localhost:3001/health');

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: ApiHealth = await response.json();

      setHealth(data);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    checkApi();
  }, []);

  return (
    <main>
      <h1>OpsPulse</h1>
      <p>Service monitoring and incident intelligence.</p>
      <h2>Backend Status</h2>

      <button className="refresh-button" onClick={checkApi}>
        Refresh Status
      </button>

      {error && <p>Backend offline 🔴</p>}

      {!error && !health && <p>Checking backend...</p>}

      {health && (
        <StatusCard
          service={health.service}
          status={health.status}
          timestamp={health.timestamp}
        />
      )}
    </main>
  );
}

export default App;