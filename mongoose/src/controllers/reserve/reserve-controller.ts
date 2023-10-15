import { Request, Response } from "express";
import { Reserve } from "../../models/Reserve";
import { User } from "../../models/User";
import { House } from "../../models/House";

export const ReserveController = {
    store: async(req: Request, res: Response) => {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body

        const house = await House.findById(house_id)

        if(!house) {
            return res.status(400).json({ error: 'this house is not exist'})
        }

        if(house.status !== true) {
            return res.status(400).json({ error: 'Solicitação indisponível'})
        }

        const user = await User.findById(user_id)

        if(String(user?._id) === String(house.user)) {
            return res.status(401).json({ error: 'Reserva não permitida!'})
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date: date
        })

        await reserve.populate(['house', 'user'])

        return res.json(reserve)
    },

    index: async(req: Request, res: Response) => {
        const { user_id } = req.headers

        const reserves = await Reserve.find({ user: user_id}).populate('house')

        return res.json(reserves)
    },

    destroy: async(req: Request, res: Response) => {
        const { reserve_id } = req.body;

        const reserve = await Reserve.findByIdAndDelete({ _id: reserve_id})

        return res.json(reserve)
    }
}