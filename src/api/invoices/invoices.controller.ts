import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/api/auth/decorator/get-user.decorator';
import { InvoicesService } from './invoices.service';

@UseGuards(JwtAuthGuard)
@Controller('api/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(
    @GetUser('id') userId: number,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ) {
    const invoices = await this.invoicesService.findAll(userId, skip, take);
    const totalPages = await this.invoicesService.getTotalPages(userId, take);

    return { invoices, totalPages };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    const invoice = await this.invoicesService.findOne(id, userId);

    if (!invoice) {
      throw new NotFoundException(`No invoice found with id: ${id}`);
    }

    return invoice;
  }
}
