// scripts/fetch-data.js
import fs from 'fs/promises';

const language = "en_US";

// Get the latest working version
const versions = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
  .then(r => r.json());

let response;
let versionIndex = 0;

do { // Loop over versions because 9.22.1 is broken
  const version = versions[versionIndex++];
  response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
} while (!response.ok);

const championJson = await response.json();

const processed = {
  updatedAt: new Date().toISOString(),
  data: championJson.data
};

await fs.writeFile('./data/cached-data-ddragon.json', JSON.stringify(processed, null, 2));
console.log('Done:', processed.updatedAt);