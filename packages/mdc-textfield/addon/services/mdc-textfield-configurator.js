import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { getWithDefault } from '@ember/object';

export default Service.extend({
  style: null,

  /// The text field is send.
  dense: false,

  init () {
    this._super (...arguments);
    this._loadConfiguration ();
  },

  _loadConfiguration () {
    const ENV = getOwner (this).resolveRegistration ('config:environment');
    const config = getWithDefault (ENV, 'ember-cli-mdc', {});
    const inputConfig = getWithDefault (config, 'input', {});
    const textFieldConfig = getWithDefault (config, 'textfield', {});

    this.setProperties ({
      style: textFieldConfig.style || inputConfig.style || null,
      dense: textFieldConfig.dense || inputConfig.dense || false,
    });
  }
});
