const Transaction = require('./Transaction');
const Block = require('./Block');
const BlockChain = require('./BlockChain');

class YogoCoinManager {
    constructor() {
        this.blockChain = this.initBlockChain();
        this.users = [];
    }
    initBlockChain() {
        const blockChain = new BlockChain();
        return blockChain;
    }
    addUser(address) {
        const user = new User(this.blockChain, address);
        this.users.push(user);
        return user; 
    }
    showAllUsersBalances() {
        for (const user of this.users) {
            const name = user.address;
            const balance = this.blockChain.getBlance(name);
            console.log(`Wallet of ${name}:`, balance);
        }
    }
    showChain() {
        console.log(this.blockChain);
    }
}

class User {
    constructor(blockChain, address) {
        this.blockChain = blockChain;
        this.address = address;
    }
    send(amount) {
        return {
            to: (target) => {
                    const transaction = new Transaction(this.address, target, amount);
                    this.blockChain.createTransaction(transaction);
            }
        };
    }
    mine() {
        this.blockChain.minePendingTransactions(this.address);
    }
}

module.exports = YogoCoinManager;