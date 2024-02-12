import { Component } from 'ember-cli-mdc-base';
import { guidFor } from '@ember/object/internals';
import { MDCTooltip } from '@material/tooltip';
import { tracked } from "@glimmer/tracking";

export default class MdcTooltipComponent extends Component {
  constructor () {
    super (...arguments);

    this.tooltipId = guidFor (this);
  }

  @tracked
  interactive = false;

  get persistent () {
    const { persistent = false } = this.args;
    return persistent;
  }

  doPrepareElement (element) {
    const actionsElement = element.querySelector('.mdc-tooltip--rich-actions');
    this.interactive = actionsElement != null;

    // Set the attributes on the first child in the tooltip.
    const firstElementChild = element.firstElementChild;
    const attrName = this.interactive ? 'data-tooltip-id' : 'aria-describedby';
    firstElementChild.setAttribute (attrName, this.tooltipId);

    if (this.interactive) {
      firstElementChild.setAttribute ('aria-haspopup', 'dialog');
      firstElementChild.setAttribute ('aria-expanded', 'false');
    }

    // Prepare the links, or they appear with the incorrect color.
    const links = element.querySelectorAll ('a:not(.mdc-tooltip__content-link)');
    links.forEach (link => link.classList.add ('mdc-tooltip__content-link'));
  }

  doCreateComponent (element) {
    const tooltipElement = element.querySelector ('.mdc-tooltip');
    return new MDCTooltip (tooltipElement);
  }

  doInitComponent (tooltip) {
    const { showDelay, hideDelay } = this.args;

    if (!!showDelay) {
      tooltip.setShowDelay (showDelay);
    }

    if (!!hideDelay) {
      tooltip.setHideDelay (hideDelay);
    }
  }
}
