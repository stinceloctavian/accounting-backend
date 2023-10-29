import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number, skip: number, take: number) {
    return this.prisma.invoice.findMany({
      where: { user_id: userId },
      skip,
      take,
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.invoice.findUnique({
      where: { id, user_id: userId },
    });
  }

  async getTotalPages(
    userId: number,
    invoicesPerPage: number,
  ): Promise<number> {
    const totalBills = await this.prisma.invoice.count({
      where: { user_id: userId },
    });

    return Math.ceil(totalBills / invoicesPerPage);
  }
}
