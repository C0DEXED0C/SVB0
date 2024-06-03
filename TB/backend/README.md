# VAL - Trading Bot Backend

## Overview
VAL is a trading bot that utilizes real-time data from the Lynx API to execute trading strategies on the Solana blockchain. The bot supports various trading methods and continuously learns from its interactions by saving trading data.

## Features
- Continuous, Random, and Simultaneous Trading Methods
- Real-time market data from Lynx API
- Earnings distribution to token holders
- Automated trading with stop-loss and take-profit conditions
- Performance monitoring and logging
- Error handling and alert notifications
- LSTM model for market data analysis

## Setup

### Prerequisites
- Node.js
- TypeScript
- Solana CLI
- Lynx API key

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/VAL.git
    cd VAL/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:
    ```plaintext
    SOLANA_RPC_URL=https://rpc.lynxcrypto.app/solana
    LYNX_API_KEY=your_lynx_api_key
    ALERT_EMAIL=your_email@gmail.com
    ALERT_EMAIL_PASSWORD=your_email_password
    ALERT_RECIPIENT=recipient_email@gmail.com
    ```

### Usage
1. Start the server:
    ```bash
    npm start
    ```

2. The bot will start interacting with the Solana blockchain and executing trades based on the configured strategies.

### Directory Structure
- **src/**
  - **utils/**: Utility functions for various operations.
  - `interact_with_contract.ts`: Main interaction logic.
  - `trade_bot.ts`: Trading logic.
  - `server.ts`: Express server to handle API requests.
  - `train_lstm_model.ts`: Script to train the LSTM model.

## Development
1. Run the TypeScript compiler:
    ```bash
    npx tsc
    ```

2. Run the development server:
    ```bash
    npm run dev
    ```

## License
This project is licensed under the MIT License.
