const assert = require('assert');
const datastore = require('../models/datastore');

describe('#inmem-datastore', function() {
  it('It should return the object that is stored', function() {
    const testGame = {
      test: 'Hello World!',
    };
    datastore.setGame(1, testGame);
    retrievedGame = datastore.getGame(1);

    assert.deepEqual(testGame, retrievedGame);
  });
});
