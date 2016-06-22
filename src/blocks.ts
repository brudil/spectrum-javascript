import {BaseElement} from './base';
import * as fields from './fields';
import * as transformers from './transformers';

export abstract class Block extends BaseElement {}

export class HeadingBlock extends Block {
    static _name = 'heading';

    fields() {
        return {
            level: new fields.ChoiceValueField([1, 2, 3, 4, 5, 6], 1, false),
            text: new fields.TextualContentField(transformers.InlinedownTextTransformer, [transformers.InlinedownTextTransformer])
        }
    }
}

export class ImageBlock extends Block {
    static _name = 'image';

    fields() {
        return {
            // TODO: resources: ImageResource
            alt: new fields.TextualContentField(transformers.PlainTextTransformer, [transformers.PlainTextTransformer]),
            title: new fields.TextualContentField(transformers.PlainTextTransformer, [transformers.PlainTextTransformer]),
            caption: new fields.TextualContentField(transformers.InlinedownTextTransformer, [transformers.InlinedownTextTransformer]),
            source: new fields.TextualContentField(transformers.InlinedownTextTransformer, [transformers.InlinedownTextTransformer]),
            sourceURL: new fields.URLValueField(true),
        }
    }
}

export class VideoBlock extends Block {
    static _name = 'video';

    fields() {
        return {
            // TODO: resources: OEmbedResource?
            caption: new fields.TextualContentField(transformers.InlinedownTextTransformer, [transformers.InlinedownTextTransformer]),
        }
    }
}

export class TextBlock extends Block {
    static _name = 'text';

    fields() {
        return {
            text: new fields.TextualContentField(transformers.MarkdownTextTransformer, [transformers.MarkdownTextTransformer]),
        }
    }
}





export const sets = {
    all: [HeadingBlock, ImageBlock, VideoBlock, TextBlock]
};
