const assert = require('assert');
const request = require('request-promise');

// These are tests that simulate how a client interacts with the service

describe('#Functional Tests', function() {
  let gameId = '';
  let playerId = '';
  // Set up a game and add some players
  before(function(done) {
    request.post({uri: 'http://localhost:3000/game', resolveWithFullResponse: true})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          gameId = JSON.parse(res.body).game.id;
        })
        .then(function() {
          request.post({uri: 'http://localhost:3000/game/' + gameId + '/player', resolveWithFullResponse: true})
              .then(function(res) {
                assert.equal(res.statusCode, 201);
                playerId = JSON.parse(res.body).player.id;
                done();
              });
        });
  });
  it('Add a roll to the player and then retrieve the roll', function(done) {
    requestData = {
      rollValue: 3,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 0);
        })
        .then(function() {
          request.get({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll/0?frameId=0', resolveWithFullResponse: true})
              .then(function(res) {
                assert.equal(res.statusCode, 200);
                assert.equal(JSON.parse(res.body).roll, 3);
                done();
              });
        });
  });
  it('Add a roll to the player and then check that the score is correct', function(done) {
    requestData = {
      rollValue: 3,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 6);
          done();
        });
  });
  it('Roll a strike', function(done) {
    requestData = {
      rollValue: 10,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 6);
          done();
        });
  });
  it('Roll a strike', function(done) {
    requestData = {
      rollValue: 10,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 6);
          done();
        });
  });
  it('Roll a strike', function(done) {
    requestData = {
      rollValue: 10,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 36);
          done();
        });
  });
  it('Retrieve the game', function(done) {
    request.get({uri: 'http://localhost:3000/game/' + gameId, resolveWithFullResponse: true})
        .then(function(res) {
          body = JSON.parse(res.body);
          assert.equal(res.statusCode, 200);
          assert.equal(body.scoreboard[playerId].score, 36);
          assert.equal(body.id, gameId);
          assert.deepEqual(body.scoreboard[playerId].frames, [[3, 3], [10], [10], [10]]);
          done();
        });
  });
  it('Roll first part of a spare', function(done) {
    requestData = {
      rollValue: 5,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 61);
          done();
        });
  });
  it('Roll second part of a spare', function(done) {
    requestData = {
      rollValue: 5,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 81);
          done();
        });
  });
  it('Roll a normal roll', function(done) {
    requestData = {
      rollValue: 4,
    };
    request.post({uri: 'http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll', resolveWithFullResponse: true, json: requestData})
        .then(function(res) {
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.game.scoreboard[playerId].score, 95);
          done();
        });
  });
});
