export interface DotSelectOption {
    value: string | number;
    text?: string;
    script?: string;
    selected?: boolean;
}

export type DotSelectOptionsLike =
    | Array<string | number>[]
    | Record<string, string | number | Record<string, string>>
    | Record<number, string | number | Record<string, string>>
    | DotSelectOption[];

export type DotSelectRenderType =
    | 'vanilla'
    | 'dropdown'
    | 'list';
