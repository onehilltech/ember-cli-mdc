import Modifier, { modifier } from 'ember-modifier';
import { dasherize } from '@ember/string';
import { isPresent } from '@ember/utils';

/**
 * @class MdcThemeModifier
 *
 * The modifier class for Material Design Component theme. The modifier allows you
 * to override the theming for a element and its children.
 *
 * Usage:
 *
 *     <div {{mdc-theme "primaryColor" "red"}}></div>
 */
export default class MdcThemeModifier extends Modifier {
  _currentCssPropertyName;

  /**
   * The modifier has received new/updated arguments.
   */
  didReceiveArguments() {
    // Get the new property name from the arguments. If the name has changed, then
    // we need to remove the old property before setting the new one.

    const cssPropertyName = this.cssPropertyName;
    const value = this.value;

    if (this._currentCssPropertyName !== cssPropertyName) {
      this._removeCssProperty();
    }

    if (isPresent(value)) {
      this.element.style.setProperty(cssPropertyName, value);
    } else {
      this.element.style.removeProperty(cssPropertyName);
    }

    this._currentCssPropertyName = cssPropertyName;
  }

  willRemove() {
    this._removeCssProperty();
  }

  get value() {
    return this.args.positional[1];
  }

  get cssPropertyName() {
    return `--mdc-theme-${dasherize(this.args.positional[0])}`;
  }

  /**
   * Remove the current CSS property from the element.
   *
   * @private
   */
  _removeCssProperty() {
    if (isPresent(this._currentCssPropertyName)) {
      this.element.style.removeProperty(this._currentCssPropertyName);
    }
  }
}
