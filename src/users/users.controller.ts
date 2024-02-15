import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Roles as ExistingRoles } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(ExistingRoles.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('me')
  me(@Request() req: any): Promise<User | undefined> {
    return this.usersService.findOne(req.user.username);
  }
}
