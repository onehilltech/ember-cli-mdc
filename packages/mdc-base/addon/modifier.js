import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

/**
 * The base class for all modifiers used in the ember-cli-mdc framework. This modifier
 * extends the default ember modifier, and adds built-in support for applying the State
 * design pattern to modifiers.
 *
 * The advantage of this design approach is it allows you to create more complex modifiers
 * that depend on state. This is because each state is its own class, which prevents data
 * from multiple states from colliding. Moreover, it makes it easier to segment the different
 * states of a modifier.
 */
export default class MaterialModifier extends Modifier {
  /// The current state of the modifier.
  _currentState;

  constructor (owner, args) {
    super (...arguments);

    registerDestructor (this, () => {
      this.willDestroy ();
    });
  }

  /**
   * Create the initial state for the modifier. An initial state is provide is the subclass
   * does not provide one.
   */
  createInitialState() {
    return new NotInstalled();
  }

  /**
   * Change to a new state. The old state is notified the modifier is exiting it, and the new
   * state is notified the modifier is entering it.
   *
   * @param state
   */
  changeState(state) {
    assert('The state must be an instance of ModifierState', state instanceof ModifierState);

    if (this._currentState) {
      // Notify the current state we are exiting.
      this._currentState.willExitState();
      this._currentState.modifier = null;
    }

    // Update the current state.
    this._currentState = state;

    if (this._currentState) {
      // Notify the new state we have entered.
      this._currentState.modifier = this;
      this._currentState.didEnterState();
    }
  }

  /**
   * The modifier has been installed in an element.
   */
  modify (element) {
    this.element = element;

    if (!!this._currentState) {
      this._currentState.didModify (...arguments);
    }
    else {
      // Create the initial state for the modifier, and change to it.
      const initialState = this.createInitialState (...arguments);
      this.changeState (initialState);
    }
  }

  /**
   * The modifier will be destroyed.
   */
  willDestroy() {
    if (this._currentState) {
      this._currentState.willExitState ();
      this._currentState.willDestroy ();
    }
  }
}

/**
 * The base class for all modifier states. The ModifierState class uses the State
 * software design pattern. This helps us remove the unnecessary if-else, switch-case
 * statements that can result from the modifier being in different states.
 */
class ModifierState {
  /// The modifier that owns the state.
  modifier;

  /**
   * Get the element attached to the modifier.
   *
   * @returns {*}
   */
  get element() {
    return this.modifier.element;
  }

  /**
   * Change to a new state.
   *
   * @param state
   */
  changeState(state) {
    this.modifier.changeState(state);
  }

  /**
   * The state tracked by the modifier has changed.
   */
  didModify () {

  }

  /**
   * The modifier state has been entered.
   */
  didEnterState() {}

  /**
   * The modifier state has been exited.
   */
  willExitState() {}

  /**
   * The modifier will be destroyed.
   */
  willDestroy() {}
}

/**
 * The default initial state for the modifier if one is not provided.
 */
class NotInstalled extends ModifierState {}

export { ModifierState, NotInstalled };
