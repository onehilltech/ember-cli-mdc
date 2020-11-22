import { modifier } from 'ember-modifier';

const MDC_CARD_PRIMARY_ACTION_CLASSNAME = 'mdc-card__primary-action';

export default modifier(function mdcCardPrimaryAction(element/*, params, hash*/) {
  if (!element.classList.contains (MDC_CARD_PRIMARY_ACTION_CLASSNAME))
    element.classList.add (MDC_CARD_PRIMARY_ACTION_CLASSNAME);

  element.setAttribute ('tabindex', 0);
});
