import express from 'express'
import { AppDataSource } from './data-source'

const app = express()

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log("Database initalized")
  })
  .catch((erro) => {
    console.log(erro)

  })

app.listen(3333, () => {
  console.log('Server Started :)')
})