import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function distributeEarnings(network: string, contractAddress: string, holders: { publicKey: PublicKey, balance: number }[], earnings: number) {
  const connection = new Connection(getNetworkRpcUrl(network));
  const totalTokens = holders.reduce((acc, holder) => acc + holder.balance, 0);
  const transactions = [];

  for (const holder of holders) {
    const holderEarnings = (holder.balance / totalTokens) * earnings * LAMPORTS_PER_SOL;
    if (holderEarnings > 0) {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(contractAddress),
          toPubkey: holder.publicKey,
          lamports: holderEarnings,
        })
      );
      transactions.push(transaction);
    }
  }

  for (const transaction of transactions) {
    await connection.sendTransaction(transaction, [/* your signer */]);
  }
}

function getNetworkRpcUrl(network: string) {
  const urls = {
    SOL : 'https://solana-api.projectserum.com',
    ETH : 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    BSC : 'https://bsc-dataseed.binance.org/',
    POLY : 'https://polygon-rpc.com',
    AVA : 'https://api.avax.network/ext/bc/C/rpc',
    FANTOM : 'https://rpcapi.fantom.network',
    TRON : 'https://api.trongrid.io',
    ALGO : 'https://algoexplorerapi.io',
  };
  return urls[network];
}
