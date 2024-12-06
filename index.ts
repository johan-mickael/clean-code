import { SupportedBackendFrameworkType, supportedBackendFrameworks } from "./servers/supported-backend-frameworks-types";
import ServerFactory from "./servers/server-factory";

const run = async () => {
  const port: number = 3000;
  const serverType = process.env.BACKEND_FRAMEWORK;

  if (!serverType) {
    throw new Error('BACKEND_FRAMEWORK environment variable is required');
  }

  if (!supportedBackendFrameworks.includes(serverType as SupportedBackendFrameworkType)) {
    throw new Error(`BACKEND_FRAMEWORK environment variable must be one of: ${supportedBackendFrameworks.join(', ')}`);
  }

  await ServerFactory
    .createServer(serverType as SupportedBackendFrameworkType, port)
    .start();
};

run();