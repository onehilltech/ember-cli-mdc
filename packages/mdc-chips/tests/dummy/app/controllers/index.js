import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  /// properties for the basic chips
  @tracked
  chipLabel;

  @tracked
  chips;

  @tracked
  choiceChips;

  @action
  submit (ev) {
    ev.preventDefault ();
    this.chips.pushObject ({text: this.chipLabel, trailingIcon: "cancel"});
  }

  /// properties and methods for choice chip examples

  @tracked
  choice;

  @action
  change (choice) {
    this.choice = choice;
  }

  @action
  clear () {
    this.choice = null;
  }

  @action
  selectExtraSmall () {
    this.choice = this.choiceChips.objectAt (0);
  }
}