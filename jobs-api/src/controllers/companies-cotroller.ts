import { Request, Response } from "express";
import { Company } from "../models/company";

export const companiesController = {
  index: async (req: Request, res: Response) => {
    try {
      const companies = await Company.findAll();
      return res.status(200).json(companies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /companies
  save: async (req: Request, res: Response) => {
    const { name, bio, website, email } = req.body;

    try {
      const company = await Company.create({
        name,
        bio,
        website,
        email,
      });

      return res.status(201).json(company);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /companies
  show: async (req: Request, res: Response) => {
    const { id } = req.params 

    try {
        const company = await Company.findByPk(id)

        if (!company) {
            return res.status(404).json({error: "Company not found :("})
        }
  
        return res.status(200).json(company);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
  },

  // PUT /companies/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, bio, website, email } = req.body
    try {
        const [affectRows, companies] = await Company.update({
            name,
            bio,
            website,
            email
        }, {
            where: { id },
            returning: true
        })

        return res.json(companies[0])

    } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
    }

  },

  // DELETE /companies/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const company = await Company.findByPk(id)

        if (!company) {
          return res.status(404).json({ error: "Company not found :("})
        }

        company.destroy()
        return res.status(204).send()
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
  }
};
