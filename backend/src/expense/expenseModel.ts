import mongoose, { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '../users/users.model';

export type ExpenseDocument = HydratedDocument<Expense> & Document;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop()
  category: ExpenseCategories;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
