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
    this.cleanup ();
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
   * Cleanup any resources used by the component.
   */
  cleanup () {
    if (!!this._mdcComponent) {
      if (!!this._listeners) {
        this._listeners.forEach (listener => listener.unlisten (this._mdcComponent));
      }
    }
  }

  /**
   * A material design component has been created.
   *
   * @param mdcComponent
   * @private
   */
  _mdcComponentCreated (mdcComponent) {
    // Cleanup any resources in use.
    this.cleanup ();

    // Save the component.
    this._mdcComponent = mdcComponent;

    // Start listening for events.
    if (!!this._listeners) {
      this._listeners.forEach (listener => listener.listen (this));
    }
  }

  /**
   * Register an event for the material design component.
   *
   * @param eventName
   * @param method
   * @private
   */
  _registerMdcEventListener (eventName, method) {
    let listener = new Listener (eventName, method);
    (this._listeners = this._listeners || []).push (listener);
  }

  /**
   * Listen for an event.
   *
   * @param eventName
   * @param method
   */
  listen (eventName, method) {
    return this._mdcComponent.listen (eventName, method);
  }

  /**
   * Stop listening for an event.
   *
   * @param eventName
   * @param method
   */
  unlisten (eventName, method) {
    return this._mdcComponent.unlisten (eventName, method);
  }
}
