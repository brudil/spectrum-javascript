import { BaseElement, ResourceInterface } from './base';
import * as fields from './fields';

export abstract class Resource extends BaseElement implements ResourceInterface {
    getResourceData() {
        return {};
    }
}

export class LowdownImageResource extends Resource {
    static _name = 'lowdownimage';
    
    fields() {
        return {
            id: new fields.IntegerField(),
        }
    }
}
