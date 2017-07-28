import {BaseElement} from './base';
import * as fields from './fields';
import * as sections from './sections';
import * as blocks from './blocks';
import * as resources from './resources';

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

export class CanvasSubtype extends Subtype {
    static _name = 'canvas';

    fields() {
        return {
            resource: new fields.ElementField([resources.LowdownInteractiveResource], resources.LowdownInteractiveResource),
            viewMode: new fields.ChoiceValueField(['CONTENT', 'CONTAINER', 'CANVAS'], 'CONTAINER')
        }
    }
}


export const sets = {
    all: [ArticleSubtype, VideoSubtype, CanvasSubtype]
};
