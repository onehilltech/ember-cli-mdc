import MdcButtonComponent from 'ember-cli-mdc-button/components/mdc-button';

export default class MdcCardActionButtonComponent extends MdcButtonComponent {
  get typeClass () {
    return 'mdc-card__action mdc-card__action--button'
  }
}
