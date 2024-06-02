import React from 'react';

function Status({ status }) {
  return (
    <div className="status">
      <h2>Status</h2>
      <p>Running: {status.running ? 'Yes' : 'No'}</p>
      <p>Successful Trades: {status.successfulTrades}</p>
      <p>Failed Trades: {status.failedTrades}</p>
      <p>Total Latency: {status.totalLatency} ms</p>
      <p>Start Time: {new Date(status.startTime).toLocaleString()}</p>
    </div>
  );
}

export default Status;
