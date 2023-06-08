import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './incomeModel';
import mongoose from 'mongoose';
import { createIncomeDTO } from './dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name)
    private incomeModel = mongoose.Model<Income>,
  ) {}

  async addIncome(createIncomeDto: createIncomeDTO): Promise<Income> {
    //Extracting the props from the DTO
    const { title, amount, date, user, category } = createIncomeDto;

    //creating a new income
    const income = new this.incomeModel({
      title,
      amount,
      date,
      user,
      category,
    });
    return income.save();
  }
}
