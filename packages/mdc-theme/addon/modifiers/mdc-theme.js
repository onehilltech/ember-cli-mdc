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
  modify (element, [cssPropertyName, value]) {
    super.modify (...arguments);

    // Get the new property name from the arguments. If the name has changed, then
    // we need to remove the old property before setting the new one.

    const mdcThemeCssPropertyName = `--mdc-theme-${dasherize(cssPropertyName)}`

    if (this._currentCssPropertyName !== mdcThemeCssPropertyName) {
      this._removeCssProperty();
    }

    if (isPresent(value)) {
      element.style.setProperty(mdcThemeCssPropertyName, value);
    }
    else {
      element.style.removeProperty(mdcThemeCssPropertyName);
    }

    this._currentCssPropertyName = mdcThemeCssPropertyName;
  }

  willDestroy () {
    this._removeCssProperty();
  }

  /**
   * Remove the current CSS property from the element.
   *
   * @private
   */
  _removeCssProperty () {
    if (isPresent(this._currentCssPropertyName)) {
      this.element.style.removeProperty(this._currentCssPropertyName);
    }
  }
}
