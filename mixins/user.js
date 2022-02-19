const state = () => ({
  currentUser: {},
  currentUserRoleNames: [],
});

const getters = {
  getCurrentUser(state) {
    return state.currentUser;
  },
  getCurrentUserRoleNames(state) {
    if (!state.currentUser ||
      !state.currentUser.roles ||
      !state.currentUser.roles.length) {
      return;
    }
    const currentUserRoleNames = state.currentUser.roles.
        map((item) => item.name) || [];
    return currentUserRoleNames;
  },
};

const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
