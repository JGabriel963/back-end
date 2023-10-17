import { sign } from "jsonwebtoken";

export const GenerateTokenProvider = {
  async execute(userId: string) {


    const token = sign({}, "4bd98fa7-91bd-4b61-9abd-49a3db38bf3d", {
      subject: userId,
      expiresIn: "20s"
    })

    return token
  }
}