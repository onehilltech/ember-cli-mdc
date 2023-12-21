import Component from 'ember-cli-mdc-base/component';
import listener from 'ember-cli-mdc-base/listener';
import { action, get } from '@ember/object';
import { isPresent, isNone } from '@ember/utils';
import { dasherize } from '@ember/string';

import { MDCChipSet } from '@material/chips/deprecated';

function noOp () {}

export default class MdcChipSetComponent extends Component {
  doCreateComponent (element) {
    return new MDCChipSet (element);
  }

  doInitComponent (component) {
    component.chips.forEach ((chip) => {
      chip.shouldRemoveOnTrailingIconClick = this.isManagedChip (chip) || isNone (chip.root.dataset.permanent);
    });
  }

  isManagedChip (chip) {
    this.chips.find (managed => this.getChipId (managed) === chip.id);
  }

  @listener ('MDCChip:interaction')
  interaction (ev) {
    const { detail: { chipId } } = ev;

    this.didInteraction (chipId);
    (this.args.interaction || noOp)(chipId);
  }

  didInteraction (chipId) {

  }

  @listener ('MDCChip:selection')
  selection (ev) {
    const { detail: { chipId, selected } }  = ev;

    this.didSelection (ev);

    (this.args.selection || noOp)(chipId, selected);
  }

  didSelection (ev) {

  }

  @listener ('MDCChip:removal')
  removal (ev) {
    const { detail: { chipId } } = ev;

    this.didRemoval (chipId);
    (this.args.removal || noOp)(chipId);
  }

  didRemoval (chipId) {

  }

  @listener ('MDCChip:navigation')
  navigation (ev) {
    const { details: {chipId, key, source}	} = ev;

    this.didNavigation (chipId, key, source);
    (this.args.navigation || noOp)(chipId, key, source);
  }

  didNavigation (chipId, key, source) {

  }

  @action
  removeChip (chip) {
    // Get the index of the chip, and remove it from the list of chips.
    let chipElement = chip.element;
    let chipSetElement = chip.element.parentElement;
    let index = Array.from (chipSetElement.children).indexOf (chipElement);

    if (index > -1) {
      this.args.chips.removeAt (index);
    }
  }

  @action
  sync () {

  }

  get _type () {
    return isPresent (this.type) ? `mdc-chip-set--${this.type}` : null;
  }

  get label () {
    return isPresent (this.args.label) ? `mdc-chip-set--${dasherize (this.args.label)}` : null;
  }

  get chips () {
    return this.args.chips || [];
  }

  getChipId (chip) {
    return get (chip, this.idKey);
  }

  select (chipId) {
    return this.component.foundation.select (chipId);
  }

  findChipById (chipId) {
    return this.chips.find (chip => get (chip, this.idKey) === chipId);
  }

  /// Adapter Properties

  get idKey () {
    return this.args.idKey || 'id';
  }

  get textKey () {
    return this.args.textKey || 'text';
  }

  get leadingIconKey () {
    return this.args.leadingIconKey || 'leadingIcon';
  }

  get trailingIconKey () {
    return this.args.trailingIconKey || 'trailingIcon';
  }
}
