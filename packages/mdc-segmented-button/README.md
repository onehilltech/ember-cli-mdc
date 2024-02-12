ember-cli-mdc-segmented-button
===============================

ember-cli addon for [`@material/segmented-button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-segmented-button)

Installation
------------

    ember install ember-cli-mdc-segmented-button

Styles
-------


```sass
@use "@material/segmented-button" as segmented
```

Multi-select Segmented Button
-------------------------------

The `<MdcSegmentedButton />` component is multi-select by default. You just add
one or more `<MdcSegmentedButtonSegment />` components to the `<MdcSegmentedButton />` 
component.

```handlebars
<MdcSegmentedButton>
    <MdcSegmentedButtonSegment @icon="favorite" />
    <MdcSegmentedButtonSegment @label="Sample Text" />
    <MdcSegmentedButtonSegment @icon="favorite" @label="Sample Text" />
</MdcSegmentedButton>
```

Single-select Segmented Button
--------------------------------

Set the `@singleSelect={{true}}` attribute to create a single-select segmented button.

> You must set the `@selected` attribute on one of the `<MdcSegmentedButtonSegment />` 
> components, or the first `<MdcSegmentedButtonSegment />` component will be automatically
> selected.

```handlebars
  <MdcSegmentedButton @singleSelect={{true}}>
    <MdcSegmentedButtonSegment @icon="favorite" />
    <MdcSegmentedButtonSegment @label="Sample Text" />
    <MdcSegmentedButtonSegment @icon="favorite" @label="Sample Text" />
</MdcSegmentedButton>
```
