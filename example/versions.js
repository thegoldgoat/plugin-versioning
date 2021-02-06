export const state = () => {
  return {
    versions: {
      customers: 0,
    },
  }
}

export const getters = {
  versions: (state) => state.versions,
}

export const mutations = {
  addAllVersions(state, newVersions) {
    state.versions = newVersions
  },
  updateVersion(state, { entity, value }) {
    try {
      state.versions[entity] = value
    } catch (error) {
      console.error(`[versions/incrementVersion]: entity '${entity}' not found`)
    }
  },
  incrementVersion(state, entity) {
    try {
      state.versions[entity]++
    } catch (error) {
      console.error(`[versions/incrementVersion]: entity '${entity}' not found`)
    }
  },
}
