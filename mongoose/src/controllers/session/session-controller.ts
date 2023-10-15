import { Request, Response } from "express";
import { User } from "../../models/User";
import { z } from "zod";

export const SessionController = {
    save: async(req: Request, res: Response) => {
        const { email } = req.body

        const schema = z.object({
            email: z.string().email('Email invalid')
        })

        if(!(await schema.parseAsync(req.body))) {
            return res.json({message: 'Falha na validação!'})
        }

        const user = await User.create({email})

        return res.json(user)
    },

    index: async(req: Request, res: Response) => {
        const users = await User.find().limit(10)

        return res.json(users)
    }
}