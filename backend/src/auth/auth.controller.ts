import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/signUpDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() data: signUpDTO): Promise<object> {
    const response = await this.authService.signUP(data);
    return response;
  }
}
