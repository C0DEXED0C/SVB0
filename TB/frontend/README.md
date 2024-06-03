# VAL - Trading Bot Frontend

## Overview
The frontend for the VAL trading bot provides a dashboard for monitoring and controlling the bot's activities. It displays the bot's status, logs, and allows users to update settings.

## Features
- Monitor bot status
- View logs
- Update bot settings

## Setup

### Prerequisites
- Node.js

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/VAL.git
    cd VAL/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Usage
1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Directory Structure
- **public/**: Contains the main HTML file.
- **src/**: Contains the source code.
  - **components/**: React components.
    - `App.js`: Main component.
    - `Status.js`: Component to display bot status.
    - `Logs.js`: Component to display logs.
    - `Controls.js`: Component to control bot settings.
  - `index.js`: Entry point for the React app.
  - `App.css`: Basic styles for the app.

## Development
1. Run the development server:
    ```bash
    npm start
    ```

## License
This project is licensed under the MIT License.
