import express from 'express';
import bodyParser from 'body-parser';
import { interactWithContract } from './interact_with_contract';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/status', async (req, res) => {
  res.send({ status: isRunning ? 'running' : 'stopped' });
});

app.get('/api/logs', (req, res) => {
  res.send('Logs will be here');
});

app.post('/stop', (req, res) => {
  isRunning = false;
  res.send('Bot is stopping...');
});

app.post('/api/update-settings', (req, res) => {
  settings = req.body;
  res.send('Settings updated');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  interactWithContract(); // Start the bot
});
