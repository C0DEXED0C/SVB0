import React, { useState } from 'react';
import axios from 'axios';

function ContractManager() {
  const [network, setNetwork] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [holders, setHolders] = useState([]);
  const [status, setStatus] = useState('');

  const handleAddContract = async () => {
    try {
      const response = await axios.post('/api/add-contract', { network, contractAddress });
      setStatus(response.data.message);
      fetchHolders();
    } catch (error) {
      setStatus('Error adding contract');
    }
  };

  const fetchHolders = async () => {
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
      await axios.post('/api/distribute-earnings', { network, contractAddress });
      setStatus('Earnings distributed successfully');
    } catch (error) {
      setStatus('Error distributing earnings');
    }
  };

  return (
    <div>
      <h2>Manage Contracts</h2>
      <select onChange={(e) => setNetwork(e.target.value)} value={network}>
        <option value="solana">Solana</option>
        <option value="ethereum">Ethereum</option>
        {/* Add other networks as needed */}
      </select>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Enter contract address"
      />
      <button onClick={handleAddContract}>Add Contract</button>
      <p>{status}</p>
      <button onClick={handleDistribute} disabled={!holders.length}>Distribute Earnings</button>
    </div>
  );
}

export default ContractManager;
