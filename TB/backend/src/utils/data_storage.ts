import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '..', 'data', 'trading_data.json');

export function saveTradingData(data: any) {
  const currentData = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf8')) : [];
  currentData.push(data);
  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2), 'utf8');
}

export function getTradingData(): any[] {
  return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf8')) : [];
}
