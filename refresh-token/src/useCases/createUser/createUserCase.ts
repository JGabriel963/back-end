import { hash } from "bcryptjs"
import { prismaClient } from "../../prisma/client"

interface IUserRequest {
  name: string
  password: string
  username: string
}

export const CreateUserCase = {

  async execute({ name, username, password }: IUserRequest) {

    // Check if user exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username
      }
    });

    if(userAlreadyExists) {
      throw new Error("User already exists!")
    }

    // Register user
    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    })


    return user
  }

}