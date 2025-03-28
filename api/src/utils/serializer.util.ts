import { ClassConstructor, plainToInstance } from 'class-transformer';

export const serialize = <T = any>(dto: ClassConstructor<T>, data: any) => {
  return plainToInstance(dto, data, {
    excludeExtraneousValues: true,
  });
};
