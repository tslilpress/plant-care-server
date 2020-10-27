#!/bin/bash

API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "plantName": "'"${NAME}"'",
      "plantType": "'"${TYPE}"'",
      "lastWatered": "'"${LWATER}"'",
      "lastFertilized": "'"${LFERT}"'",
      "wateringFrequency": "'"${WFREQ}"'",
      "fertilizngFrequency": "'"${FFREQ}"'",
      "nextWatering": "'"${NWATER}"'",
      "nextFertilizing": "'"${NFERT}"'",
      "owner": "'"${OWNER}"'",
      "note": "'"${NOTE}"'"
    }
  }'

echo
