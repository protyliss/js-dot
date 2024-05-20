
export type StyleProperties = Partial<Record<keyof CSSStyleDeclaration, string | number>>;
export type JsStyleRules = Record<string, StyleProperties | {toRule: (selector: string) => string}>;
