import { ExpenseCategories } from '../expenseModel';

export class createExpenseDTO {
  title: string;
  amount: number;
  date: Date;
  category: ExpenseCategories;
}
