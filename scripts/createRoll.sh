GAME_ID=$1
PLAYER_ID=$2
ROLL_VALUE=$3

curl -v -X POST -H "Content-Type: application/json" \
    -d '{"rollValue": "'$ROLL_VALUE'"}' \
    http://localhost:3000/game/${GAME_ID}/player/${PLAYER_ID}/roll 
