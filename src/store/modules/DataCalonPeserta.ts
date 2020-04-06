const state = {
  token: {
    refresh:
      "",
    access:
      ""
  },
  calonPeserta: [
    {
      nama: "Joko Anwar",
      userName: "jokoanwar",
      rekaman: "linkdownloadrekaman"
    },
    {
      nama: "Bobby",
      userName: "bobbybobby",
      rekaman: "linkdownloadrekaman"
    }
  ]
};

const getters = {
  getCalonPeserta: () => {
    return state.calonPeserta;
  }
};
const mutations = {};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
