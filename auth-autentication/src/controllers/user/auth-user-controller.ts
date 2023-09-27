import { Request, Response } from "express";
import { AuhtUserService } from "../../services/user/auth-user.service";

export const AuthUserController = {
    handle: async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (email === "" || password === "") {
            throw new Error("Fields Missing")
        }

        const auth = await AuhtUserService.execute({
            email,
            password
        })

        return res.json(auth)
    }
}