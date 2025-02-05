export default abstract class Logger {
  abstract info(message?: any, ...optionalParams: any[]): void;
  abstract error(message?: any, ...optionalParams: any[]): void;
}
