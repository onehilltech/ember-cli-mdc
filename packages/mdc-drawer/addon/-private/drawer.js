import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend ({
  style: null,
  Component: null,
  openEventName: null,
  closeEventName: null,

  /// The drawer implementation.
  _drawer: null,

  didInsertElement (comp) {
    const Component = this.get ('Component');

    this._drawer = new Component (comp.element);
    this._drawer.listen (this.get ('openEventName'), comp.didOpen.bind (comp));
    this._drawer.listen (this.get ('closeEventName'), comp.didClose.bind (comp));
  },

  willDestroyElement (comp) {
    this._drawer.unlisten (this.get ('openEventName'), comp.didOpen.bind (comp));
    this._drawer.unlisten (this.get ('closeEventName'), comp.didClose.bind (comp));
    this._drawer.destroy ();
  },

  open: computed ({
    set (key, value) {
      if (this._drawer) {
        this._drawer.open = value;
      }

      return value;
    },

    get () {
      return this._drawer.open;
    }
  })
});