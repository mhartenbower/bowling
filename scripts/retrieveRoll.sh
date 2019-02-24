GAME_ID=$1
PLAYER_ID=$2
FRAME_ID=$3
ROLL_ID=$4

curl -v http://localhost:3000/game/${GAME_ID}/player/${PLAYER_ID}/roll/${ROLL_ID}?frameId=${FRAME_ID}
