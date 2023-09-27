import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string
}

export function isAutenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).send("Not authorized")
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(
            token,
            "88f7cf0aea467d203716101fc5f12f1e"
        ) as PayLoad

        req.user_id = sub;

        return next()
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ error: error.message })
        }
    }
}