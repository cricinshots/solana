import {exec} from 'child_process';

//constants
// const tokenAddress = 'AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy'
// const tokenDecimals = 1
// const tokenAccount = 'GcZ4WrjePK4giQEV8H3jTxd71uvsqyhwvN11rTNyhAnz'

const tokenAddress = 'ERW1cH6jbFd6P3sdZoH9QdgqjCvVf5RTMrzEWSWXaEto'
const tokenDecimals = 1
const tokenAccount = '2BDDpmbZeVx9oTkAfm31diBb1e37jF3rEoRrFFR5zQ6e'

//address: AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy
// signature: 3tEHUdmb1ZnkQLL5HeN7JHR86LrTi3f8UqAwQAotDWaknRMmic5C4Y5GQFAKX1ux1ugDT9buxJv4NhfinwxKowyD
// mint account: GcZ4WrjePK4giQEV8H3jTxd71uvsqyhwvN11rTNyhAnz
// mint account signature: 43dWQ9azqT1oi7C7t6FWPzW6vJqQQvyrMrkzWpSvHBinyzWHwYsNvUj6sZE3sT1XEbyBV9hNb



//new token
// metaboss create fungible -d 1 -m metadata.json --initial-supply 100
// Signature: 2mUbCoXj2pnWQvQxbchbRRdi2PCLQx73N4ozTftvd97yQMurX4aJLiV4FZZJjygfA5s6pzc1BMthYjos11DXqU2W
// Mint: ERW1cH6jbFd6P3sdZoH9QdgqjCvVf5RTMrzEWSWXaEto
// Metadata: BNASfbjwSmHM6daFC7yzb3LTmSGAruLrQWdEWsPcGQPU
// token account for the mint: 2BDDpmbZeVx9oTkAfm31diBb1e37jF3rEoRrFFR5zQ6e

export async function mint(walletAddress, amount) {
    //use executeCommand instead of runCliCommand

    if (amount < 1) {
        return {
            error: 'invalid amount. Only amounts >=1 are allowed'
        };
    }

    let cliCommand = `spl-token mint ${tokenAddress} ${amount} --output json`;
    let cliOutput = await executeCommand(cliCommand);
    if(cliOutput.error) {
        return cliOutput;
    }
    let cliOutputJson = JSON.parse(cliOutput.out);
    let signature = cliOutputJson.signature;
    //transfer tokens to walletAddress
    //spl-token transfer AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy 10 3A9wwBpZeFrq59acWbJfZuefdTSRJPMokpbtAAhhuhQb --fund-recipient --allow-unfunded-recipient --output json
    cliCommand = `spl-token transfer ${tokenAddress} ${amount} ${walletAddress} --fund-recipient --allow-unfunded-recipient --output json`;
    cliOutput = await executeCommand(cliCommand);
    if(cliOutput.error) {
        return cliOutput;
    }
    console.log('cliOutput', cliOutput);
    cliOutputJson = JSON.parse(cliOutput.out);
    let transferSignature = cliOutputJson.signature;
    return {
        'mintSignature': signature,
        'transferSignature': transferSignature,
    }
}

export async function balance(walletAddress) {
    //first check if walletAddress has enough tokens
    //spl-token accounts AUNnuUwLwgYZ3JPUYc23awDqcuHhDootHVkY1T3UoKQy --owner 3A9wwBpZeFrq59acWbJfZuefdTSRJPMokpbtAAhhuhQb


    let cliCommand = `spl-token accounts ${tokenAddress} --owner ${walletAddress} --output json`;
    let cliOutput = await executeCommand(cliCommand);
    if(cliOutput.error) {
        return cliOutput;
    }
    let cliOutputJson = JSON.parse(cliOutput.out);
    let response = cliOutputJson['accounts'][0]['tokenAmount'];
    response['account'] = cliOutputJson['accounts'][0]['address'];
    return response;
}


function executeCommand(command) {
    console.log('executeCommand', command);
    return new Promise((resolve) => {
        exec(command, (error, stdout, stderr) => {
            const response = {
                error: error ? error.message : stderr,
                out: stdout
            };
            console.log('executeCommand response', response);
            resolve(response);
        });
    });
}