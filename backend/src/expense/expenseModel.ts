import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

export enum ExpenseCategories {
  FURNITURE = 'Furniture',
  GROCERY = 'Grocery',
  HEALTH = 'Health',
  MAINTENANCE = 'Maintenance',
  RENT = 'Rent',
}

@Schema()
export class Expense {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  user: string;

  @Prop()
  category: ExpenseCategories;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
