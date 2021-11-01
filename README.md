Ember Material Components
=========================

An Ember add-on for [Material Components for the web](https://github.com/material-components/material-components-web/)

Features
------------

* Ember components for Material Components Web 6.0.0
* Individual packages for selective usage of Material Components
* Intuitive design to minimize accidental and inherit complexities of Material Components
* Themeable components at both the framework and application level
* Utilizes Ember component features to maximize adaptive designs
* Extensible Ember components for specialized implementations
* Seamless integration with [Corber](http://corber.io/)
* Plays nicely with [FastBoot](https://github.com/ember-fastboot/fastboot)

Installation
------------
    
You install this add-on by installing the individual packages that contain the need components
and/or resources.

    ember install ember-cli-[package-name]@^2.0.0

Ex.    
    
    ember install ember-cli-mdc-form@^2.0.0
    ember install ember-cli-mdc-button@^2.0.0
    ember install ember-cli-mdc-dialog@^2.0.0
    
See the [packages directory](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages) for a 
list of packages that can be installed individually.

> `ember-cli-mdc` has its own integration for the sass compiler, and is not compatible with
> `ember-cli-sass`. If you have `ember-cli-sass` installed, then you must first uninstall 
> `ember-cli-sass` for your `ember-cli-mdc` application to build correctly.

Next Steps
----------

See the `README.md` and `tests/dummy/app` in each package for detailed usage 
and examples.

Additional Resources
====================

* [Material Design](https://www.material.io/)
* [Material Components for the web](https://github.com/material-components/material-components-web/)
* [Corber](http://corber.io/)
