const state = {
  HasProgramRegistered: false
};

const getters = {
  getHasProgramRegistered: () => {
    return state.HasProgramRegistered;
  }
};

const mutations = {
  setProgramRegistration: (payload: boolean) => {
    state.HasProgramRegistered = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
