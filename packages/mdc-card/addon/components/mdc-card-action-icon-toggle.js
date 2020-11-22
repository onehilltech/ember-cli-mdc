import IconButtonToggleComponent from 'ember-cli-mdc-icon-button/components/mdc-icon-button-toggle';

export default class MdcCardActionIconToggleComponent extends IconButtonToggleComponent {
  get type () {
    return 'mdc-card__action mdc-card__action--icon';
  }
}
