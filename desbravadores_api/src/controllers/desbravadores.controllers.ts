import { Request, Response } from "express";
import { Desbravador } from "../models";
import * as Yup from "yup";

export const DesbravadoresController = {
    index: async (req: Request, res: Response) => {
        try {
            const desbravadores = await Desbravador.findAll({ include: "club"})
            
            if (desbravadores.length === 0) {
                return res.json({ message: "No desbravador registered"})
            }

            return res.json(desbravadores)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
              } 
        }
    },

    // POST /desbravadores
    save: async (req: Request, res: Response) => {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            date_birth: Yup.date().required(),
            email: Yup.string().email(),
            phone: Yup.string(),
            active: Yup.boolean().required(),
            club_id: Yup.number().required()
        })

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation error"})
        }

        const {name, cpf, date_birth, email, phone, active, club_id} = req.body

        try {
            const desbravador = await Desbravador.create({
                name,
                cpf,
                date_birth,
                email,
                phone,
                active,
                club_id
            })

            return res.json(desbravador)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
              }
        }
    },

    // GET /desbravadores/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const desbravador = await Desbravador.findByPk(id, { include: "club"})

            if (!desbravador) {
                return res.status(400).json({ error: "Desbravador not found"})
            }

            return res.json(desbravador)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
              }
        }
    },

    // PUT /desbravadores/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const {name, cpf, date_birth, email, phone, active, club_id} = req.body

        try {
            const desbravador = await Desbravador.findByPk(id)

            if(!desbravador) {
                return res.status(400).json({ error: "Desbravador not found"})
            }
            
            desbravador.update({
                name,
                cpf,
                date_birth,
                email,
                phone,
                active,
                club_id
            })

            desbravador.save()

            return res.json(desbravador)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
              }
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const desbravador = await Desbravador.findByPk(id)

            if(!desbravador) {
                return res.status(400).json({ error: "Desbravador not found"})
            }

            await desbravador.destroy()

            return res.status(204).send()
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
              }
        }
    }
}