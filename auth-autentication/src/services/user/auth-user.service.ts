import { compare } from "bcryptjs"
import prismaClient from "../../prisma"
import { sign } from "jsonwebtoken"

interface AuthRequest {
    email: string
    password: string
}

export const AuhtUserService = {
    execute: async({ email, password}: AuthRequest) => {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }

        })

        if (!user) {
            throw new Error("User/password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Password incorrect")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            "88f7cf0aea467d203716101fc5f12f1e",
            {
                subject: user.id,
                expiresIn: "10d"
            }
        )

        return {
            token: token
        }
    }
}