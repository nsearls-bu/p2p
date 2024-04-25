# Base image
FROM node:18

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
RUN npm install
RUN npx prisma generate


# Start the server using the production build
CMD [ "npm", "run", "start"]