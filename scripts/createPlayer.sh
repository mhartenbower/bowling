GAME_ID=$1
PLAYER_NAME=$2
curl -v -X POST http://localhost:3000/game/${GAME_ID}/player \
    -d '{"playerName": "'$PLAYER_NAME'"}' \