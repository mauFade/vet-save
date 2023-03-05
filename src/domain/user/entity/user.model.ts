import { DomainError } from "@domain/@shared/error";

export class UserModel {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public age: number;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new DomainError("Id is required.");
    }

    if (!this.name) {
      throw new DomainError("Name is required.");
    }

    if (!this.email) {
      throw new DomainError("Email is required.");
    }

    if (!this.password) {
      throw new DomainError("Password is required.");
    }

    if (!this.age) {
      throw new DomainError("Age is required.");
    }

    if (!this.created_at) {
      throw new DomainError("Creation date is required.");
    }

    if (!this.updated_at) {
      throw new DomainError("Update date is required.");
    }
  }
}
