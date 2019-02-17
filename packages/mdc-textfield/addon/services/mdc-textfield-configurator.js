import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { getWithDefault } from '@ember/object';

export default Service.extend({
  /// The default style of all text fields.
  style: null,

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
      style: textFieldConfig.style || inputConfig.style || null
    });
  }
});
