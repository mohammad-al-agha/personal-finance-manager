import { Types } from 'mongoose';
import { ExpenseCategories } from '../expenseModel';

export class updateExpenseDto {
  expenseId: Types.ObjectId;
  title: string;
  amount: number;
  date: Date;
  category: ExpenseCategories;
}
