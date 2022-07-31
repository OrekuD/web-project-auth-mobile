import moment from "moment";

const FORMATS = {
  SLASH_FORMAT: "MM/DD/YYYY",
  SLASH_FORMAT_W_TIME: "MM/DD/YYYY hh:mm A",
  DOT_FORMAT: "MM.DD.YYYY",
  DOT_FORMAT_W_TIME: "MM.DD.YYYY - hh:mm A",
  MONTH_NAME_FORMAT: "Do MMMM, YYYY"
};

type Format = keyof typeof FORMATS;

export class Timing {
  public static formatDate = (date: Date) =>
    moment(date).format(FORMATS.SLASH_FORMAT);

  public static formatDateToDateTime = (date: Date) =>
    moment(date).format(FORMATS.SLASH_FORMAT_W_TIME);

  public static toDate = (value: string) =>
    moment.utc(value, FORMATS.SLASH_FORMAT).toDate();

  public static dateTimeToDate = (value: string) =>
    moment.utc(value, FORMATS.SLASH_FORMAT_W_TIME).toDate();

  public static toFormat = (value: string, format: Format) =>
    moment.utc(value, FORMATS.SLASH_FORMAT).format(FORMATS[format]);

  public static dateTimeToFormat = (value: string, format: Format) =>
    moment.utc(value, FORMATS.SLASH_FORMAT_W_TIME).format(FORMATS[format]);

  public static to = (value: string) => moment().to(value);

  public static isExpired = (expiryAt: number) =>
    moment.unix(expiryAt).isBefore(moment());

  public static now = () => moment().valueOf();
}
