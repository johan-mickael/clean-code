# Use the base Node.js image
FROM node:23-alpine3.19

# Set the working directory to /app
WORKDIR /app

# Copy the root package.json and install shared dependencies for the whole monorepo
COPY package*.json ./

# Install dependencies for all workspaces using npm workspaces
RUN echo "Installing shared dependencies" && \
  npm install

# Copy the rest of the application code
COPY . .

# Expose the necessary port for the app (adjust if needed)
EXPOSE 3000

# Make the entrypoint script executable
RUN chmod +x /app/docker/entrypoint.sh

ENTRYPOINT [ "/app/docker/entrypoint.sh" ]