import { Request, Response } from "express";
import { AuthenticateUserCase } from "./AuthenticateUserCase";

export const AuthenticateUserController = {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const token = await AuthenticateUserCase.execute({
      username,
      password
    })

    return response.json(token)
  }
}