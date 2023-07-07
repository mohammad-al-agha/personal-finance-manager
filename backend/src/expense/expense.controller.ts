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
import { ExpenseService } from './expense.service';
import { createExpenseDTO } from './dto/createExpense';
import { AuthGuard } from '../auth/auth.guards';
import { Types } from 'mongoose';
import { updateExpenseDto } from './dto/updateExpenseDTO';

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
    const userId: Types.ObjectId = req['userId'];

    const expense = await this.expenseService.addExpense(
      createExpenseDTO,
      userId,
    );

    return { expense };
  }

  @Get()
  async getExpenses(@Req() req: Request) {
    //extracting the user id from the request
    const userId: Types.ObjectId = req['userId'];

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

  @Put()
  async editExpense(
    @Req() req: Request,
    @Body() updateExpenseDto: updateExpenseDto,
  ) {
    // Extracting the user id from the request
    const userId: Types.ObjectId = req['userId'];
    const expenseId: Types.ObjectId = updateExpenseDto.expenseId;

    const expenses = await this.expenseService.editExpense(
      userId,
      expenseId,
      updateExpenseDto,
    );

    return { expenses };
  }
}
