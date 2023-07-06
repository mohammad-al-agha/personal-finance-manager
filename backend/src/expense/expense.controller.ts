import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { createExpenseDTO } from './dto/createExpense';
import { AuthGuard } from '../auth/auth.guards';
import { Types } from 'mongoose';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() createExpenseDTO: createExpenseDTO,
    @Req() req: Request,
  ) {
    //extracting the user id from the request
    const userId = req['userId'];

    const expense = await this.expenseService.addExpense(
      createExpenseDTO,
      userId,
    );

    return { expense };
  }

  @Get()
  async getExpenses(@Req() req: Request) {
    //extracting the user id from the request
    const userId = req['userId'];

    const expenses = await this.expenseService.getExpenses(userId);

    return { expenses };
  }

  @Delete()
  async deleteExpense(
    @Req() req: Request,
    @Body('expenseId') expenseId: Types.ObjectId,
  ) {
    //extracting the user id from the request
    const userId: Types.ObjectId = req['userId'];

    const expenses = await this.expenseService.deleteExpense(userId, expenseId);

    return { expenses };
  }
}
