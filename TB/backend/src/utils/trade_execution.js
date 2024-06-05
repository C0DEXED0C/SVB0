const Web3 = require('web3');
const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const executeTrade = async (network, contractAddress, amount) => {
    switch (network) {
        case 'solana':
            await executeSolanaTrade(contractAddress, amount);
            break;
        case 'ethereum':
        case 'binance-smart-chain':
        case 'polygon':
        case 'avalanche':
        case 'fantom':
        case 'tron':
        case 'algorand':
            await executeEvmTrade(network, contractAddress, amount);
            break;
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
};

const executeSolanaTrade = async (contractAddress, amount) => {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const senderPublicKey = new PublicKey('your-public-key'); // Replace with your public key
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: new PublicKey(contractAddress),
            lamports: amount * LAMPORTS_PER_SOL,
        })
    );
    await connection.sendTransaction(transaction, [/* your signer */]);
};

const executeEvmTrade = async (network, contractAddress, amount) => {
    const web3 = new Web3(getNetworkRpcUrl(network));
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
        from: accounts[0],
        to: contractAddress,
        value: web3.utils.toWei(amount.toString(), 'ether')
    });
};

const getNetworkRpcUrl = (network) => {
    const urls = {
        solana: 'https://api.mainnet-beta.solana.com',
        ethereum: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
        'binance-smart-chain': 'https://bsc-dataseed.binance.org/',
        polygon: 'https://polygon-rpc.com',
        avalanche: 'https://api.avax.network/ext/bc/C/rpc',
        fantom: 'https://rpcapi.fantom.network',
        tron: 'https://api.trongrid.io',
        algorand: 'https://algoexplorerapi.io',
    };
    return urls[network];
};

module.exports = { executeTrade };
