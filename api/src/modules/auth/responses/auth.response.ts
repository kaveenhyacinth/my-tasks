import { BaseResponse } from '../../../common/responses/base.response';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export class AuthResponse extends BaseResponse {
  constructor(auth: AuthResponseDto) {
    super(auth);
  }
}
