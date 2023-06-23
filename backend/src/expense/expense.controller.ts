import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { createExpenseDTO } from './dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() createExpenseDTO: createExpenseDTO,
    @Req() req: Request,
  ) {
    const userId = req['userId'];
    const expense = await this.expenseService.addExpense(
      createExpenseDTO,
      userId,
    );
    return { expense };
  }
}
