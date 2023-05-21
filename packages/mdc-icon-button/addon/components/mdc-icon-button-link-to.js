import MdcIconButtonBase from "../-private/mdc-icon-button-base";
import { service } from '@ember/service';
import { isPresent, isEmpty } from '@ember/utils';

export default class MdcIconButtonLinkTo extends MdcIconButtonBase {
  @service
  router;

  get href () {
    return this.args.href || this.routeUrl || '#';
  }

  get routeUrl () {
    if (isEmpty (this.args.route)) {
      return null;
    }

    let options;

    if (isPresent(this.args.queryParams)) {
      options = {};
      options.queryParams = this.args.queryParams;
    }

    if (isPresent (this.args.model)) {
      if (isPresent (options)) {
        return this.router.urlFor (this.args.route, this.args.model, options);
      }
      else {
        return this.router.urlFor (this.args.route, this.args.model);
      }
    }
    else {
      if (isPresent (options)) {
        return this.router.urlFor (this.args.route, options);
      }
      else {
        return this.router.urlFor (this.args.route);
      }
    }
  }
}