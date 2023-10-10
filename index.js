//write boilder plate code for express with 2 routes post called /mint and /balance
// /mint will take in a wallet address and amount and return a mint signature and transfer signature
// /balance will take in a wallet address and return the balance of the wallet
//
// Path: index.js

//import express
import express from 'express';
import {mint, balance} from "./methods.js";

const app = express();
const port = 3989;

app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.post('/mint', async (req, res) => {
    const {walletAddress, amount} = req.body;

    if(walletAddress === undefined || amount === undefined) {
        res.status(400).send({
            error: 'invalid request'
        });
    }

    let response = await mint(walletAddress, amount);
    if(response.error) {
        res.status(500).send(response);
    }else {
        res.send(response);
    }
});

app.post('/balance', async (req, res) => {
    const {walletAddress} = req.body;

    if (walletAddress === undefined) {
        res.status(400).send({
            error: 'invalid request'
        });
    }

    let response = await balance(walletAddress);
    if(response.error) {
        res.status(500).send(response);
    }else {
        res.send(response);
    }
});