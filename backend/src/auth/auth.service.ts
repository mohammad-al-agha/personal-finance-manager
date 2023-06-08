import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/users.model';
import { signUpDTO } from './dto/signUpDTO';
import * as bcrypt from 'bcrypt';
import { EmailValidation, PasswordValidation } from './dto/regex';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUP(data: signUpDTO): Promise<object> {
    //checking the email regex
    const emailCheck = EmailValidation(data.email);
    if (!emailCheck) {
      throw new HttpException('Invalid email format', 400);
    }

    //checking the password regex
    const passwordCheck = PasswordValidation(data.password);
    if (!passwordCheck) {
      throw new HttpException(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
        400,
      );
    }

    // Validating the confirm password
    if (data.password !== data.confirmPassword) {
      throw new HttpException(
        'Password and confirm password are not the same',
        400,
      );
    }

    // Checking if the user is already registered
    const check = await this.userModel.findOne({ email: data.email });
    if (check) {
      throw new HttpException('User already exists', 400);
    }

    const { password, ...load } = data; // extracting the password from the data

    const hashedPassword = await bcrypt.hash(password, 10); // hashing the password

    // creating a new user
    const user = await this.userModel.create({
      ...load,
      password: hashedPassword,
      balance: 0,
    });

    //generating a new token
    const payload = { userId: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    //creating a new user without exposing the hashed password
    const userResponse = {
      userName: user.userName,
      email: user.email,
      balance: user.balance,
      incomes: user.incomes,
      expenses: user.expenses,
    };

    return { userResponse, token };
  }
}
