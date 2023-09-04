import { Request, Response } from "express";
import { Candidate, Job } from "../models";

export const jobsController = {
    // GET /jobs
    index: async (req: Request, res: Response) => {
        try {
            const jobs = await Job.findAll({ include: 'company' })

            return res.json(jobs)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // POST /jobs
    save: async (req: Request, res: Response) => {
        const { title, description, limitDate, companyId } = req.body

        try {
            const job = await Job.create({
                title,
                description,
                limitDate,
                companyId
            })

            return res.status(201).json(job)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // GET /jobs/:id
    show: async (req: Request, res: Response) => {
        const {id} = req.params

        try {
            const job = await Job.findByPk(id, { include: ["company", "candidates"] })

            const candidatesCount = await job?.countCandidates()

            if (!job) {
                return res.status(404).json({ error: "Job not found :("})
            }

            return res.status(200).json({...job?.get(), candidatesCount})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // PUT /jobs/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params
        const { title, description, limitDate, companyId } = req.body

        try {
            const [affectedRowsk, jobs] = await Job.update({
                title,
                description,
                limitDate,
                companyId
            }, {
                where: {id},
                returning: true
            })

            return res.json(jobs[0])
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // DELETE /jobs/:id
    delete: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const job = await Job.findByPk(id)

            if (!job) {
                return res.status(404).json({ error: "Job not found"})
            }

            await job.destroy()

            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // POST /jobs/:id/addCandidate
    addCandidate: async (req: Request, res: Response) => {
        const jobId = req.params.id
        const { candidateId } = req.body

        try {
            const job = await Job.findByPk(jobId)

            if (!job) return res.status(404).json({ error: "Job not found!"})

            const candidates = (await job?.getCandidates()).filter((candidate) => candidate.id === candidateId)

            if (candidates.length > 0) return res.status(404).json({ error: "Candidate is already registered for this job"})

            await job.addCandidate(candidateId)

            return res.status(201).json({ message: "Candidate registered!"})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    },

    // POST /jobs/id/removeCandidate
    removeCandidate: async (req: Request, res: Response) => {
        const jobId = req.params.id
        const { candidateId } = req.body

        try {
            const job = await Job.findByPk(jobId)
            const candidate = await Candidate.findByPk(candidateId)

            if (!job) return res.status(404).json({ error: "Job not found!"})
            if (!candidate) return res.status(404).json({ error: "Candidate not found!"})

            await job.removeCandidate(candidateId)

            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message})
            }
        }
    }
}