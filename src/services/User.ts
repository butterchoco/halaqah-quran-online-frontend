/* eslint-disable */
import store from "@/store"
import axios from "axios"

function errorHandling(error: any) {
    if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
            store.dispatch("showAlertError", { value: 401 });
        } else {
            store.dispatch("showAlertError", { value: 500 });
        }
    } else if (error.request) {
        if (error.request.status >= 400 && error.request.status < 500) {
            store.dispatch("showAlertError", { value: 401 });
        } else {
            store.dispatch("showAlertError", { value: 500 });
        }
    } else {
        store.dispatch("showAlertError", { value: 404 });
    }
}

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
                    errorHandling(error)
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
                            if (data.roles[data.roles.length - 1].role_id == 1 || data.roles[data.roles.length - 1].role_id == 2) {
                                store.commit("setHasProgramRegistered", { value: true })
                            }
                            store.commit("setUserRole", {
                                role: data.roles
                            });
                        } else {
                            store.commit("setHasProgramRegistered", { value: false })
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
                    errorHandling(error)
                });
        })
    }

    static getLatestPeriod(env: string | undefined) {
        return new Promise((resolve, reject) => {
            axios
                .get(env + "/api/tahfidz/periods/latest/")
                .then(({ data }) => {
                    if (data.latest_opened != null) {
                        const today = new Date();
                        const parsedToday = Date.parse(today.toISOString())
                        const startDate = Date.parse(
                            data.latest_opened.start_time
                        );
                        const endDate = Date.parse(data.latest_opened.end_time);
                        if (parsedToday < endDate && parsedToday >= startDate) {
                            store.commit("setPeriod", {
                                latest_opened: data.latest_opened
                            });
                        }
                        resolve(data)
                    }
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                    errorHandling(error)
                });
        })
    }

    static refreshJWTToken(env: string | undefined, token: string) {
        return new Promise((resolve, reject) => {
            axios.post(env + "/api/auth/jwt/refresh/",
                {
                    refresh: token
                }
            ).then(({ data }) => {
                store.commit("removeAccessToken")
                store.commit("setAccessToken", { value: data.access });
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }

    static sendProgramRegistrationForm(env: string | undefined, token: string, periodId: string, term: string, form: any) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const referralNames = [form.referralName1, form.referralName2] + ""
            formData.append("term", term);
            formData.append("user", store.getters.getUserId);
            formData.append("age", form.age);
            formData.append("gender", form.gender);
            formData.append("domicile", form.domicile);
            formData.append("recording", form.recording);
            formData.append("juz_target_number", form.juzTargetNumber);
            formData.append("juz_number_memorized", form.juzNumberMemorized);
            formData.append("tahsin_experience", form.tahsinExperience);
            formData.append("pilihan_infaq", form.infaqOptionNumber);
            formData.append("referral_names", referralNames);
            formData.append("selection_period", periodId);
            formData.append("motivation", form.motivation);
            formData.append("program_reference", form.programInfoReference);
            axios
                .post(
                    env +
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
                    errorHandling(error)
                });
        })
    }

    static getAnnouncementReport(env: string | undefined, token: string, periodId: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    env +
                    "/api/tahfidz/selections/" +
                    periodId +
                    "/me/status/",
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    store.commit("setHarakatScore", { value: data["registration_status"]["harakat_mistake"] })
                    store.commit("setMadScore", { value: data["registration_status"]["mad_mistake"] })
                    store.commit("setGunnahScore", { value: data["registration_status"]["gunnah_mistake"] })
                    store.commit("setPassed", { value: data["registration_status"]["is_passed"] })
                    store.commit("setTahsinLevel", { value: data["registration_status"]["tahsin_level"] })
                    store.commit("setEvaluator", { value: data["registration_status"]["evaluator_name"] })
                    store.commit("setAnnouncementAvailable", { value: true })
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                    errorHandling(error)
                });
        })
    }

    static getActivation(env: string | undefined, params: any) {
        return new Promise((resolve, reject) => {
            axios
                .post(env + "/api/auth/users/activation/", {
                    uid: params.uid,
                    token: params.token
                })
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                    errorHandling(error)
                });
        })
    }

    static signUp(env: string | undefined, form: any) {
        return new Promise((resolve, reject) => {
            const nameArr = form.fullname.split(" ");
            const firstName = nameArr[0];
            const lastName = nameArr.slice(1, nameArr.length).join(" ");
            const formData = new FormData();
            formData.append("username", form.username);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("re_password", form.passwordValidation);
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("whatsapp_number", form.number);
            axios
                .post(env + "/api/auth/users/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    static signIn(env: string | undefined, form: any) {
        return new Promise((resolve, reject) => {
            axios
                .post(env + "/api/auth/jwt/create/", {
                    username: form.username,
                    password: form.password
                })
                .then(({ data }) => {
                    resolve(data)
                    store.commit("setRefreshToken", {
                        value: data.refresh
                    });
                    store.commit("setAccessToken", {
                        value: data.access
                    });
                }).catch((error) => {
                    reject(error)
                })
        })
    }

    static getAllCandidateScore(env: string | undefined, token: string, periodId: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    env +
                    "/api/tahfidz/selections/" +
                    periodId +
                    "/users/?evaluated=true",
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                    errorHandling(error)
                })
        })
    }

    static getCandidateData(env: string | undefined, token: string, periodId: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    env +
                    "/api/tahfidz/selections/" +
                    periodId +
                    "/users/",
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                    errorHandling(error)
                })
        })
    }

    static sendScoreCandidate(env: string | undefined, token: string, periodId: string, form: any, dataStudent: any) {
        return new Promise((resolve, reject) => {
            const UserId = store.getters.getUserId;
            const formData = new FormData();
            formData.append("evaluator", UserId);
            formData.append("harakat_mistake", form.harakatMistake);
            formData.append("mad_mistake", form.madMistake);
            formData.append("gunnah_mistake", form.gunnahMistake);
            formData.append("tahsin_level", form.levelTahsin);
            formData.append("is_passed", form.isLulus);
            formData.append("note", form.note);
            axios
                .post(
                    env +
                    "/api/selection/evaluation/?id=" +
                    dataStudent.id +
                    "&period=" +
                    periodId,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                    errorHandling(error)
                })
        })
    }

    static getScoreCandidate(env: string | undefined, token: string, periodId: string, dataStudent: any) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    env +
                    "/api/selection/evaluation/?id=" +
                    dataStudent.id +
                    "&period=" +
                    periodId,
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                    errorHandling(error)
                })
        })
    }

    static uploadTransactionProof(env: string | undefined, token: string, termId: string, form: any) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("payment_proof", form.transactionImg);
            axios
                .post(
                    process.env.VUE_APP_URL +
                    "/api/tahfidz/" +
                    termId +
                    "/me/payment/upload/",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(response => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                    errorHandling(error)
                });
        })
    }

    static getDataPembayaran(env: string | undefined, token: string, termId: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    env +
                    "/api/tahfidz/" +
                    termId +
                    "/me/payment/status/",
                    {
                        headers: {
                            Authorization: "JWT " + token
                        }
                    }
                )
                .then(({ data }) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                    errorHandling(error)
                })
        })
    }

    static getTeacherAvailableSchedule(env: string | undefined, term: string, token: string) {
        return new Promise((resolve, reject) => {
            axios.get(env + "/api/schedule/student/get/" + term, {
                headers: {
                    Authorization: "JWT " + token
                }
            }).then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }

    static sendStudentSchedule(env: string | undefined, token: string, scheduleId: any) {
        return new Promise((resolve, reject) => {
            axios.put(env + "/api/schedule/student/put/assign/" + scheduleId, {},
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "JWT " + token
                    }
                }
            ).then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }

    static getTeacherSchedule(env: string | undefined, term: string, token: string) {
        return new Promise((resolve, reject) => {
            axios.get(env + "/api/schedule/teacher/get/" + term, {
                headers: {
                    Authorization: "JWT " + token
                }
            }).then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }

    static sendTeacherSchedule(env: string | undefined, term: string, token: string, startDateTime: string, endDateTime: string) {
        return new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append("start_datetime", startDateTime)
            formData.append("end_datetime", endDateTime)
            axios.post(env + "/api/schedule/teacher/set/" + term, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "JWT " + token
                }
            }).then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }

    static deleteTeacherSchedule(env: string | undefined, token: string, scheduleId: string) {
        return new Promise((resolve, reject) => {
            axios.delete(env + "/api/schedule/teacher/delete/" + scheduleId, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "JWT " + token
                }
            }).then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
                errorHandling(error)
            })
        })
    }
}

export default User;