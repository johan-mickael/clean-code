FROM node:23-alpine3.19

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install express && \
    npm install -D @types/express

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Command to run the app
CMD ["npm", "run", "start:dev"]