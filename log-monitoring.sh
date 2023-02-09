#!/bin/bash

NAMESPACE="boloney-local" # could be passed as an argument in the future
PODLIST=$(kubectl -n ${NAMESPACE} get pods)

while getopts 'fb' OPTION; do
  case "$OPTION" in
  f)
    NAME=${PODLIST##*frontend-}
    NAME=${NAME::16}
    NAME="frontend-${NAME}"
    ;;
  b)
    NAME=${PODLIST##*backend-}
    NAME=${NAME::16}
    NAME="backend-${NAME}"
    ;;
  esac
done

if [ -z "$NAME" ]; then
  echo "Script usage: [-f] [-b] for either the frontend or backend log monitoring"
else
  kubectl -n ${NAMESPACE} logs $NAME -f
fi
