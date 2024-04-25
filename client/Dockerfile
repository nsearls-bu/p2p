# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN npm install

# Start the server
CMD [ "npm", "run", "dev", "-- --host" ]