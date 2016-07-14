import {assign} from 'lodash';
import {Transformer, TransformerConstructor, TransformerInterface} from './transformers';
import {BaseElement, ElementConstructor, ElementInterface} from './base';

export type ElementList = Array<ElementConstructor>;

export abstract class Field {
    abstract toJS(value: any): Object;
    abstract createDefaultValue(): any;
    abstract isValid(value: any): boolean;
    abstract parse(structure: any): any;
}

function getElementFromName(list: Array<any>, name: string): any {
    for (const element of list) {
        if (element._name === name) {
            return element;
        }
    }

    return null;
}

export class ElementField extends Field {
    limitTo: ElementList;
    defaultElement: ElementConstructor;
    blank: boolean;

    constructor(limitTo:ElementList, defaultElement:ElementConstructor=null, blank=false) {
        super();
        this.limitTo = limitTo;
        this.defaultElement = defaultElement;
        this.blank = blank;
    }

    toJS(value: BaseElement) {
        if (value === null) {
            return null;
        }
        const constructor = <ElementConstructor> value.constructor;
        return assign({
            '_name': constructor._name,
            '_id': value.getUUID()
        }, value.toJS());
    }

    createDefaultValue(): ElementInterface {
        if (this.defaultElement === null) {
            return null;
        }

        return new this.defaultElement();
    }

    isValid(value: ElementInterface) {
        return value.isValid();
    }

    parse(structure: any) {
        if (structure === null) {
            if (this.blank === true) {
                return null;
            } else {
                throw 'Structure is illegally none';
            }
        }

        const name = structure['_name'];
        let element = getElementFromName(this.limitTo, name);

        if (element === null) {
            throw `Element "${name}" not listed in limits: ${this.limitTo}`;
        }

        element = new element();

        element.parse(structure);

        return element;
    }
}

export class FieldStreamField extends Field {
    itemField: Field;
    constructor(itemField: Field) {
        super();
        this.itemField = itemField;
    }

    createDefaultValue(): any {
        return [];
    }

    toJS(value: any) {
        const list: any[] = [];

        for(const valueItem of value) {
            list.push(this.itemField.toJS(valueItem));
        }

        return list;
    }

    isValid(value: Array<any>) {
        for (const valueItem of value) {
            if (this.itemField.isValid(valueItem) === false) {
                return false;
            }
        }

        return true;
    }

    parse(structure: any) {
        const list: any[] = [];

        for(const item of structure) {
            list.push(this.itemField.parse(item));
        }

        return list;
    }
}

export abstract class ValueField extends Field {
    blank:boolean;

    toJS(value:any) {
        return value;
    }

    parse(structure:any) {
        return structure;
    }

    isValid(value:any) {
        if (this.blank === true && value !== null) {
            return false;
        }
    }
}

export class IntegerField extends ValueField {
    createDefaultValue(): number {
        return null;
    }
}

export class ChoiceValueField extends ValueField {
    choices: Array<any>;
    defaultValue: any;

    constructor(choices:Array<any>=null, defaultValue:any=null, blank:boolean=false) {
        super();
        
        if (defaultValue === null && blank === false) {
            throw 'Either field should be allow blank values or supply default value';
        }

        if (defaultValue !== null) {
            // ensure default value is in the allowed values
            if (choices.indexOf(defaultValue) === -1) {
                throw `Default value "${defaultValue}" not in choices`;   
            }
        }

        this.choices = choices;
        this.defaultValue = defaultValue;
        this.blank = blank;
    }

    createDefaultValue() {
        return this.defaultValue || null;
    }

    isValid(value: string) {
        if (!super.isValid(value)) {
            return false;
        }

        if (this.choices.indexOf(value) === -1) {
            return false;
        }

        return true;
    }
}

export class URLValueField extends ValueField {
    constructor(blank:boolean=false) {
        super();
        this.blank = blank;
    }

    createDefaultValue(): string {
        return null;
    }

    isValid(value: string) {
        if (!super.isValid(value)) {
            return false;
        }

        // TODO: URL validation
        return true;
    }
}

export class TransformerData {
    transformer: TransformerConstructor;
    text: string;

    constructor(transformer: TransformerConstructor, text='') {
        this.transformer = transformer;
        this.text = text;
    }

    getTransformerName() {
        return this.transformer._name;
    }

    getText() {
        return this.text;
    }
}

export class TextualContentField extends Field {
    defaultTransformer: TransformerConstructor;
    transformers: Array<TransformerConstructor>;

    constructor(defaultTransformer: TransformerConstructor, transformers: Array<TransformerConstructor>) {
        super();
        this.defaultTransformer = defaultTransformer;
        this.transformers = transformers;
    }

    toJS(value: TransformerData) {
        return {
            '_name': 'text',
            transformer: value.getTransformerName(),
            text: value.getText()
        }
    }

    createDefaultValue() {
        return new TransformerData(this.defaultTransformer);
    }

    mapTransformerToName(name: String) {
        const expectedName = this.defaultTransformer._name;
        if (name === expectedName) {
            return this.defaultTransformer;
        }

        throw `Only default transformer supported at the moment. (given ${name}, expected ${expectedName})`;
    }

    parse(structure: any): TransformerData {
        return new TransformerData(this.mapTransformerToName(structure['transformer']), structure['text']);
    }

    isValid() {
        return true;
    }
}

