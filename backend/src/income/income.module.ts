import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Income, IncomeSchema } from './incomeModel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Income.name, schema: IncomeSchema }]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
