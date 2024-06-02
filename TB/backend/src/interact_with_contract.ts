import { Connection, PublicKey } from '@solana/web3.js';
import { fetchHolders } from './utils/fetch_holders';
import { accumulateEarnings } from './utils/accumulate_earnings';
import { distributeEarnings } from './utils/distribute_earnings';
import { checkBalance, handleError, sendAlert } from './utils';
import { tradeBot } from './trade_bot';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const connection = new Connection('https://rpc.lynxcrypto.app/solana');
const wallet = new Wallet(/* Your wallet setup here */);

const contractAddress = new PublicKey('A8iqgLj9bmqb2JM8umkHj7B7AGriD1EKLZHVRGA2VcNP');
const earningsAccount = new PublicKey('YOUR_EARNINGS_ACCOUNT');

export async function interactWithContract() {
  try {
    const balance = await checkBalance(connection, wallet.publicKey);
    if (balance < 0.01 * LAMPORTS_PER_SOL) {
      logger.error('Not enough balance to perform any transactions.');
      return;
    }

    await tradeBot({ connection, wallet, contractAddress, earningsAccount });

    const holders = await fetchHolders(connection, contractAddress);
    const totalEarnings = await accumulateEarnings(connection, earningsAccount);
    await distributeEarnings(connection, earningsAccount, holders, totalEarnings);

  } catch (error) {
    handleError(error, 'interactWithContract');
  } finally {
    logger.info('Bot has stopped.');
  }
}
