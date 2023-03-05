export class DomainError {
  private _message: string;
  private _type = "DomainError";

  constructor(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }

  get type(): string {
    return this._type;
  }
}
