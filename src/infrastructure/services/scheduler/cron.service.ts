import cron from "node-cron";
import { logger } from "../../http/logger";

interface CronJob {
  name: string;
  schedule: string;
  handler: () => Promise<void>;
}

class CronService {
  private jobs: CronJob[] = [];

  register(job: CronJob): void {
    this.jobs.push(job);
  }

  start(): void {
    for (const job of this.jobs) {
      cron.schedule(job.schedule, async () => {
        logger.info({ job: job.name }, "Cron job started");

        try {
          await job.handler();
          logger.info({ job: job.name }, "Cron job completed");
        } catch (error) {
          logger.error({ job: job.name, error }, "Cron job failed");
        }
      });

      logger.info({ job: job.name, schedule: job.schedule }, "Cron job registered");
    }
  }
}

export const cronService = new CronService();