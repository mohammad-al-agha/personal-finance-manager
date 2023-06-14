import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { User, UserDocument } from '../users/users.model'; // Replace 'path-to-user-model' with the actual path to your User model file

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Update the type to reference the User model
  user: UserDocument; // Update the type declaration to UserDocument

  @Prop()
  category: IncomeCategories;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
