import Modifier from 'ember-modifier';

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

    let currentClassName = `mdc-typography--${typography}`;
    this.element.classList.add (currentClassName);

    this._currentClassName = currentClassName;
  }

  _removeClassName () {
    if (!!this._currentClassName) {
      this.element.classList.remove (this._currentClassName);
    }
  }
}
