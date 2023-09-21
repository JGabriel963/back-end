import prismaClient from "../../prisma";

interface StudentProps {
    name: string
    age: number
    school_id: string
}

interface FindProps {
    id?: string
}

interface UpdateStudentProps extends StudentProps {
    id: string
}

export const StudentService = {
    save: async({ name, age, school_id }: StudentProps) => {
        const student = await prismaClient.student.create({
            data: {
                name,
                age,
                school_id,
            },
            select: {
                id: true,
                name: true,
                school_id: true
            }
        })

        return student
    },
    find: async({ id }: FindProps) => {
        if (id) {
            const student = await prismaClient.student.findFirst({
                where: {
                    id: id
                },
                include: {
                    school: true
                }
            })

            return student
        }

        const students = await prismaClient.student.findMany({
            include: {
                school: true
            }
        })

        return students
    },
    update: async({  name, age, school_id, id }: UpdateStudentProps) => {
        const student = await prismaClient.student.update({
            where: {
                id: id
            }, 
            data: {
                name,
                age,
                school_id,
            }
        })

        return student
    },
    delete: async({id}: {id: string}) => {
        const student = await prismaClient.student.delete({
            where: {
                id: id
            }
        })

        return student
    },
}