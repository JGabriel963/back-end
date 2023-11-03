import { prismaClient } from "../database/prisma";

export class ListCustomerService {
  async execute() {
    const customers = await prismaClient.customer.findMany();

    return customers;
  }
}
