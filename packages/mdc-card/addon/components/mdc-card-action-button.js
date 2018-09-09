import ButtonComponent from 'ember-cli-mdc-button/components/mdc-button';
import CardAction from '../mixins/card-action';

export default ButtonComponent.extend (CardAction, {
  classNames: ['mdc-card__action--button']
});
