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
        this._listeners.forEach (listener => listener.unlisten (this._mdcComponent));
      }
    }
  }

  /**
   * Get the underlying material design component.
   *
   * @returns {*}
   */
  get component () {
    return this._mdcComponent;
  }

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

  /**
   * Register an event for the material design component.
   *
   * @param eventName
   * @param handler
   * @private
   */
  _registerMdcEventListener (eventName, handler) {
    let listener = new Listener (eventName, handler);
    (this._listeners = this._listeners || []).push (listener);
  }
}
