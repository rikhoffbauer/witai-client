export interface WitAIParseResponse {
    text?: string;
    intents?: Intent[];
    entities?: Record<string, Entity[]>;
    traits?: Record<string, Trait[]>;
}

export interface Entity {
    id?: string;
    name?: string;
    role?: string;
    start?: number;
    end?: number;
    body?: string;
    confidence?: number;
    value?: string;
    type?: string;
    entities?: Entity[];
}

export interface Intent {
    id?: string;
    name?: string;
    confidence?: number;
}

export interface Trait {
    id?: string;
    value?: string;
    confidence?: number;
}
