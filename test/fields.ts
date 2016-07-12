import test from 'ava';
import {fields} from '../src/spectrum';
import {BaseElement} from '../src/base';

class ExampleOneElement extends BaseElement {
    static _name = 'exampleone';

    fields() {
        return {};
    }
}

class ExampleTwoElement extends BaseElement {
    static _name = 'exampletwo';

    fields() {
        return {};
    }
}

test('elementfield creates null value when blank', t => {
    const elementField = new fields.ElementField([ExampleOneElement, ExampleTwoElement], null, true);
    
    t.is(elementField.createDefaultValue(), null);
});

test('elementfield creates default', t => {
    const elementField = new fields.ElementField([ExampleOneElement, ExampleTwoElement], ExampleTwoElement, true);
    const elementFieldBlank = new fields.ElementField([ExampleTwoElement, ExampleOneElement], ExampleTwoElement, false);

    t.true(elementField.createDefaultValue() instanceof ExampleTwoElement);
    t.true(elementFieldBlank.createDefaultValue() instanceof ExampleTwoElement);
});
