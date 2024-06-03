import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export async function distributeEarnings(connection: Connection, earnings: number, holders: PublicKey[]) {
  const totalHolders = holders.length;
  const amountPerHolder = earnings / totalHolders;

  for (const holder of holders) {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: holder,
        lamports: amountPerHolder * LAMPORTS_PER_SOL,
      })
    );
    await connection.sendTransaction(transaction, [payer]);
  }
}
