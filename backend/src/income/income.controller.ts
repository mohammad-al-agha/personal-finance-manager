import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeSevice: IncomeService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createIncome(@Body() createIncomeDto: createIncomeDTO) {
    const income = await this.incomeSevice.addIncome(createIncomeDto);
    return { income };
  }
}
