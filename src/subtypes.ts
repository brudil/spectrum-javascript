import {BaseElement} from './base';
import * as fields from './fields';
import * as sections from './sections';
import * as blocks from './blocks';

export abstract class Subtype extends BaseElement {}

export class ArticleSubtype extends Subtype {
    static _name = 'article';

    fields() {
        return {
            stream: new fields.FieldStreamField(new fields.ElementField(sections.sets.all))
        }
    }
}

export class VideoSubtype extends Subtype {
    static _name = 'video';

    fields() {
        return {
            featuredVideo: new fields.ElementField([blocks.VideoBlock], blocks.VideoBlock),
            stream: new fields.FieldStreamField(new fields.ElementField(sections.sets.all))
        }
    }
}

export const sets = {
    all: [ArticleSubtype, VideoSubtype, ]
};
