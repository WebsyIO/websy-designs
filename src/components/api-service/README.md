## Websy API Service
The Websy API Service provides a simple interface for performing traditional CRUD operations with REST based APIs.

#### Initializing the API Service
To instantiate a new instance of an APIService, you can do the following. An optional parameter can be provided to specify a base Url to be used for all requests sent by the service.
``` javascript
const apiService = new WebsyDesigns.APIService(<baseUrl>, <{options}>)
```

#### Requests

###### **get**
The `get` method performs a **GET** request and accepts up to 3 parameters:
* **endpoint** - The Url to be used for the request. If a `baseUrl` was provided, this value will be appended to it. The value should not start with a `/`.
* **id** - (Optional) An Id can be passed in which will be appended to the endpoint as `/id`.
* **query** - (Optional) An **array** of properties which will be converted into a `where` query parameter. The **query** parameter has been designed specifically for use with a **Websy Designs Server** implementation.

The method returns a promise which is provided with a single parameter that represents the returned data as a **JSON** object.

This is an example request that uses the **id** parameter.
``` javascript
const apiService = new WebsyDesigns.APIService('/api')
// the evaluated url would be '/api/customers/12'
apiService.get('customers', 12).then(result => {

})
```

This is an example request that uses the **query** parameter.
``` javascript
const apiService = new WebsyDesigns.APIService('/api')
// the evaluated url would be '/api/customers?where=country:Spain;status:Active'
apiService.get('customers', null, ['country:Spain', 'status:Active']).then(result => {

})
```

To add additional query parameters or use a custom url format, use the **endpoint** parameter.

###### **add**
The `add` method performs a **POST** request and accepts up to 3 parameters:
* **endpoint** - The Url to be used for the request. If a `baseUrl` was provided, this value will be appended to it. The value should not start with a `/`.
* **data** - (Optional) An object that contains the data to be posted with the request.
* **options** - (Optional) An object with additional options to be used in the request.
  * **responseType** - (Optional) The type of data returned from the request. Defaults to **text**.
  * **headers** - (Optional) An object with any additional headers to be sent with the request.

The method returns a promise which is provided with a single parameter that represents the returned data as a **JSON** object.

