import { Request, Response } from "express";
import prismaClient from "../prisma";

export const DesbravadorController = {
    save: async(req: Request, res: Response) => {
        const { name, cpf, date_birth, email, phone, active,  club_id} = req.body

        const desbravador = await prismaClient.desbravador.create({
            data: {
                name: name,
                cpf: cpf,
                date_birth: date_birth,
                email: email,
                phone: phone,
                active: active,
                club_id: club_id
            },
            select: {
                id: true,
                name: true,
                cpf: true,
                date_birth: true,
                email: true,
                phone: true,
                active: true,
                club_id: true
            }
        })

        return res.status(201).json(desbravador)

    }
}