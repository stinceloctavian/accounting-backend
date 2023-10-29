import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [PrismaModule],
})
export class InvoicesModule {}
