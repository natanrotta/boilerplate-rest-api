class CronService {
  public async runCron(): Promise<void> {
    try {
      console.log("🕰️ [cron] rodando…");
    } catch (error) {
      console.log({ error })
    }
  }
}

export default new CronService();
