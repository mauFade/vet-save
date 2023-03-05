import { CreateuserService } from "@application/user/services/create-user.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { age, email, name, password } = request.body;

    const data = await container.resolve(CreateuserService).execute({
      age,
      email,
      name,
      password,
    });

    return response.status(201).json(data);
  }
}
