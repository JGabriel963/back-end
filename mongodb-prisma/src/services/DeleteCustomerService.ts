import { prismaClient } from "../database/prisma";

export class DeleteCustomerService {
  async execute(id: string) {
    if (!id) {
      throw new Error("Solicitação Inválida");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe");
    }

    await prismaClient.customer.delete({
      where: {
        id,
      },
    });

    return { message: "Deletado com sucesso!" };
  }
}
