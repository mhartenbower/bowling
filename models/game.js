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

Game.prototype.addPlayer = function(player) {
  this.players[player.id] = player;
};

/*
Calculate the score by looking at the entire array,
instead of starting with the current score and only looking at new rolls.
While run time may be *slightly* longer, it reduces complexity.
It also reduces the amount of state that the RESTful application must deal with.
*/
Game.prototype.getScore = function(playerId) {
  frames = this.scoreboard[playerId].frames;
  sum = 0;
  for (let i = 0; i < frames.length; i++) {
    currFrame = frames[i];

    // Handle special case of the last frame
    if ((i === 9) && (currFrame[0] === 10)) {
      if (currFrame.length !== 3) {
        continue;
      }
      sum += currFrame[0] + currFrame[1] + currFrame[2];
      continue;
    }

    // Last frame, and spare
    if ((i === 9) && ((currFrame[0] + currFrame[1]) === 10)) {
      if (currFrame.length !== 3) {
        continue;
      }
      sum += 10 + currFrame[2];
      continue;
    }

    /*
    If the current frame is a strike we must
    check that two newer rolls exist. If they don't,
    return 0. If they do, we can return the value of the strike.
    */
    if (currFrame[0] === 10) {
      if (!(frames[i+1])) {
        continue;
      }

      if (frames[i+1].length >= 2) {
        sum += currFrame[0] + frames[i+1][0] + frames[i+1][1];
        continue;
      }

      if (!(frames[i+2])) {
        continue;
      }

      if ((frames[i+1].length === 1) && frames[i+2].length >= 1) {
        sum += currFrame[0] + frames[i+1][0] + frames[i+2][0];
        continue;
      }

      continue;
    }

    // This frame is incomplete. Don't include it in the score yet.
    if (currFrame.length === 1) {
      continue;
    }

    // Handle the case of a spare
    if (currFrame[0] + currFrame[1] === 10) {
      if (!(frames[i+1])) {
        continue;
      }

      sum += currFrame[0] + currFrame[1] + frames[i+1][0];
      continue;
    }

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
    if ((currFrame[0] === 10) || (currFrame[0] + currFrame[1] === 10)) {
      if (currFrame.length < 3) {
        frames[9].push(roll);
        return;
      } else {
        return new Error('No rolls remaining.');
      }
    } else {
      if (currFrame.length < 2) {
        frames[9].push(roll);
        return;
      } else {
        return new Error('No rolls remaining.');
      }
    }
  }

  // Handle strike during a regular frame
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

  // Handle regular frame with no preceeding strike 
  if (currFrame.length === 1) {
    frames[frames.length-1].push(roll);
    return;
  } else if (currFrame.length === 2 || currFrame.length === 0) {
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


