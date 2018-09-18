import IconButtonToggleComponent from 'mdc-icon-button/components/mdc-icon-button-toggle';
import CardAction from '../mixins/card-action';

export default IconButtonToggleComponent.extend (CardAction, {
  classNames: ['mdc-card__action--icon']
});
