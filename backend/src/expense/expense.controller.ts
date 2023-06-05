import { Controller, Post, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { createExpenseDTO } from './dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(@Body() createExpenseDTO: createExpenseDTO) {
    const expense = await this.expenseService.addExpense(createExpenseDTO);
    return { expense };
  }
}
