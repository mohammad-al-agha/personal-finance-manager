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

    //checking if the user exsists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

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
    //getting the user by id
    const user = await this.userModel.findById(userId);

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user.expenses;
  }

  async deleteExpense(userId: Types.ObjectId, expenseId: Types.ObjectId) {
    //getting hthe user by id
    const user = await this.userModel.findById(userId);

    //checking if the user exsists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    //gettimg the expense by id
    const expense = await this.expenseModel.findById(expenseId);

    //checking if the expense exists
    if (!expense) {
      throw new HttpException('No such expense', 404);
    }

    // Remove the expense from the user's expenses array
    const removedExpenses = user.expenses.filter(
      (exp) => exp.toString() !== expenseId.toString(),
    );
    // then check if it was found
    if (removedExpenses.length === user.expenses.length) {
      throw new HttpException('No such expense for this user', 404);
    }

    //update the user's expenses array
    user.expenses = removedExpenses;

    //saving all changes
    await Promise.all([
      user.save(),
      this.expenseModel.findByIdAndDelete(expenseId),
    ]);

    return user.expenses;
  }
}
