const fastify = require("fastify")

const app = fastify({ logger: true })

app.get("/hello", (request, reply) => {
    reply.send({ message: "Hello, world!" })
})

module.exports = app