import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/create-user-service";

export const CreateUserController = {
    hanlde: async(req: Request, res: Response) => {
        const { name, email, password } = req.body

        if (name === "" || email === "" || password === "") {
            throw new Error("Missing Fields")
        }

        const user = await CreateUserService.execute({
            name,
            email,
            password
        })

        return res.json(user)
    }
}