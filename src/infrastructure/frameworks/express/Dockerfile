FROM node:23-alpine3.19

# Set working directory
WORKDIR /app/express

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3002

# Command to run the app
CMD ["npm", "run", "start:dev"]