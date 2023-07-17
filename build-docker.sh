#!/bin/bash

echo "This is not inteded to be run as a script but as an aide memoire"
exit 1


docker build -t copilothack20230719.azurecr.io/copilothost:v1.1 .
docker run -p 3000:3000 copilothack20230719.azurecr.io/copilothost:v1.1

# custom docker registry login
 docker login --password {PASSWORD} -u copilothack20230719 copilothack20230719.azurecr.io
docker push copilothack20230719.azurecr.io/copilothost:v1.1

