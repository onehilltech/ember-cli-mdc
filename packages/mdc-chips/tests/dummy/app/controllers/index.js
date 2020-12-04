import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked
  chipLabel;

  @tracked
  chips;

  /*
  names: map ('filtered', function (id) {
    return this.filterChips.findBy ('id', id).text;
  }),*/

  @action
  submit (ev) {
    ev.preventDefault ();
    this.chips.pushObject ({text: this.chipLabel, trailingIcon: "cancel"});
  }

  @action
  remove (chip) {

  }

  /*
  makeInputChip (value) {
    return {text: value, iconTrailing: 'cancel'};
  }
  */
}