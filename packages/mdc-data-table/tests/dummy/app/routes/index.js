import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  setupController (controller) {
    this._super (...arguments);

    let signals = [
      { id: 'u0', status: 'Online', name: 'Arcus watch slowdown', severity: 'Medium', stage: 'Triaged', time: '0:33', roles: 'Allison Brie'},
      { id: 'u1', status: 'Offline', name: 'monarch: prod shared ares-managed-features-provider-heavy', severity: 'Huge', state: 'Triaged', time: '0:33', roles: 'Brie Larson'},
      { id: 'u2', status: 'Online', name: 'monarch: prod shared ares-managed-features-provider-heavy', severity: 'Minor', state: 'Not triaged', time: '0:33', roles: 'Jeremy Lake'},
      { id: 'u3', status: 'Online', name: 'Arcus watch slowdown', severity: 'Negligible', state: 'Triaged', time: '0:33', roles: 'Angelina Cheng'},
    ];

    controller.signals = A (signals);
    controller.headers = A (['Status', 'Signal name', 'Severity', 'Stage', {name: 'Time', numeric: true}, 'Roles']);
    controller.selected = A ();
    controller.signalsSortDesc = A ();
  }
});
