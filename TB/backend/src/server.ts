import express from 'express';
import bodyParser from 'body-parser';
import { tradeBot } from './trade_bot';
import { addWallet, switchNetwork } from './utils/wallet_connect';
import { addContract, fetchHolders } from './utils/contract_manager';
import { distributeEarnings } from './utils/distribute_earnings';
import { executeTrade } from './utils/trade_execution';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour


app.use(bodyParser.json());

app.post('/api/add-contract', (req, res) => {
  const { network, contractAddress } = req.body;
  try {
    addContract(network, contractAddress);
    res.status(200).send({ message: 'Contract added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding contract' });
  }
});

app.get('/api/fetch-holders', async (req, res) => {
  const { network, contractAddress } = req.query;
  try {
    const holders = await fetchHolders(network, contractAddress);
    res.status(200).send({ holders });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching holders' });
  }
});

app.post('/api/distribute-earnings', async (req, res) => {
  const { network, contractAddress, earnings } = req.body;
  try {
    const holders = await fetchHolders(network, contractAddress);
    await distributeEarnings(network, contractAddress, holders, earnings);
    res.status(200).send({ message: 'Earnings distributed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error distributing earnings' });
  }
});

app.post('/api/execute-trade', async (req, res) => {
  const { network, contractAddress, amount } = req.body;
  try {
    await executeTrade(network, contractAddress, amount);
    res.status(200).send({ message: 'Trade executed successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error executing trade' });
  }
});

if (cache.has(cacheKey)) {
    return res.status(200).send({ holders: cache.get(cacheKey) });
  }

  try {
    const holders = await fetchHolders(network, contractAddress);
    cache.set(cacheKey, holders);
    res.status(200).send({ holders });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching holders' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
