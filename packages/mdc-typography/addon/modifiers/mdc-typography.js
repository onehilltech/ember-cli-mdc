import Modifier from 'ember-modifier';
import { isPresent } from '@ember/utils';

export default class MdcTypographyModifier extends Modifier {
  _currentClassName;

  didReceiveArguments () {
    this._removeClassName ();
    this._addClassName ();
  }

  willRemove () {
    this._removeClassName ();
  }

  _addClassName () {
    let [typography] = this.args.positional;

    if (isPresent (typography)) {
      let currentClassName = `mdc-typography--${typography}`;

      this.element.classList.add (currentClassName);
      this._currentClassName = currentClassName;
    }
    else {
      this._currentClassName = null;
    }
  }

  _removeClassName () {
    if (isPresent (this._currentClassName)) {
      this.element.classList.remove (this._currentClassName);
    }
  }
}
