export type IconSchema = Record<string, {
    readonly code: string;
    readonly color: string;
    readonly official_name: string;
    readonly thai_name: string;
    readonly nice_name: string;
    readonly symbol?: string;
}>;