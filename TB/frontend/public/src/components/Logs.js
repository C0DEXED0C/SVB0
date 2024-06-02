import React from 'react';

function Logs({ logs }) {
  return (
    <div className="logs">
      <h2>Logs</h2>
      <pre>{logs}</pre>
    </div>
  );
}

export default Logs;
