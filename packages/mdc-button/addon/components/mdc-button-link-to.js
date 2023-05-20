import MdcButtonBase from "../-private/-mdc-button-base";
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default class MdcButtonLinkTo extends MdcButtonBase {
  @service
  router;

  get href () {
    return this.args.href || this.routeUrl;
  }

  get routeUrl () {
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
