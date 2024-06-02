import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export async function executeSwap(connection: Connection, fromAccount: PublicKey, toAccount: PublicKey, amount: number) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromAccount,
      toPubkey: toAccount,
      lamports: amount,
    })
  );
  await connection.sendTransaction(transaction, [fromAccount]);
}
