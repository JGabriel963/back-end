import prismaClient from "../../prisma"

interface TaskProps {
    description: string
    done: boolean
    user_id: string
}

interface UpdateTask {
    description: string
    done: boolean
    id: string
}

export const TaskService = {
    create: async({ description, done, user_id }: TaskProps) => {
        const task = await prismaClient.task.create({
            data: {
                description,
                done,
                user_id
            }
        })

        return task
    },

    findAll: async(id: string) => {
        const tasks = await prismaClient.task.findMany({
            where: {
                user_id: id
            }
        })

        return tasks
    },

    checkTask: async({ description, done, id }: UpdateTask) => {
        const task = await prismaClient.task.update({
            where: {
                id
            },
            data: {
                description,
                done,
            }
        })

        return task
    },

    deletTask: async(id: string) => {
        const task = await prismaClient.task.delete({
            where: {
                id
            }
        })

        return task
    }
}