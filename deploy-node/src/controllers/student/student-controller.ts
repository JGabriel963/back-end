import { Request, Response } from "express";
import { StudentService } from "../../services/student/student-service";

export const StudentController = {
    create: async (req: Request, res: Response) => {
        const { name, age, school_id } = req.body

        const student = await StudentService.save({name, age, school_id})

        return res.status(201).json(student)

    },

    showAll: async (req: Request, res: Response) => {
        const students = await StudentService.find({})

        return res.json(students)
    },

    showOne: async (req: Request, res: Response) => {
        const { id } = req.params

        const student = await StudentService.find({ id })

        return res.json(student)
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, age, school_id } = req.body

        const student = await StudentService.update({
            name,
            age,
            school_id,
            id
        })

        return student
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        const student = await StudentService.delete({ id })

        return res.json(student)
    }
}