import Service from '@ember/service';

/// The component registry for the framework.
const componentMap = new Map ();

export default class MdcService extends Service {
  constructor () {
    super (...arguments);

    Object.defineProperty (this, '_listeners', { value: [], writable: false, enumerable: false, configurable: true });
  }

  registerComponent (component) {
    if (componentMap.has (component.element))
      throw new Error ('This component has already been registered.');

    componentMap.set (component.element, component);

    this._listeners.forEach (listener => listener.didRegisterComponent (this, component));

    return {
      unregister () {
        componentMap.delete (component.element);
      }
    }
  }

  componentFor (element) {
    return componentMap.get (element);
  }

  addListener (listener) {
    this._listeners.push (listener);
  }

  removeListener (listener) {
    const index = this._listeners.indexOf (listener);

    if (index >= 0) {
      this._listeners.splice (index, 1);
    }
  }
}
