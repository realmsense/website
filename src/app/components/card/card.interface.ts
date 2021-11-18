import { BootstrapColor } from "../../models/bootstrap-colors";

export interface Card {
    name: string;
    color: BootstrapColor,
    link: string,
    sub: string;
    icon: string;
    value: number | string;
}