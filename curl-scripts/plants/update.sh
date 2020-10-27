#!/bin/bash

API="http://localhost:4741"
URL_PATH="/plants"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
