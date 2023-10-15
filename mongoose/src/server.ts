import express from 'express'
import cors from 'cors'
import path from 'path'
import { router } from './routes'
import { connect } from './database'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use("/files", express.static(path.resolve(__dirname, '..', 'uploads')))

connect()

app.listen(3333, () => {
    console.log("Server Started :)")
})
