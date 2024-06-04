import { Connection, PublicKey } from '@solana/web3.js';

export async function fetchHolders(tokenMint: PublicKey, connection: Connection, batchSize: number = 1000) {
  let holders = [];
  let fetched = 0;

  while (true) {
    const accounts = await connection.getTokenAccountsByMint(tokenMint, { limit: batchSize, offset: fetched });
    holders = holders.concat(accounts.value.map(account => ({
      publicKey: new PublicKey(account.pubkey),
      balance: account.account.data.parsed.info.tokenAmount.uiAmount,
    })));

    fetched += accounts.value.length;
    if (accounts.value.length < batchSize) break;
  }

  return holders;
}
