import { BuildType } from "./buildType.model";

export interface Build {
    id: number;
    name: string;
    type: BuildType;
    file_size: number;
    file_path: string;
    enabled: boolean;
}
