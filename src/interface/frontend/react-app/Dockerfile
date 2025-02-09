FROM node:18-alpine

WORKDIR /app/frontend

COPY src/interface/frontend/react-app/package*.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "-p", "3001"]