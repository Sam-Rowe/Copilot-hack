#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "SamsFactory", "location": "Birmingham", "machines": [{"name": "Lathe", "status": "Enabled"}]}' http://localhost:3000/api/factory
echo "\n\n"
# return 200 good
curl -X POST -H "Content-Type: application/json" -d '{"name": "SamsFactory", "location": "Birmingham", "machines": [{"name": "Lathe", "status": "Enabled"}]}' http://localhost:3000/api/factory
# return 400 already exists
echo "\n\n"
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/factorys
# return 200 good and one factory
echo "\n\n"
curl -X PATCH -H "Content-Type: application/json" -d '{"name": "SamsFactory2", "location": "Birmingham", "machines": [{"name": "Lathe", "status": "Enabled"} ]}' http://localhost:3000/api/factory/SamsFactory
# return 200 good nothing actually changes
echo "\n\n"
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/factorys
# return 200 good and one factory
echo "\n\n"
curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Lathe", "status": "Disabled"}' http://localhost:3000/api/factory/SamsFactory2/Lathe
# return 200 good and one machine updated in one factory
echo "\n\n"
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/factorys