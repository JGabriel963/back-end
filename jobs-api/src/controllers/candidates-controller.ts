import { Request, Response } from "express";
import { Candidate } from "../models";

export const candidatesController = {
    // GET  /candidates
  index: async (req: Request, res: Response) => {
    try {
      const candidates = await Candidate.findAll();

      return res.status(200).json(candidates);

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /candidates
  save: async (req: Request, res: Response) => {
    const { name, bio, email, phone, openToWork } = req.body;

    try {
      const candidate = await Candidate.create({
        name,
        bio,
        email,
        phone,
        openToWork,
      });

      return res.status(201).json(candidate);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /candidate/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const candidate = await Candidate.findByPk(id)

        return res.status(200).json(candidate)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
    }
  },

  // PUT /candidates/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, bio, email, phone, openToWork } = req.body;

    try {
        const candidate = await Candidate.findByPk(id)

        if (!candidate) {
            return res.status(404).json({ error: "Candidato não localizado." })
        }

        candidate.name = name
        candidate.bio = bio
        candidate.email =email
        candidate.phone = phone
        candidate.openToWork = openToWork

        await candidate.save()

        return res.status(200).json(candidate)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
    }
  },

  // DELETE /candidate/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await Candidate.destroy({ where: {id}})

        return res.status(200).json({ message: "Excluido com sucesso!" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
    }
  }

};
