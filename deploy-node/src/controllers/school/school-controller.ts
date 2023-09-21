import { Request, Response } from "express";
import { SchoolService } from "../../services/school/school-service";

export const SchoolController = {
    create: async(req: Request, res: Response) => {
        const { name, director } = req.body

        const school = await SchoolService.save({ name, director})

        return res.status(201).json(school)
    },

    showAll: async(req: Request, res: Response) => {
        const schools = await SchoolService.find({})

        return res.json(schools)
    },

    showOne: async(req: Request, res: Response) => {
        const { id } = req.params

        const school = await SchoolService.find({ id })

        return res.json(school)
    },

    update: async(req: Request, res: Response) => {
        const { id } = req.params
        const { name, director } = req.body

        const school = await SchoolService.update({
            name,
            director,
            id
        })

        return res.json(school)
    },

    delete: async(req: Request, res: Response) => {
        const { id } = req.params

        const school = await SchoolService.delete({ id })

        return res.json(school)
    }
}