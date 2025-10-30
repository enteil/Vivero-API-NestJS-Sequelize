import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T = unknown> {
  status: number;
  message: string;
  data: T;

  constructor(args?: { status?: number; message?: string; data?: T }) {
    const { status, message, data } = args ?? {};
    this.status = typeof status === 'number' ? status : HttpStatus.OK;
    this.message = typeof message === 'string' ? message : 'Ok';
    this.data = (data as T)!;
  }

  static ok<T = unknown>(data: T, message = 'Ok'): ResponseDto<T> {
    return new ResponseDto<T>({ status: HttpStatus.OK, message, data });
  }

  static error(message = 'Error', status: HttpStatus) {
    return new ResponseDto<unknown[]>({ status, message, data: [] });
  }
}
