import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';

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
  _state;

  constructor () {
    super ();

    // Create the initial state for the modifier, and change to it.
    let initialState = this.createInitialState ();
    this.changeState (initialState);
  }

  /**
   * Create the initial state for the modifier. An initial state is provide is the subclass
   * does not provide one.
   */
  createInitialState () {
    return new NotInstalled (this);
  }

  /**
   * Change to a new state. The old state is notified the modifier is exiting it, and the new
   * state is notified the modifier is entering it.
   *
   * @param state
   */
  changeState (state) {
    assert ('The state must be an instance of ModifierState', state instanceof ModifierState);

    if (!!this._state) {
      // Notify the current state we are exiting.
      this._state.willExitState ();
    }

    this._state = state;

    if (!!this._state) {
      // Notify the new state we have entered.
      this._state.didEnterState ();
    }
  }

  /**
   * The modifier has been installed in an element.
   */
  didInstall () {
    this._state.didInstall ();
  }

  /**
   * The modifier has received new arguments.
   */
  didReceiveArguments () {
    this._state.didReceiveArguments ();
  }

  /**
   * The modifier will be removed from the element.
   */
  willRemove () {
    this._state.willRemove ();
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

  constructor (modifier) {
    this.modifier = modifier;
  }

  /**
   * Get the element attached to the modifier.
   *
   * @returns {*}
   */
  get element () {
    return this.modifier.element;
  }

  /**
   * Get the arguments passed to the modifier.
   *
   * @returns {*}
   */
  get args () {
    return this.modifier.args;
  }

  /**
   * The modifier has been installed on an element.
   */
  didInstall () {

  }

  /**
   * The modifier state has been entered.
   */
  didEnterState () {

  }

  /**
   * The modifier state has been exited.
   */
  willExitState () {

  }

  /**
   * The modifier has received new arguments.
   */
  didReceiveArguments () {

  }

  /**
   * The modifier is being removed from the element.
   */
  willRemove () {

  }
}

/**
 * The default initial state for the modifier if one is not provided.
 */
class NotInstalled extends ModifierState { }

export { ModifierState };
