import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { A } from '@ember/array';

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

  // properties and methods for choice chip example

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

  // properties and methods for filter chip example

  @tracked
  filtered;

  @action
  replaceFiltered () {
    this.filtered = A ([this.filterChips.objectAt (1), this.filterChips.objectAt (2)]);
  }

  @action
  addToFiltered () {
    this.filtered.addObject (this.filterChips.objectAt (4));
  }

  @tracked
  inputChips;

  @action
  input (value) {
    this.inputChips.addObject ({text: value});
  }
}