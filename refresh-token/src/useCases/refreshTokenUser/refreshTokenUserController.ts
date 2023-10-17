import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refreshTokenUserUseCase";

export const RefreshTokenUserController = {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body

    const token = await RefreshTokenUserUseCase.execute(refresh_token);

    return response.json(token)
  }
}