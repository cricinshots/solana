import {Connection, PublicKey, Transaction, sendAndConfirmTransaction, Keypair} from '@solana/web3.js';
import { createMintToInstruction } from '@solana/spl-token';

const connection = new Connection('https://api.testnet.solana.com', 'confirmed');
const walletPrivateKey = new Uint8Array([13, 179, 158, 178, 16, 128, 52, 247, 13, 65, 211, 143, 123, 114, 89, 4, 64, 45, 37, 227, 105, 87, 22, 56, 2, 179, 171, 138, 51, 195, 238, 18, 122, 58, 60, 118, 7, 180, 42, 204, 88, 202, 182, 132, 100, 181, 31, 29, 180, 14, 108, 35, 0, 63, 76, 218, 112, 157, 39, 166, 231, 132, 50, 71]);
const walletPublicKey = '9E8F8829ZKeiraCCxinJF5DNngbkpWQ993e2BNNB8L7g';
const mintAddress = 'AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy';
const mintAuthority = '9E8F8829ZKeiraCCxinJF5DNngbkpWQ993e2BNNB8L7g';


async function mint2(toAddress, amount) {
    try{
        const toPublicKey = new PublicKey(toAddress);
    const mintKey = new PublicKey(mintAddress);
    const transaction = new Transaction().add(
        createMintToInstruction(
            mintKey,
            toPublicKey,
            walletPrivateKey,
            amount,
            [],
            mintKey,
        )
    );
    const walletKeypair = Keypair.fromSecretKey(walletPrivateKey);
    const txid = await sendAndConfirmTransaction(connection, transaction, [walletKeypair]);
    console.log(`Minting ${amount} tokens to ${toAddress} was successful. Transaction ID`);
    //print everything in the txid object without it appearing as [object Object]
    console.log(txid);  
    } catch (error) {
        console.error('Error minting tokens:', error.message, error);
    }

}

async function mint3(toAddress, amount) {
    try {
        
    } catch (error) {
        console.error('Error minting tokens:', error.message, error);
    }
}

async function getTokenTotalSupply() {
    try {
        const mintKey = new PublicKey(mintAddress);
        const token = new Token(connection, mintKey, Token.programId, walletPrivateKey);
        const supply = await token.supply;
        console.log('Total supply:', supply);
    } catch (error) {
        console.error('Error getting total supply:', error.message, error);
    }
}

const testDeliveryWallet = '3A9wwBpZeFrq59acWbJfZuefdTSRJPMokpbtAAhhuhQb';

//test
await mint3(testDeliveryWallet, 5);
// getTokenTotalSupply();
// mintTokens(testDeliveryWallet, 5);