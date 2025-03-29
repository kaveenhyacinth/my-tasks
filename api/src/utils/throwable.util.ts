import { InternalServerErrorException, Logger } from '@nestjs/common';

export class Throwable {
  private logger: Logger;

  constructor(private readonly scope: string = 'Throwable') {
    this.logger = new Logger(scope);
  }

  throwError(error: any, fallbackMessage: string = 'Something went wrong!') {
    this.logger.error(error);

    if (error?.response) {
      throw error;
    }

    throw new InternalServerErrorException(
      error?.message ?? fallbackMessage ?? 'Something went wrong',
    );
  }
}
