import { Request, Response } from "express";
import { CreateUserCase } from "./createUserCase";

export const CreateUserController = {
  async handle(request: Request, response: Response) {
      const { name, username, password } = request.body

      const user = await CreateUserCase.execute({
        username,
        name,
        password
      })

      return response.json(user)
  }
}