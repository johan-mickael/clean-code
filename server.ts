import ExpressServer from "./src/infrastructure/frameworks/express/server";
import NestServer from "./src/infrastructure/frameworks/nest/server";
import ServerInterface from "./src/infrastructure/frameworks/ServerInterface";

const run = async () => {
  const port: number = 3000;
  const serverType = process.env.BACKEND_FRAMEWORK;

  if (!serverType) {
    console.error('Please provide a server type. Use "express" or "nest".');
    process.exit(1);
  }

  let server: ServerInterface;

  // Switch based on the environment variable
  if (serverType === 'express') {
    server = new ExpressServer(port);
  } else if (serverType === 'nest') {
    server = new NestServer(port);
  } else {
    console.error('Invalid server type. Use "express" or "nest".');
    process.exit(1);
  }

  await server.start();
};

run();