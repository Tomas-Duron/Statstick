// scripts/fetch-data.js
import fs from 'fs/promises';

const JSON_URL = "https://ddragon.leagueoflegends.com/api/versions.json";

const response = await fetch(JSON_URL);
const data = await response.json();

const processed = {
  updatedAt: new Date().toISOString(),
  values: data
};

await fs.writeFile('./data/cached-data.json', JSON.stringify(processed, null, 2));
console.log('Done:', processed.updatedAt);