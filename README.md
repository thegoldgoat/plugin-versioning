# plugin-versioning

This is a plugin for the [Vuex-ORM](https://github.com/vuex-orm/vuex-orm) library.
It adds one new flag `$version` (as _number_ attributes default value `0`) on any instance of the entities created through this library and, when an entity gets updated, it increments `$version` by 1.

## Plugin Options

By default, the flag is named `$version`.
You can override this default name by setting the corresponding options at plugin initialization.

| Option name  | Description                         | Default value |
| ------------ | ----------------------------------- | :-----------: |
| versionField | Sets the name of the _version_ flag |  `$version`   |

In order to use this option, you can pass it as the second parameter of the `install` call:

```javascript
VuexORM.use(VuexORMisDirtyPlugin, {
  versionField: 'otherFieldName',
})
```
