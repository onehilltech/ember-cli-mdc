ember-cli-mdc-card
======================

ember-cli addon for [`@material/card`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------

    ember install ember-cli-mdc-card

Components
-----------

This package contains the following top-level components.

* [`{{mdc-card}}`](#mdc-card)

mdc-card
---------------------

### Description

<<<<<<< HEAD
The `{{mdc-card}}` is a component that implements the 
[Material Design card component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

### Usage

```handlebars
{{#mdc-card outlined=[true|false]}}
  
  <!-- ... content ... -->
  
{{/mdc-card}}
```

### Attributes

* `outlined` - The card is outlined, and not elevated.

Adding Media to the Card
---------------------------

Use the `{{mdc-card-media}}` component to add an optional media component to the card. The 
`{{mdc-card-media}}` also contains the `{{mdc-card-media-content}}`, which is optional content
displayed over the media, like a title.

```handlebars
{{#mdc-card}}
  {{#mdc-card-media scale=["square"|"16-9"]}}
    {{#mdc-card-media-content}}Title{{/mdc-card-media-content}}
  {{/mdc-card-media}}
  
  <!-- ... content ... -->
  
{{/mdc-card}}
```

### Attributes

* `scale` - Sets the scale of the media to either square (_i.e._, width equal height), or 16x9 aspect ratio.

Adding Actions to the Card
----------------------------

Actions typically appear at the bottom of the card. The actions can either be a button or 
an icon button. Use the `{{mdc-card-actions}}` component, and its child components, to add 
actions to a `{{mdc-card}}` component.

```handlebars
{{#mdc-card}}
  <!-- ... content ... -->
  
  {{#mdc-card-actions}}
    {{#mdc-card-action-buttons}}
      {{#mdc-card-action-button}}Action 1{{/mdc-card-action-button}}
      {{#mdc-card-action-button}}Action 2{{/mdc-card-action-button}}
    {{/mdc-card-action-buttons}}

    {{#mdc-card-action-icons}}
      {{mdc-card-action-icon "share" title="Share"}}
      {{mdc-card-action-icon "more_vert" title="More options"}}
    {{/mdc-card-action-icons}}
  {{/mdc-card-actions}}
{{/mdc-card}}
```
=======
See the [Contributing](CONTRIBUTING.md) guide for details.

>>>>>>> c5293e44... v3.3.0...v3.18.0

### Types of Actions

* `{{mdc-card-action-button}}` - Standard button as a card action.
* `{{mdc-card-action-button-link-to}}` - A link component as a card action.
* `{{mdc-card-action-icon}}` - A ``{{mdc-icon}}`` component as a card action.
* `{{mdc-card-action-icon-toggle}}` - A ``{{mdc-icon-button-toggle}}`` as a card action.
