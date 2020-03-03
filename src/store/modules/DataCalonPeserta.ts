const state = {
  token: {
    refresh:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4MzI1NDQ4MCwianRpIjoiMmIwYTNkZmFiNjVkNDY2MmE0ZTdiMTJhMDM5OWYxMTEiLCJ1c2VyX2lkIjoiNzVjNjg5ZTMtMDIwOC00YTExLWJkNjItNzU1NmFjN2ZiMjg0In0.y81Oi8zDkVYusgQX25eiClZObaux8eorJ3gp54raSHg",
    access:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgzMjEyMTgwLCJqdGkiOiIzM2VlZDA3OTNmZTE0ZWMwOTM2NjI2OWRkZDA3YjA2MiIsInVzZXJfaWQiOiI3NWM2ODllMy0wMjA4LTRhMTEtYmQ2Mi03NTU2YWM3ZmIyODQifQ.X66BoISxQCOHvODwb2MkRr0aawGHZltbl-GtonG-6e4"
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
