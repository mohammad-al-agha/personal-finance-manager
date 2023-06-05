import { Controller, Post, Body } from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeSevice: IncomeService) {}

  @Post()
  async createIncome(@Body() createIncomeDto: createIncomeDTO) {
    const income = await this.incomeSevice.addIncome(createIncomeDto);
    return { income };
  }
}
