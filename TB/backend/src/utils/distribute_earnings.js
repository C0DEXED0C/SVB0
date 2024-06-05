
const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const Web3 = require('web3');

const distributeEarnings = async (network, contractAddress, holders, earnings) => {
    switch (network) {
        case 'solana':
            await distributeSolanaEarnings(contractAddress, holders, earnings);
            break;
        case 'ETH':
        case 'BSC':
        case 'POLY':
        case 'AVA':
        case 'FANTOM':
        case 'TRON':
        case 'ALGO':
            await distributeEvmEarnings(network, contractAddress, holders, earnings);
            break;
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
};

const distributeSolanaEarnings = async (contractAddress, holders, earnings) => {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
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
};

const distributeEvmEarnings = async (network, contractAddress, holders, earnings) => {
    const web3 = new Web3(getNetworkRpcUrl(network));
    const totalTokens = holders.reduce((acc, holder) => acc + holder.balance, 0);
    const accounts = await web3.eth.getAccounts();

    for (const holder of holders) {
        const holderEarnings = (holder.balance / totalTokens) * earnings;
        if (holderEarnings > 0) {
            await web3.eth.sendTransaction({
                from: accounts[0],
                to: holder.publicKey,
                value: web3.utils.toWei(holderEarnings.toString(), 'ether')
            });
        }
    }
};

const getNetworkRpcUrl = (network) => {
    const urls = {
        SOL : 'https://api.mainnet-beta.solana.com',
        ETH : 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
        BSC : 'https://bsc-dataseed.binance.org/',
        POLY : 'https://polygon-rpc.com',
        AVA : 'https://api.avax.network/ext/bc/C/rpc',
        FANTOM : 'https://rpcapi.fantom.network',
        TRON : 'https://api.trongrid.io',
        ALGO : 'https://algoexplorerapi.io',
    };
    return urls[network];
};

module.exports = { distributeEarnings };
