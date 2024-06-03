import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Status from './Status';
import Logs from './Logs';
import Controls from './Controls';
import './App.css';

function App() {
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState('');
  const [settings, setSettings] = useState({
    numTransactions: 10,
    txAmount: 0.01,
    txInterval: 60,
    tradingMethod: 'method1',
  });

  const fetchStatus = useCallback(async () => {
    const response = await axios.get('/api/status');
    setStatus(response.data);
  }, []);

  const fetchLogs = useCallback(async () => {
    const response = await axios.get('/api/logs');
    setLogs(response.data);
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchLogs();

    const interval = setInterval(() => {
      fetchStatus();
      fetchLogs();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchStatus, fetchLogs]);

  const stopBot = async () => {
    await axios.post('/stop');
    alert('Bot is stopping...');
    fetchStatus(); // Fetch the status again to update the UI
  };

  const updateSettings = async (newSettings) => {
    setSettings(newSettings);
    await axios.post('/api/update-settings', newSettings);
    alert('Settings updated');
  };

  return (
    <div className="App container">
      <h1 className="text-center">Trading Bot Dashboard</h1>
      <button className="btn btn-primary mb-3" onClick={stopBot}>Stop Bot</button>
      <Controls settings={settings} updateSettings={updateSettings} />
      <Status status={status} />
      <Logs logs={logs} />
    </div>
  );
}

export default App;
