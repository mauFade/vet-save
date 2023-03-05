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

export class BadRequestError extends Error {
  public type: string;
  public status: number;

  constructor(message: string) {
    super(message);

    this.name = "BadRequestError";
    this.type = "BAD_REQUEST";
    this.status = 400;
  }
}

export class InvalidTokenError extends Error {
  public type: string;
  public status: number;

  constructor(message: string) {
    super(message);

    this.name = "InvalidTokenError";
    this.type = "INVALID_TOKEN";
    this.status = 401;
  }
}

export class AuthorizationError extends Error {
  public type: string;
  public status: number;
  constructor(message?: string) {
    super(message || "Requires authentication");

    this.name = "AuthorizationError";
    this.type = "UNAUTHORIZED";
    this.status = 401;
  }
}

export class AuthenticateError extends Error {
  public type: string;
  public status: number;
  constructor(message: string) {
    super(message);

    this.name = "AuthenticateError";
    this.type = "INVALID_CREDENTIAL";
    this.status = 401;
  }
}
