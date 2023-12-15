import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import * as fs from 'fs';

// Connect to Solana Network
const endpoint = 'https://api.testnet.solana.com';  // Testnet endpoint
const solanaConnection = new Connection(endpoint);

// Generate a New Solana Wallet
const keypair = Keypair.generate();
console.log(`Generated new KeyPair. Wallet PublicKey: `, keypair.publicKey.toString());

// Write Wallet Secret Key to a .JSON
const secret_array = keypair.secretKey
    .toString() // convert secret key to string
    .split(',') // delimit string by commas and convert to an array of strings
    .map(value => Number(value)); // convert string values to numbers inside the array

const secret = JSON.stringify(secret_array); // Convert to JSON string
fs.writeFile('guideSecret.json', secret, 'utf8', function(err) {
    if (err) throw err;
    console.log('Wrote secret key to guideSecret.json.');
});

//write public key to walletpublickey.json
const publicKey = JSON.stringify(keypair.publicKey.toString());
fs.writeFile('guidePublicKey.json', publicKey, 'utf8', function(err) {
    if (err) throw err;
    console.log('Wrote public key to guidePublicKey.json.');
});