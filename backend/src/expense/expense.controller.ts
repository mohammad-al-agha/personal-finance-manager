import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { createExpenseDTO } from './dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createExpense(@Body() createExpenseDTO: createExpenseDTO) {
    const expense = await this.expenseService.addExpense(createExpenseDTO);
    return { expense };
  }
}
