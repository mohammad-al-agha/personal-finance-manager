import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto/createIncome';
import { AuthGuard } from '../auth/auth.guards';
import { Types } from 'mongoose';

@Controller('income')
@UseGuards(AuthGuard)
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async createIncome(
    @Body() createIncomeDto: createIncomeDTO,
    @Req() req: Request,
  ) {
    const userId = req['userId'];

    const income = await this.incomeService.addIncome(createIncomeDto, userId);
    return { income };
  }

  @Get()
  async getIncome(@Req() req: Request) {
    const userId = req['userId'];

    const incomes = await this.incomeService.getIncomes(userId);
    return { incomes };
  }

  @Delete()
  async deleteIncome(
    @Req() req: Request,
    @Body('incomeId') incomeId: Types.ObjectId,
  ) {
    const userId = req['userId'];

    const incomes = await this.incomeService.deleteIncome(userId, incomeId);

    return { incomes };
  }
}
