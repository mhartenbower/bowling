// Simple inmem data store for games.

module.exports = function() {
  const gameStore = {};
  return {
    getGame: function(gameId) {
      return gameStore[gameId];
    },
    setGame: function(gameId, game) {
      gameStore[gameId] = game;
    },
  };
}();
