export interface ErrorInterface extends Error {
  status: number;
  message: string;
  type: string;
}

export class NotFoundError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = "NotFoundError";
    this.type = "NOT_FOUND";
    this.status = 404;
  }
}
