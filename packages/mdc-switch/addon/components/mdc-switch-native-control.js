import Checkbox from '@ember/component/checkbox';

export default class MdcSwitchNativeControlComponent extends Checkbox {
  classNames = ['mdc-switch__native-control'];

  didInsertElement () {
    super.didInsertElement (...arguments);

    this.element.setAttribute ('role', 'switch');
  }
}
