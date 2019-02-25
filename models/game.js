gameStore = require('./datastore');

/*
The game model represents the entire "universe" of the bowling game.
It consists of a map of all players, and the universal scoreboard.
*/
const Game = function(id) {
  this.id = id;
  this.players = {};
  this.scoreboard = {};
};

/*
Calculate the score by looking at the entire array,
instead of starting with the current score and only looking at new rolls.
While run time may be *slightly* longer, it reduces complexity.
It also reduces the amount of state that the RESTful application must deal with.
*/
Game.prototype.updateScore = function(playerId) {
  frames = this.scoreboard[playerId].frames;
  sum = 0;

  // Iterate over all of the frames, and score them
  for (let i = 0; i < frames.length; i++) {
    currFrame = frames[i];

    /*
    Handle strikes.
    */
    if (currFrame[0] === 10) {
      // If the strike is in the last frame, we need 3 rolls to give it a value.
      if (i === 9) {
        if (currFrame.length !== 3) {
          continue;
        }
        sum += currFrame[0] + currFrame[1] + currFrame[2];
      }

      // If a frame after the strike doesn't exist, we can't assign it a value
      if (!(frames[i+1])) {
        continue;
      }

      // If the next frame has two values, use those to assign the strike a value
      if (frames[i+1].length >= 2) {
        sum += currFrame[0] + frames[i+1][0] + frames[i+1][1];
        continue;
      }

      if (!(frames[i+2])) {
        continue;
      }

      // If the frame that is two frames ahead has a value, we can calculate the score of the strike 
      if (frames[i+2].length >= 1) {
        sum += currFrame[0] + frames[i+1][0] + frames[i+2][0];
      }

      continue;
    }

    // If there is only one value in the frame, and it isn't a strike, it's incomplete
    if (currFrame.length === 1) {
      continue;
    }

    /*
    Handle spares
    */
    if ((currFrame[0] + currFrame[1]) === 10) {
      if (i === 9) {
        if (currFrame.length !== 3) {
          continue;
        }
        sum += currFrame[0] + currFrame[1] + currFrame[2];
        continue;
      }

      if (frames[i+1]) {
        sum += currFrame[0] + currFrame[1] + frames[i+1][0];
      }

      continue;
    }

    // If none of the special cases apply, just sum the rolls in the frame
    sum += currFrame[0] + currFrame[1];
  }

  this.scoreboard[playerId].score = sum;
};

/*
Adds a roll to the list of frames.
*/
Game.prototype.addRoll = function(playerId, roll) {
  frames = this.scoreboard[playerId].frames;

  if (frames === undefined) {
    return new Error('Scoreboard does not exist for player ' + playerId);
  }

  // Base case, push whatever input we get
  if (frames.length === 0) {
    frames.push([roll]);
    return;
  }

  currFrame = frames[frames.length-1];
  lastRoll = currFrame[currFrame.length-1];

  // Handle the 10th frame
  if (frames.length === 10) {
    // If the 10th frame has a strike or spare, it should have 3 rolls
    if ((currFrame[0] === 10) || (currFrame[0] + currFrame[1] === 10)) {
      if (currFrame.length < 3) {
        frames[9].push(roll);
        return;
      }
    } else {
      // If there is no strike/spare, it should have 2 rolls.
      if (currFrame.length < 2) {
        frames[9].push(roll);
        return;
      }
    }

    return new Error('No rolls remaining.');
  }

  // If the last roll is a strike, start a new frame
  if (lastRoll === 10) {
    frames.push([roll]);
    return;
  }

  // Validate that the frame will not exceed 10
  if (currFrame.length === 1) {
    if (currFrame[0] + roll > 10) {
      return new Error('Total pins knocked down in a frame can\'t be more than 10');
    }
  }

  /*
  Handle regular frame with no preceeding strike.
  Either add the roll to the frame, or create a new frame if the
  current frame is full.
  */
  if (currFrame.length === 1) {
    frames[frames.length-1].push(roll);
    return;
  } else if (currFrame.length === 2) { // or if currFrame.length === 0?
    frames.push([roll]);
    return;
  }

  return new Error('Roll does not fit into the boundries of the game.');
};

// Save the game state to in-memory store
Game.prototype.save = function(game) {
  gameStore.setGame(game.id, game);
};

// Retrieve the game <gameId> from in-memory store
Game.retrieve = function(gameId) {
  game = gameStore.getGame(gameId);
  return game;
};

module.exports = {
  Game: Game,
};


