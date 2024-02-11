ember-cli-mdc-banner
======================

ember-cli addon for [`@material/banner`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-banner)

Installation
------------

    ember install ember-cli-mdc-banner

Styles
-------


```sass
@use "@material/banner" as banner
```

Basic Example
---------------

The `<MdcBanner />` is used to create a basic banner.

```handlebars
<MdcBanner @open={{true}} @icon="error" @stacked={{true}}>
    There was a problem processing a transaction on your credit card.
</MdcBanner>
```

### Attributes

* **open** - Show/Hide the banner.
* **icon** - Icon to show in the banner
* **stacked** - Position the text below the actions instead of alongside it

Banner w/ Actions
-------------------

You can use the `<:actions />` named block to add one or two actions to the
banner. If you add more than two actions to a banner, then only the first two actions
will be recognized.

> If you include `<:actions />`, then you **must** place the banner content inside
> the `<:default />` named block.

```handlebars
<MdcBanner @icon="error" @open={{true}} @stacked={{true}}>
  <:default>
    There was a problem processing a transaction on your credit card.
  </:default>

  <:actions>
    <MdcButton @label="Learn more" {{on "click" this.learnMore}} />
    <MdcButton @label="Fix it" {{on "click" this.fixIt}} />
  </:actions>
</MdcBanner>
```
