// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
  const logData = req.body;
  const timestamp = new Date().toISOString();

  const entry = {
    timestamp,
    ...logData
  };

  fs.appendFile('logs.json', JSON.stringify(entry) + ',\n', err => {
    if (err) {
      console.error('Failed to write log:', err);
      return res.status(500).send('Failed to log');
    }
    console.log('Logged:', entry);
    res.send('Logged');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
