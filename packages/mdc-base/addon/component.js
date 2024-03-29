import Component from '@glimmer/component';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { service } from '@ember/service';

import Listener from './-internal/listener';

/**
 * The MaterialComponent class is the base class for all material design components
 * in the material-components-web framework.
 */
export default class MaterialComponent extends Component {
  @service
  mdc;

  _component = null;

  get component() {
    return this._component;
  }

  @action
  didInsert(element) {
    // Define the element property that represents the root html element for
    // the component wrapper facade.

    Object.defineProperty (this, 'element', { value: element, configurable: false, writable: false });

    // Prepare the element for creation.
    this.doPrepareElement (element);

    // Create the material component.
    const component = this.doCreateComponent (element);

    if (isPresent (component)) {
      this._checkComponent (component);
      this._installComponent (component);
    }

    // Define the registration property. This will be used by the component to
    // unregister itself with the framework.

    Object.defineProperty (this, '_registration', {
      value: this.mdc.registerComponent (this),
      configurable: false,
      writable: false,
      enumerable: false
    });
  }

  /**
   * Allow a subclass to replace the current component with a new instance.
   *
   * @param component
   */
  replaceComponent (component) {
    // Check the component is a valid material component.
    this._checkComponent(component);

    // Cleanup the current component's resources, and install the new component.
    this._cleanup ();
    this._installComponent (component);
  }

  /**
   * Helper method for installing a new component.
   *
   * @param component
   * @private
   */
  _installComponent (component) {
    // Save the component, and initialize it.
    this._component = component;
    this.doInitComponent (component);

    if (isPresent(this._listeners)) {
      this._listeners.forEach((listener) => listener.listen (this));
    }
  }

  /**
   * Check the component is an instance of this class.
   *
   * @param component
   * @private
   */
  _checkComponent(component) {
    //assert ('The instantiated component is not an instance of MDCComponent', (component instanceof MDCComponent));
  }

  /**
   * Prepare the component for creation. This allows the component to update the
   * DOM before creating the material component.
   *
   * @param element         HTML element
   */
  doPrepareElement(element) {}

  /**
   * Factory method for creating the material component.
   *
   * @param element
   */
  doCreateComponent(element) {
    return null;
  }

  /**
   * Initialize the material component after it has been created.
   *
   * @param component
   */
  doInitComponent(component) {}

  /**
   * The component will be destroyed. Perform any _cleanup operations so we do not have
   * any resources being leaked.
   */
  willDestroy() {
    super.willDestroy (...arguments);
    this._cleanup ();
  }

  /**
   * Cleanup any resources used by the component.
   */
  _cleanup() {
    if (isPresent (this._component) && isPresent (this._listeners)) {
      // Unregister the listeners so this component does not receive any more
      // unwanted notifications.

      this._listeners.forEach ((listener) => listener.unlisten (this._component));
    }

    if (isPresent (this._registration)) {
      // Unregister this wrapper facade with the framework.
      this._registration.unregister ();
    }
  }

  /**
   * Register an event for the material design component.
   *
   * @param eventName
   * @param method
   * @private
   */
  _registerMdcEventListener(eventName, method) {
    let listener = new Listener(eventName, method);
    (this._listeners = this._listeners || []).push(listener);
  }

  /**
   * Listen for an event.
   *
   * @param eventName
   * @param method
   */
  listen(eventName, method) {
    return this._component.listen(eventName, method);
  }

  /**
   * Stop listening for an event.
   *
   * @param eventName
   * @param method
   */
  unlisten(eventName, method) {
    return this._component.unlisten(eventName, method);
  }

  createCustomEvent (name, detail = {}) {
    // Set the component sending the event.
    detail.$component = this;

    return new CustomEvent (name, { detail });
  }

  /**
   * Dispatch an event from the associated html element.
   *
   * @param name
   * @param detail
   */
  dispatchEvent (name, detail = {}) {
    // Create the custom event and dispatch it.
    const ev = this.createCustomEvent (name, detail);
    this.element.dispatchEvent (ev);
  }
}
