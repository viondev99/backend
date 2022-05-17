import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalStrategy } from './strategy/local.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalStrategy)
  @Post('/login')
  async logIn(@Request() req) {
    try {
      const { user } = req.body;
      const userAuthenticated = await this.authService.validateUser(
        user.email,
        user.pass,
      );
      // console.log(user.user.email);
      return this.authService.login(userAuthenticated);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.createNewUser(dto);
  }
}
