import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncomeDocument = HydratedDocument<Income>;

enum IncomeCategories {
  SALARY = 'Salary',
  BONUS = 'Bonus',
  FREELANCE = 'Freelance',
}

@Schema()
export class Income {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  user: string;

  @Prop()
  category: IncomeCategories;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
