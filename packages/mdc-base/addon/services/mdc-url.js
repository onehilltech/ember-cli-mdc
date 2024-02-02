import Service, { service } from '@ember/service';
import { isEmpty, isPresent } from '@ember/utils';

/**
 * @class MdcUrlService
 */
export default class MdcUrlService extends Service {
  @service
  router;

  fromComponent (component) {
    return component.args.href || this.routeUrlFromComponent (component) || '#';
  }

  routeUrlFromComponent (component) {
    if (isEmpty (component.args.route)) {
      return null;
    }

    let options;

    if (isPresent (component.args.queryParams)) {
      options = {
        queryParams: component.args.queryParams
      };
    }

    if (isPresent (component.args.model)) {
      if (isPresent (options)) {
        return this.router.urlFor (component.args.route, component.args.model, options);
      }
      else {
        return this.router.urlFor (component.args.route, component.args.model);
      }
    }
    else {
      if (isPresent (options)) {
        return this.router.urlFor (component.args.route, options);
      }
      else {
        return this.router.urlFor (component.args.route);
      }
    }
  }

  isActive (component) {
    const url = this.fromComponent (component);
    const currentUrl = this.router.currentURL;

    return url === currentUrl;
  }
}
