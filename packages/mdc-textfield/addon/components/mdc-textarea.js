import MdcTextFieldComponent from './mdc-textfield';

export default class MdcTextareaComponent extends MdcTextFieldComponent {
  get resizable () {
    const { resizable = true } = this.args;
    return resizable;
  }
}
