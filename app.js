require('prettify-console');
const YogoCoinManager = require('./lib/YogoCoin');

const manager = new YogoCoinManager();

const yuichi = manager.addUser('Yuichi');
const takashi = manager.addUser('Takashi');
const tomoko = manager.addUser('Tomoko');

yuichi.send(1030).to(takashi.address);
yuichi.mine();
takashi.send(200).to(tomoko.address);
tomoko.mine();
manager.showAllUsersBalances();