import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @IsPublic()
  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.userService.findByEmail(email);
  // }
}
