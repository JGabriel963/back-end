import { Request, Response } from "express";
import { House } from "../../models/House";

export const DashboardController = {
    show: async(req: Request, res: Response) => {
        const { user_id } = req.headers

        const houses = await House.find({ user: user_id})

        return res.json(houses)
    }
}