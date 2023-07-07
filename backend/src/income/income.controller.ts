import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { createIncomeDTO } from './dto/createIncome';
import { AuthGuard } from '../auth/auth.guards';
import { Types } from 'mongoose';
import { updateIncomeDTO } from './dto/updateIncomeDTO';

@Controller('income')
@UseGuards(AuthGuard)
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async createIncome(
    @Body() createIncomeDto: createIncomeDTO,
    @Req() req: Request,
  ) {
    const userId: Types.ObjectId = req['userId'];

    const income = await this.incomeService.addIncome(createIncomeDto, userId);
    return { income };
  }

  @Get()
  async getIncome(@Req() req: Request) {
    const userId: Types.ObjectId = req['userId'];

    const incomes = await this.incomeService.getIncomes(userId);
    return { incomes };
  }

  @Delete()
  async deleteIncome(
    @Req() req: Request,
    @Body('incomeId') incomeId: Types.ObjectId,
  ) {
    //extracting the user id from the request
    const userId: Types.ObjectId = req['userId'];

    const incomes = await this.incomeService.deleteIncome(userId, incomeId);

    return { incomes };
  }

  @Put()
  async editIncome(
    @Req() req: Request,
    @Body() updateIncomeDTO: updateIncomeDTO,
  ) {
    //extracting the user id from the request
    const userId: Types.ObjectId = req['userId'];
    const incomeId: Types.ObjectId = updateIncomeDTO.incomeId;

    const incomes = await this.incomeService.editIncome(
      userId,
      incomeId,
      updateIncomeDTO,
    );

    return { incomes };
  }
}
