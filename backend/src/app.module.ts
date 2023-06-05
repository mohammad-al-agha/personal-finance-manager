import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), ExpenseModule],
})
export class AppModule {}
