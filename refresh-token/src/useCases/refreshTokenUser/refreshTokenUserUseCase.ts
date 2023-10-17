import dayjs from "dayjs";
import { prismaClient } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

export const RefreshTokenUserUseCase = {
  async execute(refresh_token: string) {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken){
      throw new Error("Refresh token invalid")
    }

    // Verificar se o refresh_tokne já expirou
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    // Gerar token
    const token = await GenerateTokenProvider.execute(refreshToken.userId)

    // Se o refresh_token tiver sido expirado, exclui do banco e gerar novo token e refresh_token
    if (refreshTokenExpired) {
      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })

      // New refresh token
      const newRefreshToken = await GenerateRefreshToken.execute(refreshToken.userId)

      return { acess_token: token, refres_token: newRefreshToken}
    } 

    return { acess_token: token }
  }
}