import uuid from './uuid';

export interface ElementConstructor {
    new(...args: any[]): ElementInterface;
    _name: string;
}

export interface ElementInterface {
    toJS: Object;
    isValid(): boolean;
    [key: string]: any;
}

export interface SerializedInterface {
    [key: string]: any;
}

export interface FieldInterface {
    createDefaultValue(): any;
    toJS(value: any): SerializedInterface
    isValid(value: any): boolean;
    parse(structure: Object): void
}

export interface FieldMapInterface {
    [key: string]: FieldInterface;
}

/**
 * BaseElement
 */
export abstract class BaseElement implements ElementInterface {
    _fields: FieldMapInterface;
    _id: string;
    private _name: string;

    constructor(...kwags: any[]) {
        this._fields = <FieldMapInterface> this.fields();
        this._id = uuid();

        for (const fieldName of Object.keys(this._fields)) {
            this[fieldName] = this._fields[fieldName].createDefaultValue();
        }

        for (const fieldName of Object.keys(kwags)) {
            if (this._fields.hasOwnProperty(fieldName)) {
                this._fields[fieldName] = kwags[fieldName];
            }
        }
    }

    toJS(): Object {
        const output = {};
        for (const fieldName of Object.keys(this._fields)) {
            output[fieldName] = this.serializeField(fieldName);
        }

        return output;
    }

    serializeField(fieldName: string): Object {
        return this._fields[fieldName].toJS(this[fieldName]);
    }

    getUUID(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }
    
    parse(structure: Object) {
        if (structure.hasOwnProperty('_id')) {
            this._id = structure['_id'];
        } else {
            throw 'No _id in structure';
        }

        for (const fieldName of Object.keys(this._fields)) {
            this[fieldName] = this._fields[fieldName].parse(structure[fieldName]);
        }
    }

    isValid(): boolean {
        for (const fieldName of Object.keys(this._fields)) {
            if (!this._fields[fieldName].isValid(this[fieldName])) {
                return false;
            }
        }

        return true;
    }

    abstract fields(): Object;
}
