import LinkComponent from '@ember/routing/link-component';
import CardAction from '../mixins/card-action';

export default LinkComponent.extend (CardAction {
  classNames: ['mdc-card__action--button']
});
