import { User } from 'src/users/users.model';
import { IncomeCategories } from '../incomeModel';

export class createIncomeDTO {
  title: string;
  amount: number;
  date: Date;
  category: IncomeCategories;
}
