import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    ExpenseModule,
    IncomeModule,
    AuthModule,
  ],
})
export class AppModule {}
