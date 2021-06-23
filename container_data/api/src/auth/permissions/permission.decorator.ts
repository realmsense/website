import { SetMetadata } from "@nestjs/common";
import { Permission } from "./permission.enum";

export const PERMISSION_KEY = "permission";
export const RequirePermission = (permission: Permission) => SetMetadata(PERMISSION_KEY, permission);
