import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createIncome(
    @Body() createIncomeDto: createIncomeDTO,
    @Req() req: Request,
  ) {
    const userId = req['userId'];

    const income = await this.incomeService.addIncome(createIncomeDto, userId);
    return { income };
  }
}
