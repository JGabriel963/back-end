import { z } from "zod"

export const schemaHouse = z.object({
    description: z.string(),
    price: z.number(),
    location: z.string(),
    status: z.boolean()
})