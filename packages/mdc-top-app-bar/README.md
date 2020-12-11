ember-cli-mdc-top-app-bar
==========================

ember-cli addon for [`@material/top-app-bar`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------

    ember install ember-cli-mdc-top-app-bar

Components and Modifiers
--------------------------

### Components

* [`<MdcTopAppBar>`](#MdcTopAppBar)

### Modifiers 

* [`{{mdc-top-app-bar-fixed-adjustment}}`](#mdc-top-app-bar-fixed-adjustment)

MdcTopAppBar
---------------------

### Description

The top application (app) bar component on a single page. The top app bar usually contains
the menu icon or the navigate up icon aligned to the start. Aligned to end are usually action
icons and the overflow menu for the page.

### Usage

```handlebars
<MdcTopAppBar @fixed=[true|false] 
              @dense=[true|false]
              @prominent=[true|false]
              @short=[true|false]
              @alwaysCollapsed=[true|false]
              @navigation={{this.navigation}}>
  <MdcTopAppBarRow>
  
  </MdcTopAppBarRow>
</MdcTopAppBar>
```

### Attributes

* `fixed` - The top app bar is fixed to the top of the page.
* `dense` - The top app bar is shorter.
* `prominent` - The top app bar is taller.
* `short` - The top app bar can collapse to the navigation icon side when scrolled.
* `alwaysCollapsed` - The top app bar always appears collapsed (when short).

### Adding sections to a row

The `<MdcTopAppBar>` component can contain sections. The sections can either be aligned
to the start or end of the `<MdcTopAppBarRow>`. There is no default alignment.

```handlebars
<MdcTopAppBar @fixed={{true}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
    
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      
    </MdcTopAppBarSection>

  </MdcTopAppBarRow>
</MdcTopAppBar>
```

### Adding a title to the app bar

Use the `<MdcTopAppBarTitle>` component to add a title to the top app bar.

```handlebars
<MdcTopAppBar @fixed={{true}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
      <MdcTopAppBarTitle>Ember Material</MdcTopAppBarTitle>
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      
    </MdcTopAppBarSection>

  </MdcTopAppBarRow>
</MdcTopAppBar>
```

### The navigation icon

The `<MdcTopAppBarNavigationIcon>` is used to add a navigation icon to the top app bar.
Likewise, the `@navigation` attribute on `<MdcTopAppBar>` is invoked when the navigation
icon is clicked.

```handlebars
<MdcTopAppBar @fixed={{true}} @navigation={{this.openDrawer}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
      <MdcTopAppBarNavigationIcon @icon="menu" />
      <MdcTopAppBarTitle>Ember Material</MdcTopAppBarTitle>
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      
    </MdcTopAppBarSection>

  </MdcTopAppBarRow>
</MdcTopAppBar>
```

The `<MdcTopAppBarNavigateUpTo>` component adds the navigate up icon to the top 
app bar. It also allows you to link to a page in the application.

```handlebars
<MdcTopAppBar @fixed={{true}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
      <MdcTopAppBarNavigateUpTo @route="index" />
      <MdcTopAppBarTitle>Ember Material</MdcTopAppBarTitle>
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      
    </MdcTopAppBarSection>

  </MdcTopAppBarRow>
</MdcTopAppBar>
```

### Adding action items to the top app bar

Action items usually appear at the end of the action bar. The `<MdcTopAppBarActionItem>`
components adds an action item to the top app bar.

```handlebars
<MdcTopAppBar @fixed={{true}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
      <MdcTopAppBarNavigateUpTo @route="index" />
      <MdcTopAppBarTitle>Ember Material</MdcTopAppBarTitle>
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      <MdcTopAppBarActionItem @label="Download" @icon="file_download" alt="Download" />
    </MdcTopAppBarSection>
  </MdcTopAppBarRow>
</MdcTopAppBar>
```

The `<MdcTopAppBarActionItem>` supports the following attributes:

* `icon` - The icon for the action item.
* `label` - The accessibility label for the action item (optional).

mdc-top-app-bar-fixed-adjustment
---------------------------------

### Description

The `{{mdc-top-app-bar-fixed-adjustment}}` modifier is designed to adjust a container's
top padding to account for the size of the top app bar.

### Usage

```handlebars
<MdcTopAppBar @fixed={{true}} 
              @dense={{this.dense}}
              @short={{this.short}}
              @prominent={{this.prominent}} 
              @alwaysCollapsed={{this.alwaysCollapsed}}>
  <MdcTopAppBarRow>
    <MdcTopAppBarSection @position="alignStart">
      <MdcTopAppBarNavigateUpTo @route="index" />
      <MdcTopAppBarTitle>Ember Material</MdcTopAppBarTitle>
    </MdcTopAppBarSection>
  
    <MdcTopAppBarSection @position="alignEnd">
      <MdcTopAppBarActionItem @label="Download" @icon="file_download" alt="Download" />
    </MdcTopAppBarSection>
  </MdcTopAppBarRow>
</MdcTopAppBar>

<div {{mdc-top-app-bar-fixed-adjustment dense=this.dense 
                                        short=this.short
                                        prominent=this.prominent
                                        alwaysCollapsed=this.alwaysCollapsed}}>
  <!-- content goes here -->
</div>
```

As shown in the example above, the named arguments for `{{mdc-top-app-bar-fixed-adjustment}}`
should be bound to their corresponding argument from the <MdcTopAppBar> component.
