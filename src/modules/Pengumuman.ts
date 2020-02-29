const state = {
  isAccepted: true
};
const getters = {
  getIsAccepted: () => {
    return state.isAccepted;
  }
};
const mutations = {
  setAccepted: (state: any, payload: any) => {
    state.isAccepted = payload.value;
    console.log("New State: " + state.isAccepted);
  }
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
