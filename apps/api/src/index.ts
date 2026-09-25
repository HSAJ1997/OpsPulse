import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const monitoredServices = [
  {
    name: 'OpsPulse API',
    url: 'http://localhost:3001/health',
  },
  {
    name: 'Example Website',
    url: 'https://example.com',
  },
];

async function checkService(name: string, url: string) {
  const startTime = Date.now();

  try {
    const response = await fetch(url);

    const responseTime = Date.now() - startTime;

    return {
      name,
      url,
      status: response.ok ? 'online' : 'offline',
      responseTime,
    };
  } catch {
    return {
      name,
      url,
      status: 'offline',
      responseTime: null,
    };
  }
}

app.get('/', (_req, res) => {
  res.send("hi I'm trying to get a job :3");
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'opspulse-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/services', async (_req, res) => {
  const results = await Promise.all(
    monitoredServices.map((service) =>
      checkService(service.name, service.url)
    )
  );

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`OpsPulse API running on http://localhost:${PORT}`);
});