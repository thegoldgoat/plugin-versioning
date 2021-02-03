const defaultOptions = {
  versionField: '$version',
}

export default {
  install(components, installOptions) {
    const pluginOptions = {
      ...defaultOptions,
      ...installOptions,
    }
    const versionField = pluginOptions.versionField

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

    Query.on('beforeUpdate', function (model) {
      model[versionField]++
    })
  },
}
