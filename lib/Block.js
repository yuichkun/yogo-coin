const SHA256 = require('crypto-js/SHA256');
class Block { 
    constructor(timeStamp, transactions, prevHash='') { 
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }
    
    calcHash() { 
        const seed = this.index + this.prevHash + this.timeStamp + JSON.stringify(this.transactions) + this.nonce;
        return SHA256(seed).toString();
    }

    mineBlock(difficulty) { 
        console.log(`Mining block with difficulty of ${difficulty}...`);
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calcHash();
        }
        console.log(`Block mined after ${this.nonce} try! ${this.hash}`);
    }

}

module.exports = Block;