const Transaction = require('./Transaction');
const Block = require('./Block');
class BlockChain { 
    constructor() {
        this.chain = [this.createGenesisBlock()];
        console.log('Created Genesis Block ', this.chain);
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock() {
        return new Block(new Date(), 'This is the Beginning');
    }
    createTransaction(transaction) {
        console.log('Added transaction to pending ', transaction);
        this.pendingTransactions.push(transaction);
    }
    minePendingTransactions(rewardAddress) {
        const block = new Block(new Date(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, rewardAddress, this.miningReward)
        ]
    }
    getBlance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                const { sender, receiver, amount } = transaction;
                if (sender === address) {
                    balance -= amount;
                }
                if (receiver === address) {
                    balance += amount;
                }
            }
        }
        return balance;
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    isValid() {
        let predicate = true;
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            const prevBlock = this.chain[i - 1];

            const isHashValid = block.hash === block.calcHash();
            const isPrevHashValid = block.prevHash === prevBlock.hash;
            predicate = predicate && isHashValid && isPrevHashValid;
        }
        return predicate;
    }
}

module.exports = BlockChain;