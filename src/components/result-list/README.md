## Websy ResultList
A component that can be used to render an array of data using an HTML template.

#### Initializing a ResultList component
To instantiate a new instance of a ResultList, you can do the following, specifying the `elementId` of HTML element where you want to place the ResultList and any additional options.
``` javascript
const myResultList = new WebsyDesigns.ResultList(elementId, {options})
```

#### Options
The following options can be provided -
* **template** - (string or object) If a `string` is provided, should represent the HTML to be used to render the data. If an `object` is provided, should contain a `url` property with the url to an HTML file with the required template markup.
* **noRowsHTML** - (optional) An HTML string to be used if no data is provided to the component.
* **listeners** - An object containing event listener definitions. See below for more information.

#### Data
Data can be provided to the ResultList by setting the `data` property -
``` javascript
myResultList.data = [{name: 'Nick', location: 'Madrid'}, {name: 'Peter', location: 'Worcester'}]
```

#### Template Syntax
The HTML template provided will be repeated for each row in the `data`. The properties available in each entry in `data` will be available in the template. The following syntax can be used in the HTML to inject values from the data.

##### Value Injection
To inject values dynamically into a template, the property name should be provided inside curly brackets, like this
```HTML
<div>{name}</div>
```

##### Conditional Blocks

##### Nested Arrays

##### Event Listeners

#### Events and Event Listeners
