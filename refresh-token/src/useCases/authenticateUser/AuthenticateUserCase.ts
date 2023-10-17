import { compare } from "bcryptjs"
import { prismaClient } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

interface IRequest {
  username: string,
  password: string
}

export const AuthenticateUserCase = {
  async execute({ username, password }: IRequest) {

    // Check if user exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect")
    }

    // Verificar if password is true
    const passwordMatch = compare(password, userAlreadyExists.password)

    if(!passwordMatch) {
      throw new Error("User or password incorrect")
    }

    // Generate token

    const token = await GenerateTokenProvider.execute(userAlreadyExists.id)

    // Delete refresh_token if already exists
    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    });

    // Generate token
 
    const refreshToken = await GenerateRefreshToken.execute(userAlreadyExists.id)

    return { acess_token: token, refresh_token: refreshToken }
  }
}