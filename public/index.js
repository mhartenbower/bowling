/* eslint require-jsdoc: 0 */

let gameId = '';

$('.createGame').click(function() {
  $('.createGame').replaceWith('<button type="button" class="btn btn-lg btn-primary createGame disabled">Create Game</button>');
  createGame();
});

// Add listener to create player button
function addPlayerListener() {
  $('.createPlayer').click(function() {
    addPlayer();
  });
}  

// Add listener to roll button
function addRollListener(playerIdentifier) {
  $( '#button' + playerIdentifier ).click(function() {
    roll(playerIdentifier);
  });
}

// Makes a request to the backend service to create a new game
function createGame() {
  $.post('http://localhost:3000/game', function(data) {
    gameId = data.game.id;
    $('.buttons').append('<button type="button" class="btn btn-lg btn-primary createPlayer">Create Player</button>');
    addPlayerListener();
  });
}

// Makes a request to the backend service to create a new player
function addPlayer() {
  $.post('http://localhost:3000/game/' + gameId + '/player', function(data) {
    playerId = data.player.id;
    addPlayerDiv(playerId);
    addRollListener(playerId);
  });
}

// Adds a new player element to the view
function addPlayerDiv(playerId) {
  $('.players').append(
      `<div class="row" id="` + playerId+ `">
      <div class="col-1">
          <button type="button" class="btn btn-sm btn-primary" id="button` + playerId + `">Roll</button>
      </div>
      <div class="col-1"><input type="text" class="rollInput` + playerId + ` input-sm" id="usr"></div>
      <table class="table">
          <thead>
              <tr>
                  <th class="frame" id="1` + playerId + `"></th>
                  <th class="frame" id="2` + playerId + `"></th>
                  <th class="frame" id="3` + playerId + `"></th>
                  <th class="frame" id="4` + playerId + `"></th>
                  <th class="frame" id="5` + playerId + `"></th>
                  <th class="frame" id="6` + playerId + `"></th>
                  <th class="frame" id="7` + playerId + `"></th>
                  <th class="frame" id="8` + playerId + `"></th>
                  <th class="frame" id="9` + playerId + `"></th>
                  <th class="frame" id="10` + playerId + `"></th>
              </tr>
          </thead>
      </table>
      <div id="score` + playerId + `">Score: 0</div>
  </div>
  </div>`
  );
}

// Makes a new request to the backend service to create a new roll
function roll(playerId) {
  $.post('http://localhost:3000/game/' + gameId + '/player/' + playerId + '/roll',
      {rollValue: $('.rollInput' + playerId).val()}, function( data ) {
        msg = data.msg;
        $('.warning').html('<div class="warning">' + msg + '</div>');
        score = data.game.scoreboard[playerId].score;
        frames = data.game.scoreboard[playerId].frames;
        $('#score' + playerId).html('Score: ' + score);
        
        // Update the scoreboard view
        for (let i = 0; i < frames.length; i++) {
          $('#' + (i+1) + playerId).html(frames[i].toString());
        };
      });
}