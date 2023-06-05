import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), IncomeModule],
})
export class AppModule {}
