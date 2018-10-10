ember-cli-mdc-card
======================

ember-cli addon for [`@material/card`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

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

The `{{mdc-card}}` is a component that implements the 
[Material Design card component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

### Usage

```handlebars
{{#mdc-card outlined=[true|false]}}
  <!-- card content goes here -->
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
