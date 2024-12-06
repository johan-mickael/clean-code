import { EXPRESS_SERVER, NEST_SERVER, SupportedBackendFrameworkType } from "./supported-backend-frameworks-types";

import ExpressServer from "../src/infrastructure/frameworks/express/express-server";
import NestServer from "../src/infrastructure/frameworks/nest/nest-server";
import ServerInterface from "../src/infrastructure/frameworks/server-interface";

export default class ServerFactory {
  static createServer(backendFramework: SupportedBackendFrameworkType, port: number): ServerInterface {
    switch (backendFramework as SupportedBackendFrameworkType) {
      case EXPRESS_SERVER:
        return new ExpressServer(port);
      case NEST_SERVER:
        return new NestServer(port);
      default:
        throw new Error(`Unsupported backend framework: ${backendFramework}`);
    }
  }
}

