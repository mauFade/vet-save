import { InvalidTokenError } from "@application/@shared/errors";
import { authConfigs } from "@configs/auth";
import { compare } from "bcryptjs";
import { CelebrateError, Joi } from "celebrate";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type TokenDecodeProps = {
  iat: number;
  exp: number;
  token_validator: string;
  user: {
    id: string;
  };
};

function validateToken(bearer: string, token?: string): void {
  if (
    bearer.toLowerCase() !== "bearer" ||
    !token ||
    token.split(".").length !== 3
  ) {
    throw new InvalidTokenError(
      "Invalid token format, please provide a valid token"
    );
  }
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { authorization } = request.headers;

    const { error } = Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .validate({ authorization });

    if (error) {
      throw new CelebrateError(error.message, {
        celebrated: true,
      });
    }

    const [bearer, token] = authorization?.split(" ") as string[];

    validateToken(bearer, token);

    const tokenDecoded = jwt.verify(
      token,
      authConfigs.user.secretKey
    ) as TokenDecodeProps;

    if (
      !(await compare(
        authConfigs.user.token_validator,
        tokenDecoded.token_validator
      ))
    ) {
      throw new InvalidTokenError("Invalid token format.");
    }

    request.user = {
      id: tokenDecoded.user.id,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new InvalidTokenError("This token is expired, login again");
    }

    throw error;
  }
}
