import Component from '@glimmer/component';
import { get } from '@ember/object';

import Listener from './-internal/listener';

/**
 * The MaterialComponent class is the base class for all material design components
 * in the material-components-web framework.
 */
export default class MaterialComponent extends Component {
  /**
   * The component will be destroy. Perform any cleanup operations so we do not have
   * any resources being leaked.
   */
  willDestroy () {
    if (!!this._mdcComponent) {
      if (!!this._listeners) {
        // Instruct all registered listeners to stop listening for events.
        this._listeners.forEach (listener => listener.unlisten (this._mdcComponent));
      }
    }
  }

  /**
   * @private
   *
   * Instance of the vanilla material design component.
   */
  _mdcComponent;

  /**
   * A material design component has been created.
   *
   * @param mdcComponent
   * @private
   */
  _mdcComponentCreated (mdcComponent) {
    this._mdcComponent = mdcComponent;

    // Start listening for events.
    if (!!this._listeners) {
      this._listeners.forEach (listener => listener.listen (this._mdcComponent));
    }
  }

  // The collection of registered listeners.
  _listeners;

  /**
   * Register an event for the material design component.
   *
   * @param eventName
   * @param methodName
   * @private
   */
  _registerMdcEventListener (eventName, methodName) {
    let method = get (this, methodName);
    let handler = method.bind (this);
    let listener = new Listener (this, eventName, handler);

    (this._listeners = this._listeners || []).push (listener);
  }
}
