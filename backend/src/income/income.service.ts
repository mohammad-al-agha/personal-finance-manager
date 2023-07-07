import { HttpException, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './incomeModel';
import mongoose, { Promise, Types } from 'mongoose';
import { createIncomeDTO } from './dto/createIncome';
import { User, UserDocument } from '../users/users.model';
import { updateIncomeDTO } from './dto/updateIncomeDTO';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name)
    private incomeModel: mongoose.Model<Income>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async addIncome(
    createIncomeDto: createIncomeDTO,
    userId: Types.ObjectId,
  ): Promise<Income> {
    const id = userId;

    //getting teh user by id
    const user = await this.userModel.findById(userId);

    //Extracting the props from the DTO
    const { title, amount, date, category } = createIncomeDto;

    //creating a new income
    const income = new this.incomeModel({
      title,
      amount,
      date,
      user: id,
      category,
    });

    //adding the new income to the list of expenses that this user has
    user.incomes.push(income);

    //saving the updated user
    await user.save();

    return income.save();
  }

  async getIncomes(userId: Types.ObjectId): Promise<Income[]> {
    //getting the user by id
    const user = await this.userModel.findById(userId);

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user.incomes;
  }

  async deleteIncome(
    userId: Types.ObjectId,
    incomeId: Types.ObjectId,
  ): Promise<Income[]> {
    //getting the user by id
    const user = await this.userModel.findById(userId);

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    //getting the income by id
    const income = await this.incomeModel.findById(incomeId);

    //checking if the income exists
    if (!income) {
      throw new HttpException('No such income', 404);
    }

    // Remove the income from the user's income array
    const removedIncomes = user.incomes.filter(
      (i) => i.toString() !== incomeId.toString(),
    );

    //then checking if it was there
    if (removedIncomes.length === user.incomes.length) {
      throw new HttpException('No such income for this user', 404);
    }

    //updating the user's income array
    user.incomes = removedIncomes;

    //saving all changes
    await Promise.all([
      user.save(),
      this.incomeModel.findByIdAndDelete(incomeId),
    ]);

    return user.incomes;
  }

  async editIncome(
    userId: Types.ObjectId,
    incomeId: Types.ObjectId,
    updateIncomeDTO: updateIncomeDTO,
  ): Promise<Income[]> {
    //getting the user by id
    const user = await this.userModel.findById(userId).populate('incomes');

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    //getting the income by id
    let income = await this.incomeModel.findById(incomeId);

    //checking if the income exists
    if (!income) {
      throw new HttpException('No such income', 404);
    }

    //searching for the income in the array of incomes of the user
    const incomeIndex = user.incomes.findIndex(
      (income) => income['_id'].toString() === incomeId.toString(),
    );
    //then checking if it exists
    if (incomeIndex === -1) {
      throw new HttpException('No such income for this user', 404);
    }

    //updating the values after insuring that this income is for this user
    income.title = updateIncomeDTO.title;
    income.amount = updateIncomeDTO.amount;
    income.date = updateIncomeDTO.date;
    income.category = updateIncomeDTO.category;

    //updating the income for the user
    user.incomes[incomeIndex] = income;

    //saving all changes
    await user.save();
    await income.save();

    return user.incomes;
  }
}
