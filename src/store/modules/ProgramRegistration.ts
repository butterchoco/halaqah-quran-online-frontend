/* eslint-disable */
const state = {
  HasProgramRegistered: false
};

const getters = {
  getHasProgramRegistered: () => {
    return state.HasProgramRegistered;
  }
};

const mutations = {
  setProgramRegistration: (payload: any) => {
    state.HasProgramRegistered = payload.value;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
