import { Request, Response } from "express";
import { TaskService } from "../../services/task/task-service";

export const TaskController = {
    create: async(req: Request, res: Response) => {
        const { description, done } = req.body
        const user_id = req.user_id

        const task = await TaskService.create({
            description,
            done,
            user_id
        })

        return res.status(201).json(task)
    },

    findAll: async(req: Request, res: Response) => {
        const id = req.user_id

        const tasks = await TaskService.findAll(id)

        return res.json(tasks)
    },

    update: async(req: Request, res: Response) => {
        const { description, done } = req.body
        const { id } = req.params

        const task = await TaskService.checkTask({
            description,
            done,
            id
        })

        return res.json(task)
    },

    delete: async(req: Request, res: Response) => {
        const { id } = req.params

        const task = await TaskService.deletTask(id)

        return res.json(task)
    }
}