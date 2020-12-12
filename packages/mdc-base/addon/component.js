import Component from '@glimmer/component';

import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import Listener from './-internal/listener';


const { MDCComponent } = mdc.base;

/**
 * The MaterialComponent class is the base class for all material design components
 * in the material-components-web framework.
 */
export default class MaterialComponent extends Component {
  _component = null;

  get component () {
    return this._component;
  }
  
  @action
  didInsert (element) {
    // Prepare the element for creation.
    this.prepareElement (element);

    // Create the material component.
    let component = this.createMaterialComponent (element);

    if (isPresent (component)) {
      this._checkComponent (component);
      this._installComponent (component);
    }
  }

  /**
   * Allow a subclass to replace the current component with a new instance.
   *
   * @param component
   */
  replaceComponent (component) {
    // Check the component is a valid material component.
    this._checkComponent (component);

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
    this.initializeComponent (component);

    // Start listening for events.
    if (isPresent (this._listeners)) {
      this._listeners.forEach (listener => listener.listen (this));
    }
  }

  /**
   * Check the component is an instance of this class.
   *
   * @param component
   * @private
   */
  _checkComponent (component) {
    assert ('The instantiated component is not an instance of MDCComponent', (component instanceof MDCComponent));
  }

  /**
   * Prepare the component for creation. This allows the component to update the
   * DOM before creating the material component.
   *
   * @param element         HTML element
   */
  prepareElement (element) {

  }

  /**
   * Factory method for creating the material component.
   *
   * @param element
   */
  createMaterialComponent (element) {
    return null;
  }

  /**
   * Initialize the material component after it has been created.
   *
   * @param component
   */
  initializeComponent (component) {

  }

  /**
   * The component will be destroy. Perform any _cleanup operations so we do not have
   * any resources being leaked.
   */
  willDestroy () {
    this._cleanup ();
  }

  /**
   * Cleanup any resources used by the component.
   */
  _cleanup () {
    if (isPresent (this._component)) {
      if (isPresent (this._listeners)) {
        this._listeners.forEach (listener => listener.unlisten (this._component));
      }
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
    return this._component.listen (eventName, method);
  }

  /**
   * Stop listening for an event.
   *
   * @param eventName
   * @param method
   */
  unlisten (eventName, method) {
    return this._component.unlisten (eventName, method);
  }
}
