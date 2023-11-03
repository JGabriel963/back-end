import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

export class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListCustomerService();

    const customers = await listCustomerService.execute();

    return reply.send(customers);
  }
}
