import { Types } from 'mongoose';
import { IncomeCategories } from '../incomeModel';

export class updateIncomeDTO {
  incomeId: Types.ObjectId;
  title: string;
  amount: number;
  date: Date;
  category: IncomeCategories;
}
