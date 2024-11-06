FROM node:23-alpine3.19

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npm install @nestjs/core @nestjs/common @nestjs/cli @nestjs/platform-express reflect-metadata rxjs

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:dev"]
