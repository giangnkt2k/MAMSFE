const state = () => ({
  currentUser: {},
  currentUserRoleNames: []
})

const getters = {
  getCurrentUser (state) {
    return state.currentUser
  },
  getCurrentUserRoleNames (state) {
    if (!state.currentUser ||
      !state.currentUser.role ||
      !state.currentUser.role.length) {
      return
    }
    const currentUserRoleNames = state.currentUser.role
      .map(item => item.name) || []
    return currentUserRoleNames
  }
}

const mutations = {
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
