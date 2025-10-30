import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<ResponseDto> {
    const nurseryId = 1;
    return await this.usersService.list(nurseryId);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const nurseryId = 1;
    return await this.usersService.getById(+id, nurseryId);
  }

  @Post()
  createUser(@Body() data: CreateUserDto) {
    const nurseryId = 1;
    return this.usersService.create(data, nurseryId);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const nurseryId = 1;
    return this.usersService.update(+id, data, nurseryId);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const nurseryId = 1;
    return this.usersService.delete(+id, nurseryId);
  }
}
