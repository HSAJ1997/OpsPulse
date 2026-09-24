import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`OpsPulse API running on http://localhost:${PORT}`);
});