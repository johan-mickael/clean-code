import cron, { ScheduledTask } from 'node-cron';

import Scheduler from '@triumph/application/ports/scheduler/scheduler.interface';

export default class CronScheduler implements Scheduler {
  schedule(cronTime: string, task: () => void): ScheduledTask {
    return cron.schedule(cronTime, task);
  }
}
