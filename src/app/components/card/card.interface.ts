export interface Card {
    name: string;
    color: "bg-primary" | "bg-secondary" | "bg-success" | "bg-info" | "bg-warning" | "bg-danger" | "bg-dark",
    link: string,
    sub: string;
    icon: string;
    value: number | string;
}