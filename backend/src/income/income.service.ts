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

  async createIncome(createIncomeDto: createIncomeDTO): Promise<Income> {
    const { title, amount, date, user, category } = createIncomeDto;
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
