import {BaseElement} from './base';
import * as fields from './fields';
import * as subtypes from './subtypes';

export default class SpectrumDocument extends BaseElement {
    fields() {
        return {
            content: new fields.ElementField(subtypes.sets.all)
        }
    }

    toJS() {
        return {
            version: 1,
            content: this.serializeField('content'),
            _id: this._id
        }
    }

    static fromJS(structure: Object): SpectrumDocument {
        const doc = new SpectrumDocument();
        doc.parse(structure);

        return doc;
    }
}
