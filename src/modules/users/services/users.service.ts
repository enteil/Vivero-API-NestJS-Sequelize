import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { MODELS } from '../../../database/database.module';
import User from 'src/database/entities/auth/user.entity';
import Role from 'src/database/entities/auth/role.entity';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODELS)
    private readonly models: { User: typeof User; Role: typeof Role },
  ) {}

  async list(nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: {
        nurseryId,
      },
      attributes: ['id', 'name', 'lastName', 'email', 'documentNumber'],
      include: [{ model: this.models.Role, attributes: ['id', 'name'] }],
    };
    const result = await this.models.User.findAll(queryBuilder);
    return ResponseDto.ok([...result]);
  }

  async getById(id: number, nurseryId: number): Promise<ResponseDto> {
    const queryBuilder = {
      where: {
        id,
        nurseryId,
      },
      attributes: ['id', 'name', 'lastName', 'email', 'documentNumber'],
      include: [{ model: this.models.Role, attributes: ['id', 'name'] }],
    };
    const result = await this.models.User.findOne(queryBuilder);
    if (!result) {
      return ResponseDto.error('User not found', HttpStatus.NOT_FOUND);
    } else {
      return ResponseDto.ok(result);
    }
  }

  async create(data: CreateUserDto, nurseryId: number): Promise<ResponseDto> {
    const emailAleadyExists = await this.models.User.findOne({
      where: { email: data.email, nurseryId },
    });
    const documentNumberAlreadyExists = await this.models.User.findOne({
      where: { documentNumber: data.documentNumber, nurseryId },
    });
    if (emailAleadyExists) {
      return ResponseDto.error('Email already exists', HttpStatus.BAD_REQUEST);
    }
    if (documentNumberAlreadyExists) {
      return ResponseDto.error(
        'Document number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.models.Role.findOne({ where: { id: data.roleId } });
    if (!role) {
      return ResponseDto.error('Role not found', HttpStatus.BAD_REQUEST);
    }
    const result = await this.models.User.create({ ...data, nurseryId });
    return ResponseDto.ok(result);
  }

  async update(
    id: number,
    data: UpdateUserDto,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const user = await this.models.User.findOne({
      where: { id, nurseryId },
    });
    if (!user) {
      return ResponseDto.error('User not found', HttpStatus.NOT_FOUND);
    }
    const emailAlreadyExists = await this.models.User.findOne({
      where: { email: data.email, nurseryId },
    });
    const documentNumberAlreadyExists = await this.models.User.findOne({
      where: { documentNumber: data.documentNumber, nurseryId },
    });

    if (emailAlreadyExists?.id !== id) {
      return ResponseDto.error('Email already exists', HttpStatus.BAD_REQUEST);
    }
    if (documentNumberAlreadyExists?.id !== id) {
      return ResponseDto.error(
        'Document number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await user.update(data, {
      where: { id, nurseryId },
    });
    return ResponseDto.ok({});
  }

  async delete(id: number, nurseryId: number): Promise<ResponseDto> {
    const user = await this.models.User.findOne({
      where: { id, nurseryId },
    });
    if (!user) {
      return ResponseDto.error('User not found', HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return ResponseDto.ok({});
  }
}
