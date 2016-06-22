import {BaseElement} from './base';
import * as fields from './fields';
import * as blocks from './blocks';

export abstract class Section extends BaseElement {}

export class FreeformSection extends Section {
    static _name = 'freeform';

    fields() {
        return {
            stream: new fields.FieldStreamField(new fields.ElementField(blocks.sets.all))
        }
    }
}

export class ListSectionItem extends BaseElement {
    static _name = 'listitem';

    fields() {
        return {
            title: new fields.ElementField([blocks.HeadingBlock], blocks.HeadingBlock),
            stream: new fields.FieldStreamField(new fields.ElementField(blocks.sets.all))
        };
    }
}

export class ListSection extends Section {
    static _name = 'list';

    fields() {
        return {
            stream: new fields.FieldStreamField(new fields.ElementField(blocks.sets.all)),
            points: new fields.ChoiceValueField(['alpha', 'numbers', 'roman'], 'alpha'),
            order: new fields.ChoiceValueField(['az', 'za'], 'az')
        }
    }
}



export const sets = {
    all: [FreeformSection, ListSection, ]
};
