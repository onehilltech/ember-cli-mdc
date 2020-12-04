import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  /// properties for the basic chips
  @tracked
  chipLabel;

  @tracked
  chips;

  @action
  submit (ev) {
    ev.preventDefault ();
    this.chips.pushObject ({text: this.chipLabel, trailingIcon: "cancel"});
  }

  /// properties and methods for choice chip examples

  @tracked
  choice;

  @action
  change (chip) {
    this.choice = chip;
  }
}