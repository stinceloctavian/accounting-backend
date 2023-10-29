import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number, skip: number, take: number) {
    return this.prisma.bill.findMany({
      where: { user_id: userId },
      skip,
      take,
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.bill.findUnique({
      where: { id, user_id: userId },
    });
  }

  async getTotalPages(userId: number, billsPerPage: number): Promise<number> {
    const totalBills = await this.prisma.bill.count({
      where: { user_id: userId },
    });

    return Math.ceil(totalBills / billsPerPage);
  }
}
