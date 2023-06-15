import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.validateRequest(req);
  }

  async validateRequest(request: any): Promise<boolean> {
    try {
      const authorization = request.headers['authorization'];

      if (!authorization) {
        throw new HttpException(
          'Authorization header missing',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const [bearer, token] = authorization.split(' ');

      if (!token || bearer !== 'Bearer') {
        throw new HttpException(
          'Invalid authorization header format',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = await this.jwtService.verify(token);

      return payload.userId;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
