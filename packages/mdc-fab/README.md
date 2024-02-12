ember-cli-mdc-fab
======================

ember-cli addon for [`@material/fab`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-fab).

Installation
------------

    ember install ember-cli-mdc-fab

Components and Mixins
-----------------------

### Components

* [`MdcFab`](#MdcFab)
* [`MdcFabLinkTo`](#MdcFabLinkTo)

MdcFab
---------------

### Description

Add a floating action button component to the page.

### Usage

```handlebars
<MdcFab @icon="add" />
<MdcFab @icon="add" @mini=[true|false] />

<!-- extended floating action buttons -->

<MdcFab @icon="add" @label="Create" />
<MdcFab @icon="add" @label="Create" @labelPosition="left" />
<MdcFab @label="Create" />
```

### Attributes

* `icon` - The icon to display on the floating action button.
* `mini` - Make it a mini floating action button.
* `label` - Label displayed on the extended floating action button.
* `labelPosition` - The position of the label in relation to the icon; default is `right`.

MdcFabLinkTo
---------------------

### Description

Add a link component to display as a floating action button.

### Usage

```handlebars
<MdcFabLinkTo @route="index" @icon="add" @label="Create" />
```

For the time being, the first parameter must be a string, which will be ignored. We hope 
to have this requirement removed in the near future.
