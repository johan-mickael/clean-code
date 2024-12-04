export default abstract class ServerInterface {
  constructor(port: number) {}

  abstract start(): void;
}
