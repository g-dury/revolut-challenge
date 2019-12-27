#!/bin/bash

set -e


echo "Script deploying the infrastructure"


kubectl version

echo "Applying secrets"
kubectl apply -f ./app-configmap.yaml

echo "Deploying postgres"
kubectl apply -f ./postgres-deployment.yaml
while [ $(kubectl get pod --no-headers | grep 'postgres' | grep -iv '1/1' | wc -l) -gt 0 ]; do
  echo 'Postgres not ready yet';
  sleep 1;
done

echo "Deploying Revolut-app"
kubectl apply -f ./app-deployment.yaml
while [ $(kubectl get pod --no-headers | grep 'revolut' | grep -iv '1/1' | wc -l) -gt 0 ]; do
  echo 'App not ready yet';
  sleep 1;
done
