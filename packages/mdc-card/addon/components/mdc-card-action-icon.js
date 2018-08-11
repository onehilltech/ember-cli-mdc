import CardAction from '../mixins/card-action';
import { IconButton } from 'ember-cli-mdc-icon-button';

export default IconButton.extend (CardAction, {
  classNames: ['mdc-card__action--icon'],

  attributeBindings: ['title'],

  title: null
});
