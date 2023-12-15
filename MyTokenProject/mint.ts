// Import Dependencies
import {
    Transaction,
    SystemProgram,
    Keypair,
    Connection,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import {
    TOKEN_PROGRAM_ID,
    MintLayout
} from '@solana/spl-token';
import {
    DataV2,
    createCreateMetadataAccountV3Instruction
} from '@metaplex-foundation/mpl-token-metadata';
import {
    bundlrStorage,
    keypairIdentity,
    Metaplex,
    UploadMetadataInput
} from '@metaplex-foundation/js';
import secret from './guideSecret.json';

// Establish Solana Connection
const endpoint = 'https://api.testnet.solana.com';  // Testnet endpoint
const solanaConnection = new Connection(endpoint);

// Establish a Metaplex instance with your connection and secret key
const userWallet = Keypair.fromSecretKey(new Uint8Array(secret));
const metaplex = Metaplex.make(solanaConnection)
    .use(keypairIdentity(userWallet))
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: endpoint,
        timeout: 60000,
    }));

// Mint Configuration and Metadata
const MINT_CONFIG = {
    numDecimals: 1,
    numberTokens: 0  // Initial supply is 0
};

const MY_TOKEN_METADATA: UploadMetadataInput = {
    name: "Cricket Clash Gems",
    symbol: "CCG",
    description: "This is the Cricket Clash Gems token!",
    image: "https://example.com/example.png" // add public URL to image you'd like to use
};

const ON_CHAIN_METADATA = {
    name: MY_TOKEN_METADATA.name,
    symbol: MY_TOKEN_METADATA.symbol,
    uri: 'TO_UPDATE_LATER',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
} as DataV2;

// Function to Create Token
async function createToken() {
    // Upload metadata to Arweave
    const uploadMetadataResult = await metaplex.uploadMetadata(MY_TOKEN_METADATA);
    ON_CHAIN_METADATA.uri = uploadMetadataResult.uri;

    // Create a new mint
    const mint = Keypair.generate();
    const createMintIx = createInitializeMintInstruction(
        TOKEN_PROGRAM_ID,
        mint.publicKey,
        MINT_CONFIG.numDecimals,
        userWallet.publicKey,  // Mint authority is set to user's wallet public key
        null  // No freeze authority
    );

    // Create a transaction
    const transaction = new Transaction().add(createMintIx);

    // Send and confirm transaction
    await sendAndConfirmTransaction(
        solanaConnection,
        transaction,
        [userWallet, mint],
        {
            commitment: 'singleGossip',
            preflightCommitment: 'singleGossip',
        }
    );

    // Create metadata account
    const createMetadataAccountIx = createCreateMetadataAccountV3Instruction(
        mint.publicKey,
        userWallet.publicKey,
        ON_CHAIN_METADATA
    );

    // Add metadata account creation instruction to transaction
    transaction.add(createMetadataAccountIx);

    // Send and confirm transaction
    await sendAndConfirmTransaction(
        solanaConnection,
        transaction,
        [userWallet, mint],
        {
            commitment: 'singleGossip',
            preflightCommitment: 'singleGossip',
        }
    );

    console.log('Token created successfully!');
}

// Call the function to create your token
createToken();
