export default abstract class ServerInterface {
  constructor(public readonly port: number) {}

  abstract start(): void;
}
