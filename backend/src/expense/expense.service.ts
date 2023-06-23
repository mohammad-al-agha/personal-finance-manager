import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseCategories } from './expenseModel';
import mongoose, { Types } from 'mongoose';
import { createExpenseDTO } from './dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: mongoose.Model<Expense>,
  ) {}

  async addExpense(
    createExpenseDto: createExpenseDTO,
    userId: Types.ObjectId,
  ): Promise<Expense> {
    const id = userId;

    //Extracting the props from the DTO
    const { title, amount, date, category } = createExpenseDto;

    //creating a new expense
    const expense = new this.expenseModel({
      title,
      amount,
      date,
      user: id,
      category,
    });
    return expense.save();
  }
}
