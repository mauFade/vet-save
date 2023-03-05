/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from "vitest";

import { UserModel } from "./user.model";

test("User model resolves", () => {
  const user = new UserModel(
    "id",
    "Mau",
    "mau@email.com",
    "test123",
    22,
    new Date(),
    new Date()
  );

  expect(user).toBeTruthy();
  expect(user.name).toEqual("Mau");
});

test("User model should throw error due to missing id", () => {
  expect(() => {
    const user = new UserModel(
      "",
      "Mau",
      "mau@email.com",
      "test123",
      22,
      new Date(),
      new Date()
    );
  }).toThrowError("Id is required.");
});

test("User model should throw error due to missing name", () => {
  expect(() => {
    const user = new UserModel(
      "id",
      "",
      "mau@email.com",
      "test123",
      22,
      new Date(),
      new Date()
    );
  }).toThrowError("Name is required.");
});

test("User model should throw error due to missing email", () => {
  expect(() => {
    const user = new UserModel(
      "id",
      "Mau",
      "",
      "test123",
      22,
      new Date(),
      new Date()
    );
  }).toThrowError("Email is required.");
});

test("User model should throw error due to missing password", () => {
  expect(() => {
    const user = new UserModel(
      "id",
      "Mau",
      "mau@email.com",
      "",
      22,
      new Date(),
      new Date()
    );
  }).toThrowError("Password is required.");
});

test("User model should throw error due to missing age", () => {
  expect(() => {
    const user = new UserModel(
      "id",
      "Mau",
      "mau@email.com",
      "test123",
      0,
      new Date(),
      new Date()
    );
  }).toThrowError("Age is required.");
});
