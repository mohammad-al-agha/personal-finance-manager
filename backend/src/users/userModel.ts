import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Income } from 'src/income/incomeModel';
import { Expense } from 'src/expense/expenseModel';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  balance: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }] })
  incomes: Income[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }] })
  expenses: Expense[];
}

export const UserSchema = SchemaFactory.createForClass(User);
