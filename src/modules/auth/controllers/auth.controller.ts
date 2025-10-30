import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { LoginRequestDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('list-roles')
  async listRoles(): Promise<ResponseDto> {
    return await this.authService.listRoles();
  }

  @Post('login')
  async login(
    @Body() data: LoginRequestDto,
    @Ip() ip: string,
  ): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.authService.login(data, ip, nurseryId);
  }

  // @Post('register')
  // register(): ResponseDto {
  //   return 'register';
  // }

  // @Post('logout')
  // logout(): ResponseDto {
  //   return 'logout';
  // }
}
