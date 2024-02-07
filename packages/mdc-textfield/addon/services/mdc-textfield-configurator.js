import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';

export default Service.extend({
  /// The default style of all text fields.
  style: null,

  init () {
    this._super (...arguments);
    this._loadConfiguration ();
  },

  _loadConfiguration () {
    const ENV = getOwner (this).resolveRegistration ('config:environment');
    const config = get (ENV, 'ember-cli-mdc') || {};
    const inputConfig = get (config, 'input') || {}
    const textFieldConfig = get (config, 'textfield') || {};

    this.setProperties ({
      style: textFieldConfig.style || inputConfig.style || null
    });
  }
});
