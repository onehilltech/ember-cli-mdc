import { Button } from 'ember-cli-mdc-button';
import CardAction from '../mixins/card-action';

export default Button.extend (CardAction, {
  classNames: ['mdc-card__action--button']
});
