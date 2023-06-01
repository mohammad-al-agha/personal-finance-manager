import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL)],
})
export class AppModule {}
