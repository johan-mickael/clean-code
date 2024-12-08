export default abstract class DatabaseAdapter {
  abstract connect(): Promise<void>;
}
