export interface INazgulPlugin {
    initialize(): boolean;
    onController(tag: string, path?: string): boolean;
}
