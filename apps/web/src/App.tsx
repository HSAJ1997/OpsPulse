import { useEffect, useState } from 'react';

type ApiHealth = {
  status: string;
  service: string;
  timestamp: string;
};

function App() {
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function checkApi() {
      try {
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

    checkApi();
  }, []);

  return (
    <main>
      <h1>OpsPulse</h1>
      <p>Service monitoring and incident intelligence.</p>

      <h2>Backend Status</h2>

      {error && <p>Backend offline 🔴</p>}

      {!error && !health && <p>Checking backend...</p>}

      {health && (
        <div>
          <p>Backend online 🟢</p>
          <p>Service: {health.service}</p>
          <p>Status: {health.status}</p>
          <p>Last checked: {health.timestamp}</p>
        </div>
      )}
    </main>
  );
}

export default App;