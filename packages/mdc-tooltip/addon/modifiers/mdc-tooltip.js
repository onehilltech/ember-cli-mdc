import { Modifier, ModifierState } from 'ember-cli-mdc-base';
import { guidFor } from '@ember/object/internals';
import { MDCTooltip } from '@material/tooltip';

class PlainTooltipModifierState extends ModifierState {
  tooltipId;

  constructor (tooltipId, tooltipText) {
    super ();

    this.tooltipId = tooltipId;
    this.tooltipText = tooltipText;
  }
  didEnterState () {
    // Set the attributes on the target element.
    this.element.setAttribute ('aria-describedby', this.tooltipId);

    // Create the tooltip html element.
    this._createTooltipElement ();
  }

  willDestroy () {
    if (!!this.tooltipElement) {
      this.tooltipElement.remove ();
      this.tooltipElement = null;
    }
  }

  _createTooltipElement () {
    const html = `<div id="${this.tooltipId}" class="mdc-tooltip" role="tooltip" aria-hidden="true">` +
      `<div class="mdc-tooltip__surface mdc-tooltip__surface-animation">${this.tooltipText}</div>` +
    '</div>';

    const tooltipFragment = document.createRange ().createContextualFragment (html);
    this.tooltipElement = tooltipFragment.querySelector ('.mdc-tooltip');

    document.body.appendChild (this.tooltipElement);
    this.tooltip = new MDCTooltip (this.tooltipElement);
  }
}

export default class MdcTooltipModifier extends Modifier {
  constructor () {
    super (...arguments);

    this.tooltipId = guidFor (this);
  }

  createInitialState () {
    return new PlainTooltipModifierState (this.tooltipId, this.args[0]);
  }
}
