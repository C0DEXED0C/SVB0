import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Web3 from 'web3';

export async function executeTrade(network: string, contractAddress: string, amount: number) {
  if (network === 'solana') {
    const connection = new Connection(getNetworkRpcUrl(network));
    const senderPublicKey = new PublicKey('your-public-key'); // Replace with your public key
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: new PublicKey(contractAddress),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    await connection.sendTransaction(transaction, [/* your signer */]);
  } else {
    const web3 = new Web3(getNetworkRpcUrl(network));
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: contractAddress,
      value: web3.utils.toWei(amount.toString(), 'ether')
    });
  }
}

function getNetworkRpcUrl(network: string) {
  const urls = {
    solana: 'https://solana-api.projectserum.com',
    ethereum: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    'binance-smart-chain': 'https://bsc-dataseed.binance.org/',
    polygon: 'https://polygon-rpc.com',
    avalanche: 'https://api.avax.network/ext/bc/C/rpc',
    fantom: 'https://rpcapi.fantom.network',
    tron: 'https://api.trongrid.io',
    algorand: 'https://algoexplorerapi.io',
  };
  return urls[network];
}
