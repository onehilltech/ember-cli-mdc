ember-cli-mdc-tooltip
======================

ember-cli addon for [`@material/tooltip`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tooltip)

Installation
------------

    ember install ember-cli-mdc-tooltip

Styles
-------


```sass
@use "@material/tooltip" as tooltip;
```

Plain Tooltip
---------------

Use the `{{mdc-tooltip}}` modifier to create a plain tooltip.

```handlebars
<a href="www.google.com" {{mdc-tooltip "lorem ipsum dolor"}}>Link</a>
```

You can set the optional `showDelay` and `hideDelay` attributes on the modifier
to control how long of a delay (in ms) before showing the tooltip and how long of 
a delay (in ms) before hiding the tooltip, respectively.

```handlebars
<a href="www.google.com" {{mdc-tooltip "lorem ipsum dolor" showDelay=0 hideDelay=0}}>Link</a>
```


Rich Tooltip
---------------

Use must use the `<MdcTooltip />` component to create a rich tooltip.

```handlebars
<MdcTooltip @showDelay={{this.showDelay}} @hideDelay={{this.hideDelay}}>
    <:default>
      <MdcButton @label="Press Me" @style="unelevated" />
    </:default>

    <:tooltip>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
      pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
      aliquam sit amet sit amet eros.
    </:tooltip>
</MdcTooltip>
```

The rich tooltip will wrap the anchor element, which must appear in the `<:default>`
named block. If you do not include it inside the `<:default>` named block, then the
application will not compile. The tooltip content must appear inside the `<:tooltip>` 
named block.

Similar to the [plain tooltips](#plain-tooltip), you can set the optional `showDelay` and `hideDelay` 
attributes on the modifier to control how long of a delay (in ms) before showing the 
tooltip and how long of a delay (in ms) before hiding the tooltip, respectively.

### Interactive Rich Tooltip

To make a rich tooltip interactive, enclose the actions inside the `<:actions>` named 
block of the `<MdcTooltip />` component.

```handlebars
<MdcTooltip>
  <:default>
    <MdcButton @label="Press Me" @style="unelevated" />
  </:default>

  <:tooltip>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
    aliquam sit amet sit amet eros.

    <a href="https://google.com">link</a>
  </:tooltip>

  <:actions>
    <MdcButton @label="Action" />
  </:actions>
</MdcTooltip>
```

### Persistent Interactive Rich Tooltip

Use the `@persistent` attribute to make the interactive rich tooltip a persistent 
interactive rich tooltip.

```handlebars
<MdcTooltip @persistent={{true}}>
    <:default>
      <MdcButton @label="Press Me" @style="unelevated" />
    </:default>
    
    <:tooltip>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
      pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
      aliquam sit amet sit amet eros.
    
      <a href="https://google.com">link</a>
    </:tooltip>
    
    <:actions>
      <MdcButton @label="Action" />
    </:actions>
</MdcTooltip>
```
