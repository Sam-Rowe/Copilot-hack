# Copilot-hack
A hack to play with CoPilot

# Participants readme
Using copilot and the programming lanuage of your choice

## Challenge 1:
Create an azure function that reads from the [carbon intensity api](https://api.carbonintensity.org.uk/) and makes decisions to enable or disable a set of equipment in your factory.
The azure function should store the state.

## Challenge 2:
Read the stored state of all the machines and presents it in a web page

## Challenge 3:
Send factory and machine states to Hosts 'Enterprise' reporting dashboard.

There is a file called test.sh in the host-app folder that has examples using curl for the relevant POST, PATCH and GET commands for the host


# Host readme
Challenge 1 and 2 for the participants is mostly leaving them to hack away on their own. 

Challenge 3 requires you to have the host applicaiton running in a container somewhere and share that URL with them.


## Host applicaiton
Now I have to write the host applicaiton 🫢

host-app is a minimal node.js app that uses a memory array for the factories.
It has a docker file and some guidence on building and pushing it, oustanding is hosting it in an Azure Container app.
