import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOWED_ROLES_KEY } from '../../common/decorators/allowed-roles.decorator';
import { Request } from 'express';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { RoleService } from '../../modules/role/role.service';

/**
 * RolesGuard
 * !DISCLAIMER: This should always be used after the AuthGuard
 * !DISCLAIMER: This should always be used in conjunction with the AllowedRoles decorator
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.geRequiredRoles(context);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as JwtPayload;

    try {
      const role = await this.roleService.findById(user?.role);
      if (!requiredRoles.includes(role?.roleName))
        throw new UnauthorizedException('Unauthorized');
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  geRequiredRoles(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<string[]>(ALLOWED_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
