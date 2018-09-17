import ButtonLinkComponent from 'ember-cli-mdc-button/components/mdc-button-linkto';
import CardAction from '../mixins/card-action';

export default ButtonLinkComponent.extend (CardAction, {
  classNames: ['mdc-card__action--button']
});
