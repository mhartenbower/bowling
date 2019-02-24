const assert = require('assert');
const Game = require('../models/game');
const Player = require('../models/player');
const Scoreboard = require('../models/scoreboard');

describe('Models - Game', function() {
  describe('#getScore()', function() {
    it('It should return 0', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[1]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 0);
    });
    it('It should return 2', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[1, 1]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 2);
    });
    it('It should return 2', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[1, 1], [2]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 2);
    });
    it('It should return 0', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames= [[0, 0]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 0);
    });
    it('It should return 30', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 30);
    });
    it('It should return 22', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[1, 9], [6, 0], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 22);
    });
    it('It should return 27', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[3, 4], [5, 5], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 27);
    });
    it('It should return 27', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[3, 4], [10], [5, 5]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 27);
    });
    it('It should return 35', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[3, 4], [10], [5, 4]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 35);
    });
    it('It should return 14', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[4, 6], [4, 6]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 14);
    });
    it('It should return 300', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 300);
    });
    it('It should return 0', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 0);
    });
    it('It should return 270', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 270);
    });
    it('It should return 240', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 240);
    });

    it('It should return 240', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 240);
    });

    it('It should return 210', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 210);
    });

    it('It should return 273', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [3, 7, 10]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 273);
    });

    it('It should return 273', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[player.id] = scoreboard;
      game.scoreboard[1].frames = [[10], [10], [10], [10], [10], [10], [10], [10], [10], [3, 7]];
      game.getScore(1);
      assert.equal(game.scoreboard[1].score, 253);
    });
  });

  describe('#addRoll()', function() {
    it('It should return the correct scoreboard', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      err = game.addRoll(1, 3);
      if (err) {
        assert.fail(err);
      }
      assert.deepEqual(game.scoreboard[1].frames, [[3]]);
    });

    it('It should return the correct scoreboard', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      err = game.addRoll(1, 1);
      err = game.addRoll(1, 3);
      if (err) {
        assert.fail(err);
      }
      assert.deepEqual(game.scoreboard[1].frames, [[1, 3]]);
    });

    it('It should return the correct scoreboard', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      err = game.addRoll(1, 1);
      if (err) {
        assert.fail(err);
      }
      err = game.addRoll(1, 3);
      if (err) {
        assert.fail(err);
      }
      err = game.addRoll(1, 1);
      if (err) {
        assert.fail(err);
      }
      assert.deepEqual(game.scoreboard[1].frames, [[1, 3], [1]]);
    });

    it('It should fail when the frame total is 11', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      game.addRoll(1, 10);
      err = game.addRoll(1, 1);
      if (err) {
        assert.fail(err);
      }
      assert.deepEqual(game.scoreboard[1].frames, [[10], [1]]);
    });

    it('It should fail when the frame total is 12', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      game.addRoll(1, 9);
      err = game.addRoll(1, 3);
      if (!err) {
        assert.fail('No error returned upon invalid input');
      }
    });

    it('It should succeed when adding all strikes', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      for (let i = 0; i <= 11; i++) {
        err = game.addRoll(1, 10);
        if (err) {
          assert.fail(err);
        }
      }
      assert.deepEqual(game.scoreboard[1].frames, [[10], [10], [10], [10], [10], [10], [10], [10], [10], [10, 10, 10]]);
    });

    it('It should succeed when adding all spares', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      for (let i = 0; i <= 19; i++) {
        err = game.addRoll(1, 5);
        if (err) {
          assert.fail(err);
        }
      }

      err = game.addRoll(1, 6);
      if (err) {
        assert.fail(err);
      }
      assert.deepEqual(game.scoreboard[1].frames, [[5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5, 6]]);
    });

    it('It should fail when adding more than 20 non-strike/spare rolls', function() {
      game = new Game.Game(1);
      player = new Player(1, 'Bill');
      game.players[1] = player;
      scoreboard = new Scoreboard();
      game.scoreboard[1] = scoreboard;
      for (let i = 0; i <= 19; i++) {
        err = game.addRoll(1, 3);
        if (err) {
          assert.fail(err);
        }
      }

      err = game.addRoll(1, 3);
      if (!err) {
        assert.fail('More rolls were added than should be allowed');
      }
    });
  });
});
