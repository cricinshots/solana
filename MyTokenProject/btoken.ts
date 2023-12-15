import { Connection, Keypair } from '@solana/web3.js';
import { Metaplex, MetaplexOptions, bundlrStorage, keypairIdentity } from '@metaplex-foundation/js';
import * as fs from 'fs';

const connection = new Connection('https://api.testnet.solana.com/');
const wallet = Keypair.fromSecretKey(Buffer.from(fs.readFileSync('secretseed.json')));
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

//create a new fungible token using the Metaplex instance with metadata
const options: MetaplexOptions = {
    
}

const token = await metaplex.createFungibleToken(options);
console.log('Token created:', token);

