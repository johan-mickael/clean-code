# Use the base Node.js image
FROM node:23-alpine3.19

# Set working directory for the app
WORKDIR /app

# Copy the main package.json and install shared dependencies
COPY package*.json ./
RUN npm install

# Install Express-specific dependencies
WORKDIR /app/src/infrastructure/frameworks/express
COPY src/infrastructure/frameworks/express/package*.json ./
RUN npm install

# Install NestJS-specific dependencies
WORKDIR /app/src/infrastructure/frameworks/nest
COPY src/infrastructure/frameworks/nest/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Go back to the root directory
WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "dev"]