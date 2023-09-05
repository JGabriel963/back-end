import { Request, Response } from "express";
import { Club } from "../models";
import * as Yup from "yup";

export const ClubsController = {
  index: async (req: Request, res: Response) => {
    try {
      const clubs = await Club.findAll();

      if (clubs.length === 0) {
        return res.json({ message: "No club registered" });
      }

      return res.json(clubs);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  // POST /clubs
  save: async (req: Request, res: Response) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      director: Yup.string().required(),
      active: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { name, director, active } = req.body;

    try {
      const club = await Club.create({
        name,
        director,
        active,
      });

      return res.status(201).json(club);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  },

  // GET /clubs/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const club = await Club.findByPk(id, { include: "desbravadores"})

        if (!club) {
            return res.status(404).json({ error: "Club not found :("})
        }

        return res.json(club)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
          }
    }
  },

  // PUT /clubs/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, director, active } = req.body

    try {
        const club = await Club.findByPk(id)

        if (!club) {
            return res.status(404).json({ error: "Club not found :("})
        }

        club.update({
            name,
            director,
            active
        })

        club.save()

        return res.json(club)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
          }
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const club = await Club.findByPk(id)

        if (!club) {
            return res.status(404).json({ error: "Club not found :("})
        }

        await club.destroy()

        return res.status(204).send("Club deleted successfully")

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
          }
    }
  }
};
