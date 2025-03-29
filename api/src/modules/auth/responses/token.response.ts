import { BaseResponse } from '../../../common/responses/base.response';
import { TokenResponseDto } from '../dtos/token-response.dto';

export class TokenResponse extends BaseResponse {
  constructor(token: TokenResponseDto) {
    super({ token });
  }
}
