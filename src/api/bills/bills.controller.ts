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
import { BillsService } from './bills.service';

@UseGuards(JwtAuthGuard)
@Controller('api/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  async findAll(
    @GetUser('id') userId: number,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ) {
    const bills = await this.billsService.findAll(userId, skip, take);
    const totalPages = await this.billsService.getTotalPages(userId, take);

    return { bills, totalPages };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    const bill = await this.billsService.findOne(id, userId);

    if (!bill) {
      throw new NotFoundException(`No bill found with id: ${id}`);
    }

    return bill;
  }
}
