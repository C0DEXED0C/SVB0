import React, { useState } from 'react';
import axios from 'axios';

function ContractManager({ networks }) {
  const [network, setNetwork] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [holders, setHolders] = useState([]);
  const [excludeAddresses, setExcludeAddresses] = useState([]);
  const [status, setStatus] = useState('');
  const [earnings, setEarnings] = useState(0);
  const [excludeAddress, setExcludeAddress] = useState('');

  const handleNetworkChange = (e) => {
    setNetwork(e.target.value);
    setStatus('');
    setHolders([]);
    setContractAddress('');
    setExcludeAddresses([]);
  };

  const handleAddContract = async () => {
    if (!network || !contractAddress) {
      setStatus('Please select a network and enter a contract address.');
      return;
    }

    try {
      const response = await axios.post('/api/add-contract', { network, contractAddress });
      setStatus(response.data.message);
      setHolders([]);
      setExcludeAddresses([]);
    } catch (error) {
      setStatus('Error adding contract');
    }
  };

  const fetchHolders = async () => {
    if (!contractAddress) {
      setStatus('Please enter a contract address.');
      return;
    }

    try {
      const response = await axios.get('/api/fetch-holders', { params: { network, contractAddress } });
      setHolders(response.data.holders);
      setStatus('Holders fetched successfully');
    } catch (error) {
      setStatus('Error fetching holders');
    }
  };

  const handleDistribute = async () => {
    try {
      await axios.post('/api/distribute-earnings', { network, contractAddress, earnings, excludeAddresses });
      setStatus('Earnings distributed successfully');
    } catch (error) {
      setStatus('Error distributing earnings');
    }
  };

  const handleAddExcludeAddress = () => {
    if (excludeAddress) {
      setExcludeAddresses([...excludeAddresses, excludeAddress]);
      setExcludeAddress('');
    }
  };

  return (
    <div>
      <h2>Manage Contracts</h2>
      <select onChange={handleNetworkChange} value={network}>
        <option value="">Select Network</option>
        {networks.map((network) => (
          <option key={network} value={network}>{network}</option>
        ))}
      </select>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Enter contract address"
        disabled={!network}
      />
      <button onClick={handleAddContract} disabled={!network || !contractAddress}>Add Contract</button>
      <p>{status}</p>
      <button onClick={fetchHolders} disabled={!contractAddress}>Fetch Holders</button>
      {holders.length > 0 && (
        <div>
          <h3>Distribute Earnings</h3>
          <input
            type="number"
            value={earnings}
            onChange={(e) => setEarnings(e.target.value)}
            placeholder="Enter total earnings"
          />
          <h3>Exclude Addresses</h3>
          <input
            type="text"
            value={excludeAddress}
            onChange={(e) => setExcludeAddress(e.target.value)}
            placeholder="Enter address to exclude"
          />
          <button onClick={handleAddExcludeAddress}>Add Exclude Address</button>
          <ul>
            {excludeAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
          <button onClick={handleDistribute} disabled={!earnings}>Distribute Earnings</button>
        </div>
      )}
    </div>
  );
}

export default ContractManager;
