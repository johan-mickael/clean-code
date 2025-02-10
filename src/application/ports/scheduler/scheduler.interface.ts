export interface ScheduledTask {
  now: (now?: Date) => void;
  start: () => void;
  stop: () => void;
}

export default abstract class Scheduler {
  abstract schedule(cronTime: string, task: () => void): ScheduledTask;
}
