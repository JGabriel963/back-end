import prismaClient from "../../prisma";

interface SchoolProps {
    name: string
    director: string
}

interface FindProps {
    id?: string
}

interface UpdateSchoolProps extends SchoolProps {
    id: string
}

export const SchoolService = {
    save: async({ name, director }: SchoolProps) => {
        const school = await prismaClient.school.create({
            data: {
                name,
                director
            },
            select: {
                id: true,
                name: true,
                director: true
            }
        })

        return school
    },
    find: async({ id }: FindProps) => {
        if (id) {
            const school = await prismaClient.school.findFirst({
                where: {
                    id: id
                },
                include: {
                    students: true
                }
            })

            return school
        }

        const schools = await prismaClient.school.findMany()

        return schools
    },
    update: async({ name, director, id }: UpdateSchoolProps) => {
        const school = await prismaClient.school.update({
            where: {
                id: id
            },
            data: {
                name,
                director
            }
        })

        return school
    },
    delete: async({ id }: { id: string }) => {
        const school = await prismaClient.school.delete({
            where: {
                id: id
            }
        })

        return school
    },
}