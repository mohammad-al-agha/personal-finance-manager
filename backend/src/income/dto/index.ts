import { IncomeCategories } from '../incomeModel';

export class createIncomeDTO {
  title: string;
  amount: number;
  date: Date;
  user: string;
  category: IncomeCategories;
}
