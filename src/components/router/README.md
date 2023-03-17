## Websy Router
The Websy Router is a simple JavaScript class that allows developers to build Single-Page-Applications with minimal amounts of JavaScript. It works by allowing the developer to configure 'views', simply by adding the required classes and attributes to their HTML markup. Each item within the router usually consists of 2 HTML elements. The **trigger** element and the **view** element. All **view** elements are hidden by default. When a **trigger** element is clicked, the corresponding **view** element is then shown.
Multiple **trigger** elements can be associated to the same **view**.

#### Defining Trigger Elements
To define a **Trigger Element**, you need to add a class of `websy-trigger` and a `data-view` attribute to the desired element. The value for the `data-view` attribute should correspond with that of a `View Element`.
``` html
<ul>
  <li class="websy-trigger" data-view="home">Home</li>
  <li class="websy-trigger" data-view="blog">Blog</li>
</ul>
```

#### Defining View Elements
To define a **View Element**, you need to add a class of `websy-view` and a `data-view` attribute to the desired element. The value for the `data-view` attribute should correspond with that of a **Trigger Element**.
``` html
<div class="websy-view" data-view="home">
  This is the Home page
</div>
<div class="websy-view" data-view="blog">
  This is the Blog page
</div>
```

#### Initializing the Router
To instantiate a new instance of a Router, you can do this:
``` javascript
const options = {}
const router = new WebsyDesigns.Router(options)
router.init()
```

#### Options
The following options are available on the Router:
* **defaultView** - Set the default view.
* **defaultGroup** - Set the default group.
* **urlPrefix** - The Router is designed to manage the Url immediately after the domain. Adding a urlPrefix will force the Router to include additional information in the Url.
* **onShow** - An event listener for when views are shown. The provided function can receive 3 parameters, `view`, `params` and `group`, which represent the name of the view being loaded, any available url parameters and the name of the group the view belongs to (if applicable).
* **onHide** - An event listener for when views are hidden. The provided function can receive a single parameter, `view`, which represents the name of the view being hidden.

#### Grouping
To build hierarchical views, an additional attribute of `data-group` can be provided to the HTML element. Elements without this attribute are implicitly added to a group called `main`, unless overridden in the options. **View Elements** that belong to the `main` group will also cause the Url to update. For any other group, the Url is not updated. To set a default a **View Element** that belongs to a group other than `main`, add the relevant `active` class to it. A `data-parent` attribute should also be assigned, providing the desired parent `view` as the value. This will ensure that all views and child views are opened/closed correctly when navigating.
``` html
<div class="websy-view" data-view="home">
  This is the Home page
  <button class="websy-trigger" data-view="subviewa" data-group="mygroup" data-parent="home">Sub-view A</button>
  <button class="websy-trigger" data-view="subviewb" data-group="mygroup" data-parent="home">Sub-view B</button>
  <div class="websy-view" data-view="subviewa">
    This is sub-view A
  </div>
  <div class="websy-view" data-view="subviewb">
    This is sub-view B
  </div>
</div>
```

#### Flippable Objects
It's possible to build a **flippable** element which has a front and back. Clicking on it will cause it to rotate and reveal whatever is on the other side. To configure the HTML structure, you will need an outer element to act as the parent to the front and back faces. As a minimum, this element should be styled with `position: relative;`. The `front` and `back` should then be children of this element and be assigned the classes `websy-trigger` and `websy-flippable`. The designated `front` element should be assigned the `active` class. They should also have a unique `data-group` attribute and each have their own `data-view` attribute. A corresponding **view** element is **NOT** required. Here is a simple example implementation:
``` html
<!-- containing element -->
<div style="position: relative; height: 200px; width: 200px;">
	<!-- front -->
	<div class="websy-trigger websy-flippable active" style="background-color: red;" data-view="front" data-group="flippable">
	</div>
	<!-- back -->
	<div class="websy-trigger websy-flippable" style="background-color: blue;" data-view="back" data-group="flippable">
	</div>
</div>
```

#### Toggle Behaviour
To create views that can be toggled on and off, simply add an the `websy-trigger-toggle` class to each applicable `Trigger Element`. This can be used for creating popup style dialogs that can be turned on and off without causing other views to be affected.

#### Methods

##### on()
In addition to the `onShow` and `onHide` options, you can subscribe to the Router and listen for when the current **view** has changed by using the `on` method passing in either **'show' or 'hide' as the first parameter and a callback for the second. The provided callback function receives up to 3 parameters, the id of the **view**, any available url parameters and the associated `group`.
``` javascript
router.on('show', (view, params, group) => {

})
router.on('hide', view => {

})
```

##### addUrlParams()
Url parameters can be add programatically by calling the `addUrlParams` method. This accepts the following parameters -
* **params** - An object containing key/value pairs of the url parameter names and values to be added.
* **reloadView** - (Optional) A boolean specifying whether or not the current view should be reloaded after the parameters have been added. Defaults to `false`.
* **noHistory** - (Optional) A boolean specifying whether or not the change in url parameters should be added to the browsers navigation history. Defaults to `true` meaning the change is **NOT** added to the history.

##### removeUrlParams()
Url parameters can be removed programatically by calling the `removeUrlParams method. This accepts the following parameters -
* **params** - An array containing the names of the url parameters to be removed.
* **reloadView** - (Optional) A boolean specifying whether or not the current view should be reloaded after the parameters have been added. Defaults to `false`.
* **noHistory** - (Optional) A boolean specifying whether or not the change in url parameters should be added to the browsers navigation history. Defaults to `true` meaning the change is **NOT** added to the history.

##### removeAllUrlParams()
All Url parameters can be removed programatically by calling the `removeAllUrlParams method. This accepts the following parameters -
* **reloadView** - (Optional) A boolean specifying whether or not the current view should be reloaded after the parameters have been added. Defaults to `false`.
* **noHistory** - (Optional) A boolean specifying whether or not the change in url parameters should be added to the browsers navigation history. Defaults to `true` meaning the change is **NOT** added to the history.
