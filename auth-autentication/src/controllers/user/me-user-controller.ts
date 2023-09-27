import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/me-user-service";

export const DetailUserController = {
    handle: async(req: Request, res: Response) => {
        const user_id = req.user_id;

        const user = await DetailUserService.execute(user_id)

        return res.json(user)
    }
}