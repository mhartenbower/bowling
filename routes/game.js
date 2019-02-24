const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const Game = require('../models/game');
const Player = require('../models/player');
const Roll = require(`../models/roll`);
const {check, validationResult} = require('express-validator/check');

const rollValidator = [
  check('rollValue').isInt({min: 0, max: 10}).withMessage('Roll must be between 0 and 10'),
];

/*
Controller for creating a new game
Creates a new game and saves it.
*/
router.post('/', function(req, res, next) {
  gameUuid = uuidv4();
  game = new Game.Game(gameUuid);
  game.save(game);

  res.status(201).send({'msg': 'Game successfully created', 'game': game});
});

/*
Controller for retrieving a game
*/
router.get('/:gameId', function(req, res, next) {
  game = Game.Game.retrieve(req.params.gameId);

  res.status(200).json(game);
});

/*
 Controller for creating a new player in game <gameId>
 Creates a new player and saves it.
 */
router.post('/:gameId/player', function(req, res, next) {
  playerUuid = uuidv4();
  playerName = req.body.name;
  player = new Player(playerUuid, req.body. playerName);
  player.save(req.params.gameId, player);

  res.status(201).send({'msg': 'Player successfully created', 'player': player});
});

/*
Controller for retrieving a player <playerId>
*/
router.get('/:gameId/player/:playerId', function(req, res, next) {
  Player.retrieve(req.params.gameId, req.params.playerId);
});

/*
Controller for creating a new roll for player <playerId> in game <gameId>
Creates a new roll and saves it.
*/
router.post('/:gameId/player/:playerId/roll', rollValidator, function(req, res, next) {
  gameId = req.params.gameId;
  playerId = req.params.playerId;
  rollValue = parseInt(req.body.rollValue);

  // Validate the body
  let err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).send({'msg': err.array()[0].msg});
  }

  roll = new Roll(rollValue);
  err = roll.save(gameId, playerId, roll);
  if (err) {
    return res.status(400).send({'msg': err.toString()});
  }

  return res.status(201).send({'msg': 'Roll successful', 'game': game});
});

/*
Retrieve <rollNum> roll for player <playerId> in game <gameId>
*/
router.get('/:gameId/player/:playerId/roll/:rollNum', function(req, res, next) {
  roll = Roll.retrieve(req.params.gameId, req.params.playerId, req.query.frameId, req.params.rollNum);

  res.status(200).send({'roll': roll});
});

module.exports = router;
