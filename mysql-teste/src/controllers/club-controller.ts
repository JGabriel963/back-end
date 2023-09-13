import { Request, Response } from "express";
import prismaClient from "../prisma";

export const ClubController = {
    index: async(req: Request, res: Response) => {
        const clubs = await prismaClient.club.findMany({
            select: {
                id: true,
                name: true,
                director: true,
                active: true
            }
        })

        return res.json(clubs)
    },

    save: async(req: Request, res: Response) => {
        const { name, director, active } = req.body

        const club = await prismaClient.club.create({
            data: {
                name: name,
                director: director,
                active: active
            },
            select: {
                id: true,
                name: true,
                director: true,
                active: true
            }
        })

        return res.status(201).json(club)
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params 

        const club = await prismaClient.club.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                desbravadores: true
            }
        })
        

        if(!club) {
            throw new Error("Club not found :(")
        }

        return res.json(club)
    }
}