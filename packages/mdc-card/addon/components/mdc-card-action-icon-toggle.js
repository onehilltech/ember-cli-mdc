import { IconButtonToggle } from 'ember-cli-mdc-icon-button';
import CardAction from '../mixins/card-action';

export default IconButtonToggle.extend (CardAction, {
  classNames: ['mdc-card__action--icon']
});
