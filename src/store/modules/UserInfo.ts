const state = {
    userLoggedIn: "",
    uid: "",
    token: ""
};
const getters = {
    getUserIdentification: () => {
        return state.uid;
    },
    getUserToken: () => {
        return state.token;
    },
    isUserLoggedIn: () => {
        return state.userLoggedIn
    }
};
const mutations = {
    setUserIdentification: (state: any, payload: any) => {
        state.uid = payload.value;
    },
    setUserToken: (state: any, payload: any) => {
        state.token = payload.value;
    }
};
const actions = {

};
export default {
    state,
    getters,
    mutations,
    actions
}