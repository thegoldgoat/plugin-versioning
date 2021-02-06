# plugin-versioning

This is a plugin for the [Vuex-ORM](https://github.com/vuex-orm/vuex-orm) library.
It adds one new flag `$version` (as _number_ attributes default value `0`) on any instance of the entities created through this library and, when an entity gets updated, it increments `$version` by 1.

Furthermore, it also provides a way to keep track of updates to an entire models, using a separate `versions` vuex module (see `example/versions.js`)

## Global Models Versioning

You need to pass the database object as a plugin option for it to work:

```javascript
import { Database }, VVuexORM from '@vuex-orm/core'
const database = new Database()

import Customer from '@/models/Customer'
database.register(Customer)
// [...]

VuexORM.use(VuexORMVersioning, { database: database })

```

Then, you need to provide a `versions` vuex module as the one in `example/versions.js`

## Other Plugin Options

By default, the flag is named `$version`.
You can override this default name by setting the corresponding options at plugin initialization.

| Option name  | Description                         | Default value |
| ------------ | ----------------------------------- | :-----------: |
| versionField | Sets the name of the _version_ flag |  `$version`   |

In order to use this option, you can pass it as the second parameter of the `install` call:

```javascript
VuexORM.use(VuexORMVersioning, {
  versionField: 'otherFieldName',
})
```
