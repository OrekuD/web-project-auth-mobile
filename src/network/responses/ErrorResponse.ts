export interface ErrorPayload {
  status: number;
  list: Array<{ msg: string }>;
}

export default interface ErrorResponse {
  data: any;
  error: ErrorPayload;
}
