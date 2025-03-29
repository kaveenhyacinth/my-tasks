import { BaseResource } from '../../../common/resources/base.resource';
import { TokenResponseDto } from '../dtos/token-response.dto';

export class TokenResource extends BaseResource {
  constructor(token: TokenResponseDto) {
    super({ token });
  }
}
