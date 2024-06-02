import React, { useState } from 'react';

function Controls({ settings, updateSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(localSettings);
  };

  return (
    <div className="controls">
      <h2>Bot Controls</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Transactions:
          <input
            type="number"
            name="numTransactions"
            value={localSettings.numTransactions}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Transaction Amount (SOL):
          <input
            type="number"
            name="txAmount"
            value={localSettings.txAmount}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Transaction Interval (seconds):
          <input
            type="number"
            name="txInterval"
            value={localSettings.txInterval}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Trading Method:
          <select
            name="tradingMethod"
            value={localSettings.tradingMethod}
            onChange={handleChange}
            className="form-control"
          >
            <option value="method1">Continuous</option>
            <option value="method2">Random</option>
            <option value="method3">Simultaneous</option>
          </select>
        </label>
        <br />
        <button type="submit" className="btn btn-primary">Update Settings</button>
      </form>
    </div>
  );
}

export default Controls;
