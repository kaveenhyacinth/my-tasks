import { BaseResource } from '../../../common/resources/base.resource';

export class TokenResource extends BaseResource {
  constructor(token: string) {
    super({ token });
  }
}
