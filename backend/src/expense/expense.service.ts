import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense, ExpenseCategories } from './expenseModel';
import mongoose, { Types } from 'mongoose';
import { createExpenseDTO } from './dto/createExpense';
import { User } from '../users/users.model';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: mongoose.Model<Expense>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async addExpense(
    createExpenseDto: createExpenseDTO,
    userId: Types.ObjectId,
  ): Promise<Expense> {
    const id = userId;

    //getting hthe user by id
    const user = await this.userModel.findById(id);

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

    //adding the new espense to the list of expenses that this user has
    user.expenses.push(expense);

    //saving the updated user
    await user.save();

    return expense.save();
  }

  async getExpenses(userId: Types.ObjectId) {
    //getting the user id from the request
    const user = await this.userModel.findById(userId);

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 400);
    }

    return user.expenses;
  }
}
