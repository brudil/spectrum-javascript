import {BaseElement} from './base';

export interface TransformerConstructor {
    new(): TransformerInterface;
    _name: string
}

export interface TransformerInterface {
    getName(): string
}

export abstract class Transformer {
    abstract getName(): String
}

export class InlinedownTextTransformer extends Transformer {
    static _name = 'inline';

    getName() {
        return 'inline';   
    };
}

export class MarkdownTextTransformer extends Transformer {
    static _name = 'markdown';

    getName() {
        return 'markdown';   
    };
}

export class PlainTextTransformer extends Transformer {
    static _name = 'plain';
    
    getName() {
        return 'plain';   
    };
}
