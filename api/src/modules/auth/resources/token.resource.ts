import { BaseResource } from '../../../common/base.resource';

export class TokenResource extends BaseResource {
  constructor(token: string) {
    super({ token });
  }
}
