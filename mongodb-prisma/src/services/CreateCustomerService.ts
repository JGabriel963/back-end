import { prismaClient } from "../database/prisma";

interface ICreteCustomerProps {
  name: string;
  email: string;
}

export class CreateCustomerService {
  async execute({ name, email }: ICreteCustomerProps) {
    if (!name || !email) {
      throw new Error("Preenchat todos os campos");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });

    return customer;
  }
}
