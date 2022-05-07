import Cookies from 'js-cookie'

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
      !state.currentUser.role) {
      return
    }
    const currentUserRoleNames = state.currentUser.role
    return currentUserRoleNames
  }
}

const mutations = {
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  },
  setRole (state, currentUser) {
    if (currentUser !== {}) {
      Cookies.set('role', currentUser.role, { expires: 7 })
    }
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
