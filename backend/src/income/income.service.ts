import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './incomeModel';
import mongoose, { Types } from 'mongoose';
import { createIncomeDTO } from './dto';
import { User, UserDocument } from 'src/users/users.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name)
    private incomeModel = mongoose.Model<Income>,
    @InjectModel(User.name)
    private userModel = mongoose.Model<UserDocument>,
  ) {}

  async addIncome(
    createIncomeDto: createIncomeDTO,
    userId: Types.ObjectId,
  ): Promise<Income> {
    const id = userId;

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
    return income.save();
  }
}
