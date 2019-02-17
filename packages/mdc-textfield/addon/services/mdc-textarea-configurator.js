import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { getWithDefault } from '@ember/object';

export default Service.extend({
  init () {
    this._super (...arguments);
    this._loadConfiguration ();
  },

  _loadConfiguration () {

  }
});
