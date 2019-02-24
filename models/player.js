gameStore = require('./datastore');
Scoreboard = require('./scoreboard');


// The Player model represents an actor that is playing the bowling game
const Player = function(id, name) {
  this.id = id;
  this.name = name;
  this.currentFrame = 0;
  this.score = 0;
};

// Save the player state to in-memory store
Player.prototype.save = function(gameId, player) {
  game = gameStore.getGame(gameId);
  game.players[player.id] = player;
  scoreboard = new Scoreboard();
  game.scoreboard[player.id] = scoreboard;
  gameStore.setGame(game.id, game);
};

// Retrieve the player <playerId>
Player.retrieve = function(gameId, playerId) {
  game = gameStore.getGame(gameId);
  player = game.players[playerId];
  return player;
};

module.exports = Player;
