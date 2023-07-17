# This Dockerfile will spin up an express server and Redis server
# and will run the host-app on port 3000 
# The host-app will be able to communicate with the Redis server through the Redis client library
# An environment variable will be used at run time to pass in the Redis server's address called REIDS_HOST



# Use the official Node.js 10 image
FROM node:10

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3000

# Run app.js when the container launches
CMD ["node", "index.js"]

