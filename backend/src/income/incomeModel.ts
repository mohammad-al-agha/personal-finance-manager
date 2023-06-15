import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { UserDocument } from '../users/users.model';

export type IncomeDocument = HydratedDocument<Income> & Document;

export enum IncomeCategories {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop()
  category: IncomeCategories;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
