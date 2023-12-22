import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { service } from '@ember/service';
import { isPresent } from "@ember/utils";

export default class MdcListItemLinkTo extends Component {
  get tabindex () {
    return this.args.tabindex || 0;
  }

  get href () {
    return this.args.href || this.urlFor;
  }

  get urlFor () {
    if (isPresent (this.args.model)) {
      if (isPresent (this.args.queryParams)) {
        return this.router.urlFor (this.args.route, this.args.model, this.options);
      }
      else {
        return this.router.urlFor (this.args.route, this.args.model);
      }
    }
    else {
      if (isPresent (this.args.queryParams)) {
        return this.router.urlFor (this.args.route, this.options);
      }
      else {
        return this.router.urlFor (this.args.route);
      }
    }
  }

  get options () {
    return { queryParams: this.args.queryParams };
  }

  @service
  router;

  get activated () {
    return this.router.currentURL === this.href;
  }
}
