import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseCategories } from './expenseModel';
import mongoose from 'mongoose';
import { createExpenseDTO } from './dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: mongoose.Model<Expense>,
  ) {}

  async addExpense(createExpenseDto: createExpenseDTO): Promise<Expense> {
    const { title, amount, date, user, category } = createExpenseDto;
    const expense = new this.expenseModel({
      title,
      amount,
      date,
      user,
      category,
    });
    return expense.save();
  }
}
