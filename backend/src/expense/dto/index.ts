import { ExpenseCategories } from '../expenseModel';

export class createExpenseDTO {
  amount: number;
  date: Date;
  user: string;
  category: ExpenseCategories;
}
