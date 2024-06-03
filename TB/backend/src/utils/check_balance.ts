import { Connection, PublicKey } from '@solana/web3.js';

export async function checkBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance;
}
