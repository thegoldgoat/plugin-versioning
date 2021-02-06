const defaultOptions = {
  versionField: 'cacheVersion',
  database: null,
}

export default {
  install(components, installOptions) {
    const pluginOptions = {
      ...defaultOptions,
      ...installOptions,
    }
    const versionField = pluginOptions.versionField
    const databaseOption = pluginOptions.database

    if (!databaseOption) {
      console.warn(
        '[VuexORMVersioning]: missing `database` option, schema versioning not enabled'
      )
    }

    const { Model, Query } = components

    // Expose versionField flag
    const localFieldModel = {
      [versionField]: Model.number(0),
    }

    const _saveGetFiedsMethod = Model.prototype.$fields
    Model.prototype.$fields = function () {
      const existing = _saveGetFiedsMethod.call(this)
      return Object.assign({}, existing, localFieldModel)
    }

    Query.on('beforeUpdate', function (model, _, entity) {
      model[versionField]++
      try {
        databaseOption.store.commit('versions/incrementVersion', entity)
      } catch (error) {}
    })

    Query.on('beforeCreate', function (_, __, entity) {
      try {
        databaseOption.store.commit('versions/incrementVersion', entity)
      } catch (error) {}
    })
  },
}
