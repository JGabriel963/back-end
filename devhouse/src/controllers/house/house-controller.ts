import { Request, Response,  } from "express";
import { House } from "../../models/House";
import { User } from "../../models/User";
import { schemaHouse } from "./validation";

export const HouseController = {
    save: async(req: Request, res: Response) => {
        const { filename  }: any = req.file
        const {description, price, location, status} = req.body
        const { user_id } = req.headers;

        if(!(schemaHouse.parse(req.body))) {
            return res.status(400).json({error: 'Falha na validação!'})
        }


        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })
        return res.status(201).json(house)
    },

    index: async(req: Request, res: Response) => {
        const { status } = req.query;

        const houses = await House.find({ status })

        return res.json(houses)
    },

    update: async(req: Request, res: Response) => {
        const { filename }: any = req.file
        const { house_id } = req.params
        const {description, price, location, status} = req.body
        const { user_id } = req.headers;

        if(!(schemaHouse.parse(req.body))) {
            return res.status(400).json({error: 'Falha na validação!'})
        }

        const user = await User.findById(user_id)
        const houses = await House.findById(house_id);

        if (String(user?._id) !== String(houses?.user)) {
            return res.status(401).json({error: "Não autorizado!"})
        }


        const house = await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(house)
    },

    destroy: async(req: Request, res: Response) => {
        const { house_id } = req.body
        const { user_id } = req.headers;

        const user = await User.findById(user_id)
        const houses = await House.findById(house_id);

        if (String(user?._id) !== String(houses?.user)) {
            return res.status(401).json({error: "Não autorizado!"})
        }
        
        const house = await House.findByIdAndDelete({ _id: house_id });

        return res.json(house)
    }
}