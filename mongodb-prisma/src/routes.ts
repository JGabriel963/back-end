import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreteCustomerController } from "./controllers/CreteCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";

export async function router(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { ok: true };
  });

  fastify.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreteCustomerController().handle(request, reply);
    }
  );

  fastify.get(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(request, reply);
    }
  );

  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );
}
