import { Permission } from "../../../auth/models/permission";

export interface User {
    id: number;
    username: string;
    // password: string;
    permissions: Permission[];
    enabled: boolean;
}
