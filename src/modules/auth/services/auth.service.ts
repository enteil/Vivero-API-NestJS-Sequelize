import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.dto';
import {
  Permission,
  Role,
  RolePermission,
  Session,
  User,
} from 'src/database/entities/init-models';
import { MODELS } from 'src/database/database.module';
import { ResponseDto } from 'src/dto/response/standarReponse.dto';
import { comparePassword } from 'src/helpers/bcrypt.helper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODELS)
    private readonly models: {
      User: typeof User;
      Session: typeof Session;
      Role: typeof Role;
      RolePermission: typeof RolePermission;
      Permission: typeof Permission;
    },
  ) {}
  async listRoles() {
    const roles = await this.models.Role.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    return ResponseDto.ok(roles);
  }
  async login(
    data: LoginRequestDto,
    ip: string,
    nurseryId: number,
  ): Promise<ResponseDto> {
    const user = await this.models.User.findOne({
      where: { email: data.email, nurseryId },
      attributes: ['id', 'name', 'lastName', 'password', 'roleId', 'nurseryId'],
      raw: true,
    });
    console.log('🚀 ~ AuthService ~ login ~ user:', user);
    if (!user) {
      return ResponseDto.error('User not found', HttpStatus.NOT_FOUND);
    }
    const compare = await comparePassword(data.password, user.password);
    if (!compare) {
      return ResponseDto.error('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const role = await this.models.RolePermission.findOne({
      where: { roleId: user.roleId },
      attributes: ['id', 'name'],
      include: [
        {
          model: this.models.Permission,
          attributes: ['code'],
        },
      ],
    });
    console.log('🚀 ~ AuthService ~ login ~ role:', role);
    const session: any = await this.models.Session.create({
      ip,
      userId: user.id,
    });

    return ResponseDto.ok({
      token: session.token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
      },
    });
  }
  // async register() {
  //   return 'register';
  // }
  // async logout() {}
}
