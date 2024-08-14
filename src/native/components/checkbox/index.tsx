import {CheckBoxBase} from './CheckboxBase';
import {CheckBoxRadio} from './CheckboxRadio';

const CheckBox = Object.assign(CheckBoxBase, {
  Radio: CheckBoxRadio,
});

export {CheckBox};
