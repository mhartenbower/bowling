gameStore = require('./datastore');

/*
The roll model represents one roll.
It consists of a number, and the value (number of pins knocked down)
*/
const Roll = function(value) {
  this.value = value;
};

// Save the roll state to in-memory store
Roll.prototype.save = function(gameId, playerId, roll) {
  game = gameStore.getGame(gameId);
  err = game.addRoll(playerId, roll.value);
  if (err) {
    return err;
  }
  game.getScore(playerId);

  gameStore.setGame(game.id, game);
};

// Retrieve the roll <rollId>
Roll.retrieve = function(gameId, playerId, frameId, rollId) {
  game = gameStore.getGame(gameId);
  frame = game.scoreboard[playerId].frames[frameId];
  return frame[rollId];
};

module.exports = Roll;
