import { HttpException, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './incomeModel';
import mongoose, { Types } from 'mongoose';
import { createIncomeDTO } from './dto/createIncome';
import { User, UserDocument } from '../users/users.model';

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

  async getIncomes(userId: Types.ObjectId) {
    //getting the user by id
    const user = await this.userModel.findById(userId);

    //checking if the user exists
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user.incomes;
  }
}
