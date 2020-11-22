import MdcIconButtonComponent from 'ember-cli-mdc-icon-button/components/mdc-icon-button';

export default class MdcCardActionIconComponent extends MdcIconButtonComponent {
  get type () {
    return 'mdc-card__action mdc-card__action--icon';
  }
}
