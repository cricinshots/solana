import {Connection, PublicKey, Transaction, sendAndConfirmTransaction, Keypair} from '@solana/web3.js';
import {createMint, createMintToInstruction, TOKEN_PROGRAM_ID} from '@solana/spl-token';

const connection = new Connection('https://api.testnet.solana.com', 'confirmed');
const walletPrivateKey = new Uint8Array([13, 179, 158, 178, 16, 128, 52, 247, 13, 65, 211, 143, 123, 114, 89, 4, 64, 45, 37, 227, 105, 87, 22, 56, 2, 179, 171, 138, 51, 195, 238, 18, 122, 58, 60, 118, 7, 180, 42, 204, 88, 202, 182, 132, 100, 181, 31, 29, 180, 14, 108, 35, 0, 63, 76, 218, 112, 157, 39, 166, 231, 132, 50, 71]);
const walletPublicKey = '9E8F8829ZKeiraCCxinJF5DNngbkpWQ993e2BNNB8L7g';
const mintAddress = 'AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy';
const mintAuthority = '9E8F8829ZKeiraCCxinJF5DNngbkpWQ993e2BNNB8L7g';

async function mint(toWalletAddress, amount) {
    const fromWallet = Keypair.fromSecretKey(walletPrivateKey);
    const toWallet = new PublicKey(toWalletAddress);

    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 1, TOKEN_PROGRAM_ID);
    const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(fromWallet.publicKey);

}

//test
const testDeliveryWallet = '3A9wwBpZeFrq59acWbJfZuefdTSRJPMokpbtAAhhuhQb';
await mint(testDeliveryWallet, 5);