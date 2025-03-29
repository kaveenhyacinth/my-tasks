import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';

export function Restricted() {
  return UseGuards(AuthGuard, RolesGuard);
}
