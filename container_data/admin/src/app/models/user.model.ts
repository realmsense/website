import { Permission } from "./permission";

export interface User {
    id: number;
    username: string;
    // password: string;
    permissions: Permission[];
    enabled: boolean;
}
