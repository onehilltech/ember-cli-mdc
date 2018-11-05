import Component from '@ember/component';
import layout from '../templates/components/mdc-step';

import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

function noOp () {}

export default Component.extend({
  layout,

  tagName: 'li',

  classNames: ['mdc-step'],

  classNameBindings: [
    'optional:mdc-step--optional',
    'editable:mdc-step--editable',
    'disabled:mdc-step--disabled'
  ],

  nextEventListener_: null,
  backEventListener_: null,
  skipEventListener_: null,
  cancelEventListener_: null,
  gotoEventListener_: null,
  activateEventListener_: null,
  deactivateEventListener_: null,

  /// Error message for the state.
  error: null,

  /// The step is completed.
  completed: false,

  /// The active state of the step.
  active: false,

  /// The mdc step, which is assigned by the parent.
  step: null,

  init () {
    this._super (...arguments);

    this.nextEventListener_ = this.didNext.bind (this);
    this.backEventListener_ = this.didBack.bind (this);
    this.skipEventListener_ = this.didSkip.bind (this);
    this.cancelEventListener_ = this.didCancel.bind (this);
    this.gotoEventListener_ = this.didGoto.bind (this);
    this.activateEventListener_ = this.didActivate.bind (this);
    this.deactivateEventListener_ = this.didDeactivate.bind (this);
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let error = this.get ('error');

    if (isPresent (error)) {
      this.step.setError (error);
    }
  },

  didInsertElement () {
    this._super (...arguments);

    this.element.addEventListener ('MDCStep:next', this.nextEventListener_);
    this.element.addEventListener ('MDCStep:back', this.backEventListener_);
    this.element.addEventListener ('MDCStep:skip', this.skipEventListener_);
    this.element.addEventListener ('MDCStep:cancel', this.cancelEventListener_);
    this.element.addEventListener ('MDCStep:goto', this.gotoEventListener_);
    this.element.addEventListener ('MDCStep:activate', this.activateEventListener_);
    this.element.addEventListener ('MDCStep:deactivate', this.deactivateEventListener_);
  },

  willDestroyElement () {
    this._super (...arguments);

    this.element.removeEventListener ('MDCStep:next', this.nextEventListener_);
    this.element.removeEventListener ('MDCStep:back', this.backEventListener_);
    this.element.removeEventListener ('MDCStep:skip', this.skipEventListener_);
    this.element.removeEventListener ('MDCStep:cancel', this.cancelEventListener_);
    this.element.removeEventListener ('MDCStep:goto', this.gotoEventListener_);
    this.element.removeEventListener ('MDCStep:activate', this.activateEventListener_);
    this.element.removeEventListener ('MDCStep:deactivate', this.deactivateEventListener_);
  },

  didNext () {
    // Moving to the next step implies the step is completed.
    this.setProperties ({ completed: true, error: null });

    this.getWithDefault ('next', noOp) ();
  },

  didBack () {
    this.getWithDefault ('back', noOp) ();
  },

  didSkip () {
    this.getWithDefault ('skip', noOp) ();
  },

  didCancel () {
    this.getWithDefault ('cancel', noOp) ();
  },

  didGoto () {
    this.getWithDefault ('goto', noOp) ();
  },

  didActivate () {
    this.set ('active', true);
  },

  didDeactivate () {
    this.set ('active', false);
  }
});
