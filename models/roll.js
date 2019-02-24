/*
The roll model represents one roll.
It consists of a number, and the value (number of pins knocked down)
*/
const Roll = function(rollNum, value) {
  this.rollNum = rollNum;
  this.value = value;
};

// Save the roll state to in-memory store
Roll.prototype.save = function(gameId, player) {
  game = gameStore.getGame(gameId);
  game.players[player.id] = player;
  scoreboard = new Scoreboard();
  game.scoreboard[player.id] = scoreboard;
  gameStore.setGame(game.id, game);
};

// Retrieve the roll <rollId>
Roll.retrieve = function(gameId, playerId, frameId, rollId) {
  game = gameStore.getGame(gameId);
  frame = game.scoreboard[playerId].frames[frameId];
  return frame[rollId];
};

module.exports = Roll;
