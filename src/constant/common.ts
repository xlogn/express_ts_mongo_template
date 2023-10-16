import { Request, Response } from "express";
import { Log } from "../util/log";

export class Common {
  private static readonly LOG = Log.getInstance();

  private constructor() {}

  public static isNullOrUndefinedOrEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    );
  }

  public static pickSpecificPropertiesInObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
    propertiesToPick: string[]
  ) {
    return propertiesToPick.reduce((picked: any, key) => {
      picked[key] = object[key];
      return picked;
    }, {});
  }

  public static checkArraySanity(array: any[]) {
    if (array && Array.isArray(array) && array.length) return true;
    return false;
  }

  public static checkObjectSanity(object: any) {
    if (
      typeof object !== "object" ||
      Array.isArray(object) ||
      object === null ||
      Object.keys(object).length == 0
    )
      return false;
    return true;
  }

  public static returnRawData(data: any, isObject: any) {
    if (!isObject && !Common.checkArraySanity(data)) return [];
    if (isObject && !Common.checkObjectSanity(data)) return {};
    return JSON.parse(JSON.stringify(data));
  }

  public static getResponseFormat(
    req: Request,
    res: Response,
    code: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ) {
    res.statusCode = code;
    if (code >= 400) {
      Common.LOG.error(`Error encountered: ${data?.message}`);
      return res.json({ error: true, code: code, data: data?.message });
    }
    return res.json({ error: false, code: code, data: data });
  }
}
