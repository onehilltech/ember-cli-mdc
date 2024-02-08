import MdcButtonComponent from 'ember-cli-mdc-button/components/mdc-button';

export default class MdcDialogButtonComponent extends MdcButtonComponent {
  doPrepareElement (element) {
    const {
      default: isDefaultButton = false,
      initialFocus = false
    } = this.args;

    if (isDefaultButton) {
      element.setAttribute ('data-mdc-dialog-button-default', '');
    }

    if (initialFocus) {
      element.setAttribute ('data-mdc-dialog-initial-focus', '');
    }
  }

  get kind () {
    return 'mdc-dialog__button';
  }
}
