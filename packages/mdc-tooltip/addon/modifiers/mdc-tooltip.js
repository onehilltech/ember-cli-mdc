import { Modifier, ModifierState } from 'ember-cli-mdc-base';
import { guidFor } from '@ember/object/internals';
import { MDCTooltip } from '@material/tooltip';

class PlainTooltipModifierState extends ModifierState {
  didEnterState () {
    // Determine what attribute name to use. We want to hide the tooltip from the screen
    // reader if the label and tooltip have the same content.
    const label = this.element.getAttribute ('aria-label');
    const attrName = label === this.tooltipText ? 'data-tooltip-id' : 'aria-describedby';

    // Set the attributes on the target element.
    this.element.setAttribute (attrName, this.tooltipId);

    // Create the tooltip html element.
    this._createTooltipElement ();
  }

  get tooltipId () {
    return this.modifier.tooltipId;
  }

  get tooltipText () {
    return this.modifier.args[0];
  }

  willDestroy () {
    if (!!this.tooltipElement) {
      this.tooltipElement.remove ();
      this.tooltipElement = null;
    }
  }

  /**
   * Helper method that creates the tooltip element.
   *
   * @private
   */
  _createTooltipElement () {
    const html = `<div id="${this.tooltipId}" class="mdc-tooltip" role="tooltip" aria-hidden="true">` +
      `<div class="mdc-tooltip__surface mdc-tooltip__surface-animation">${this.tooltipText}</div>` +
    '</div>';

    const tooltipFragment = document.createRange ().createContextualFragment (html);
    this.tooltipElement = tooltipFragment.querySelector ('.mdc-tooltip');

    document.body.appendChild (this.tooltipElement);
    this.tooltip = new MDCTooltip (this.tooltipElement);

    const { showDelay, hideDelay } = this.modifier.named;

    if (!!showDelay) {
      this.tooltip.setShowDelay (showDelay);
    }

    if (!!hideDelay) {
      this.tooltip.setHideDelay (hideDelay);
    }
  }
}

export default class MdcTooltipModifier extends Modifier {
  constructor () {
    super (...arguments);

    this.tooltipId = guidFor (this);
  }

  createInitialState () {
    return new PlainTooltipModifierState ();
  }
}
