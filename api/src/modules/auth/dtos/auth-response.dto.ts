import { Expose } from 'class-transformer';
import { ROLE } from '../../../enums/role.enum';

export class AuthResponseDto {
  @Expose()
  token: string;

  @Expose()
  role: ROLE;
}
