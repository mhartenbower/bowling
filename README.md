# Bowling Scoring Service
This is a RESTful (well, kind of RESTful) bowling scoring service. It can handle simultaneous games, as many players as memory can hold, and it provides real time scoring.

This project was bootstrapped with express-generator.

## Installation
1. `npm install`.
   
## Usage
1. Use the test scripts in `/scripts` to give it a try.
   1. Run `./createGame` to start a new game
   2. Create one more players using `./createPlayer <gameId> <playerName>`
   3. Start rolling! `./newRoll <gameId> <playerId>`
2. There is also an incomplete and messy user interface for demo purposes. To use it, open `/public/index.html` in a browser and press `create game` to get started.

## Testing
To test, just run `npm test`. Make sure that a local instance of the service is running if you want the functional test to have a chance at passing.

## Design decisions
* Data is modeled as a single document. This would also work well with a more relational data model.
* Models are responsible for storing themselves, namely through the save() method.

## To do
* Dockerize the service
* Use RPC instead of REST? Sticking to resources is painful. Operations might be nicer. (e.g. POST /newRoll vs. POST /roll)
* Better logging/error handling
* Persistent data store
* Ability to edit/delete resources
