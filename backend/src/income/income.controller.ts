import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeSevice: IncomeService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createIncome(@Body() createIncomeDto: createIncomeDTO, @Req() request) {
    const userId = request.user.id;
    const income = await this.incomeSevice.addIncome(createIncomeDto, userId);
    return { income };
  }
}
