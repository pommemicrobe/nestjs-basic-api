import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signIn: Record<string, any>) {
    return this.authService.signIn(signIn.username, signIn.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUp: Record<string, any>) {
    return this.authService.signUp(signUp.username, signUp.password);
  }
}
