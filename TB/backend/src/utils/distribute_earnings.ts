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
