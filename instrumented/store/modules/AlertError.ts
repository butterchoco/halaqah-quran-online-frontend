/* eslint-disable */

const state = {
    alert: {
        visible: false,
        title: "",
        messageError: "",
        responseCode: {
            404: {
                title: "Koneksi terputus",
                content: "Silahkan segarkan kembali halaman anda !"
            },
            401: {
                title: "Kesalahan permintaan",
                content: "Silahkan coba kembali !"
            },
            500: {
                title: "Kesalahan server",
                content: "Silahkan tunggu beberapa saat dan coba kembali !"
            }
        }
    },
};

const getters = {
    getShowAlertError: (state: any) => {
        return state.alert.visible
    },
    getTitleAlertError: (state: any) => {
        return state.alert.title
    },
    getMessageAlertError: (state: any) => {
        return state.alert.messageError
    },
    getMessageWithResponseCode: (state: any, payload: any) => {
        return state.alert.responseCode[payload.value]
    }
};

const mutations = {
    setShowAlertError: (state: any, payload: any) => {
        state.alert.visible = payload.value
    },
    setTitleAlertError: (state: any, payload: any) => {
        state.alert.title = payload.value
    },
    setMessageAlertError: (state: any, payload: any) => {
        state.alert.messageError = payload.value
    },
};

const actions = {
    showAlertError: ({ commit }: any, payload: any) => {
        commit("setShowAlertError", {
            value: true,
        })
        commit("setTitleAlertError", { value: getters.getMessageWithResponseCode(state, { value: payload.value }).title })
        commit("setMessageAlertError", { value: getters.getMessageWithResponseCode(state, { value: payload.value }).content })
    },
    hideAlertError: ({ commit }: any) => {
        commit("setShowAlertError", {
            value: false
        })
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
