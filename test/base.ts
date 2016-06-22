import test from 'ava';
import {BaseElement} from '../src/base';
import {fields} from '../src/spectrum';

class ExamplePersonElement extends BaseElement {
    static _name = 'person';

    fields() {
        return {
            dominantHand: new fields.ChoiceValueField(['right', 'left', 'ambidextrous', 'mixed'], 'right')
        }
    }
}

test('basic property serialization', t => {
    const person = new ExamplePersonElement();
    person['dominantHand'] = 'foo';
    t.deepEqual(person.toJS(), <Object> {dominantHand: 'foo'}) 
});


