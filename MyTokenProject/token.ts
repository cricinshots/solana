import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { createMint, MintLayout, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { Metaplex, Metadata } from '@metaplex/js';

(async () => {
  // Connect to the testnet
  const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
  
  // Generate a new wallet keypair
  const payer = Keypair.generate();
  console.log('Payer wallet:', payer.publicKey.toBase58());
  
  // Generate a new mint keypair
  const mintAuthority = Keypair.generate();
  
  // Create a new mint
  const mint = await createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    null,
    0,
    TOKEN_PROGRAM_ID,
  );
  
  // Upload metadata to Arweave
  const metaplex = new Metaplex(connection);
  const metadata = new Metadata('metadata.json');
  const metadataUri = await metaplex.createMetadata(metadata);
  
  // Associate metadata with the mint
  await metaplex.mintNFT(mint.publicKey, metadataUri, payer);
  
  console.log('Token minted:', mint.publicKey.toBase58());
  console.log('Metadata URI:', metadataUri);
})();
