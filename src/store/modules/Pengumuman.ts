const state = {
  isTahfizhProgramAccepted: true
};
const getters = {
  getIsAccepted: () => {
    return state.isTahfizhProgramAccepted;
  }
};
const mutations = {
  setAccepted: (payload: boolean) => {
    state.isTahfizhProgramAccepted = payload;
  }
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
