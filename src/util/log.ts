import { Logger } from "tslog";
import { Common } from "../constant/common";

export class Log {
  private static instance: Log;
  private readonly _logger;

  private constructor() {
    this._logger = new Logger({ name: "generic-level" });
  }

  public static getInstance() {
    if (Common.isNullOrUndefinedOrEmpty(this.instance)) {
      this.instance = new Log();
    }
    return this.instance._logger;
  }
}
