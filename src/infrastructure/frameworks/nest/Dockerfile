FROM node:23-alpine3.19

# Set working directory
WORKDIR /app/nest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

EXPOSE 3001

# Command to run the app
CMD ["npm", "run", "start:dev"]
