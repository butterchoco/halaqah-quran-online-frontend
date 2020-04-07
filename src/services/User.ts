/* eslint-disable */
import store from "@/store"
import axios from "axios"

class User {
    static getInfo(env: string | undefined, token: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(env + "/api/auth/users/me/", {
                    headers: {
                        Authorization: "JWT " + token
                    }
                })
                .then(({ status, data }) => {
                    if (status == 200) {
                        store.commit("setUserInfo", {
                            id: data["id"],
                            username: data["username"],
                            firstName: data["first_name"],
                            lastName: data["last_name"],
                            email: data["email"],
                            whatsappNumber: data["whatsapp_number"]
                        });
                        resolve(data);
                    } else {
                        reject(data)
                    }
                }).catch((error) => {
                    reject(error)
                    if (error.response === undefined) error = { response: { status: 404 } }
                    store.dispatch("showAlertError", { value: error.response.status });
                })
        })
    }

    static getRole(env: string | undefined, token: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(env + "/api/auth/users/me/roles/", {
                    headers: {
                        Authorization: "JWT " + token
                    }
                })
                .then(({ status, data }) => {
                    if (status == 200) {
                        if (data.roles.length != 0) {
                            store.commit("setUserRole", {
                                role: data.roles
                            });
                        } else {
                            store.commit("setUserRole", {
                                role: [
                                    {
                                        "role_id": 5,
                                        "description": ""
                                    }
                                ]
                            });
                        }
                        resolve(data)
                    } else {
                        reject(data)
                    }
                })
                .catch((error) => {
                    reject(error)
                    if (error.response === undefined) error = { response: { status: 404 } }
                    store.dispatch("showAlertError", { value: error.response.status });
                });
        })
    }

    static getLatestPeriod(env: string | undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(env + "/api/tahfidz/selections/latest/")
                .then(({ status, data }) => {
                    if (status == 200) {
                        if (data.latest_opened) {
                            const today = new Date();
                            const parsedToday = Date.parse(today.toDateString())
                            const startDate = Date.parse(
                                data.latest_opened.start_date
                            );
                            const endDate = Date.parse(data.latest_opened.end_date);
                            if (parsedToday < endDate && parsedToday >= startDate) {
                                store.commit("setSelectionPeriod", {
                                    selectionPeriod: {
                                        periodId: data.latest_opened.id,
                                        term:
                                            "TahfidzQu_" +
                                            today.getFullYear() +
                                            "_" +
                                            data.latest_opened.id
                                    }
                                });
                            } else {
                                store.commit("setSelectionPeriod", {
                                    selectionPeriod: {
                                        periodId: "",
                                        term: ""
                                    }
                                });
                            }
                        }
                        resolve(data)
                    } else {
                        reject(data)
                    }
                })
                .catch((error) => {
                    reject(error)
                    if (error.response === undefined) error = { response: { status: 404 } }
                    store.dispatch("showAlertError", { value: error.response.status });
                });
        })
    }

    static refreshJWTToken(env: string | undefined, token: string) {
        return new Promise((resolve, reject) => {
            axios.post(env + "/api/auth/jwt/refresh/",
                {
                    refresh: token
                }
            ).then(({ status, data }) => {
                if (status == 200) {
                    store.commit("removeAccessToken")
                    store.commit("setAccessToken", { value: data.access });
                    resolve(data)
                } else {
                    reject(data)
                }
            }).catch((error) => {
                reject(error)
                if (error.response === undefined) error = { response: { status: 404 } }
                store.dispatch("showAlertError", { value: error.response.status });
            })
        })
    }

    static sendProgramRegistrationForm(env: string | undefined, token: string, periodId: string, form: any) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const referralNames = [form.referralName1, form.referralName2] + ""
            formData.append("term", store.getters.getSelectionPeriodTerm);
            formData.append("user", store.getters.getUserId);
            formData.append("age", form.age);
            formData.append("domicile", form.domicile);
            formData.append("recording", form.recording);
            formData.append("juz_target_number", form.juzTargetNumber);
            formData.append("juz_number_memorized", form.juzNumberMemorized);
            formData.append("tahsin_experience", form.tahsinExperience);
            formData.append("pilihan_infaq", form.infaqOptionNumber);
            formData.append("referral_names", referralNames);
            formData.append("selection_period", store.getters.getSelectionPeriodId);
            axios
                .post(
                    process.env.VUE_APP_URL +
                    "/api/tahfidz/selections/" +
                    periodId +
                    "/",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(response => {
                    store.commit("setHasProgramRegistered", {
                        value: response.data["has_registered"]
                    });
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                    if (error.response === undefined) error = { response: { status: 404 } }
                    store.dispatch("showAlertError", { value: error.response.status });
                });
        })
    }

    static getAnnouncementReport(env: string | undefined, token: string, selectionPeriod: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    process.env.VUE_APP_URL +
                    "/api/tahfidz/selections/" +
                    selectionPeriod +
                    "/me/status/",
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    store.dispatch("setHarakatScore", { value: data["registration_status"]["harakat_mistake"] })
                    store.dispatch("setMadScore", { value: data["registration_status"]["mad_mistake"] })
                    store.dispatch("setGunnahScore", { value: data["registration_status"]["gunnah_mistake"] })
                    store.dispatch("setPassed", { value: true })
                    store.dispatch("setTahsinLevel", { value: data["registration_status"]["tahsin_level"] })
                    store.dispatch("setEvaluator", { value: data["registration_status"]["evaluator_name"] })
                    store.dispatch("setAnnouncementAvailable", { value: true })
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                });
        })
    }
}

export default User;