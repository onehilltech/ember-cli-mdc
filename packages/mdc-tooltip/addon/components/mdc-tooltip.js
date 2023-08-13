import Component from "ember-cli-mdc-base/component";

const { MDCTooltip } = mdc.tooltip;
export default class MdcTooltipComponent extends Component {
  doCreateComponent(element) {
    return new MDCTooltip(element);
  }
}
