import prismaClient from "../../prisma"

export const DetailUserService = {
    execute: async (user_id: string) => {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}