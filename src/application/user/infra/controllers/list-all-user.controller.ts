import { ListAllUserService } from "@application/user/services/list-all-user.service";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const data = await container.resolve(ListAllUserService).execute();

    return response.status(200).json(data);
  }
}
