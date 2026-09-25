import { useEffect, useState } from 'react';
import './App.css';
import StatusCard from './components/StatusCard';

type Service = {
  name: string;
  url: string;
  status: string;
  responseTime: number | null;
};

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState(false);

  async function checkServices() {
    try {
      setError(false);

      const response = await fetch('http://localhost:3001/services');

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: Service[] = await response.json();

      setServices(data);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    checkServices();
  }, []);

  return (
    <main>
      <h1>OpsPulse</h1>
      <p>Service monitoring and incident intelligence.</p>

      <h2>Service Status</h2>

      <button onClick={checkServices}>
        Refresh Services
      </button>

      {error && <p>Unable to connect to OpsPulse API 🔴</p>}

      {!error && services.length === 0 && (
        <p>Checking services...</p>
      )}

      {services.map((service) => (
        <StatusCard
          key={service.url}
          name={service.name}
          url={service.url}
          status={service.status}
          responseTime={service.responseTime}
        />
      ))}
    </main>
  );
}

export default App;