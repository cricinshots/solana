import {mint} from "./methods.js";

// const deliveryWallet = '3A9wwBpZeFrq59acWbJfZuefdTSRJPMokpbtAAhhuhQb';
const deliveryWallet = '9E8F8829ZKeiraCCxinJF5DNngbkpWQ993e2BNNB8L7g';
// let res = await mint(deliveryWallet, 1);
let res = await mint(deliveryWallet, 1);
console.log('test mint response',res);