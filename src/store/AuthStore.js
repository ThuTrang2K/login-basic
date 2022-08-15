import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import qs from "qs";

class AuthStore {
    loginInfo = null;
    user = null;
    error = null;
    constructor() {
        makeAutoObservable(this);
    }
    async loginUser(user, navigate) {
        const response = await axios.post(
            `https://stg.sso.fafu.com.vn/auth/realms/VIMC/protocol/openid-connect/token`,
            qs.stringify(user),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        runInAction(async () => {
            console.log(response.data);
            this.loginInfo = response.data;
            this.error =response.data ? null: "Lỗi";
            await this.getUser();
            navigate("/");
        });
    }
    async getUser() {
        if (this.loginInfo) {
            const response = await axios.get(
                "https://stg.vimc.fafu.com.vn/api/v1/users/current-user",
                {
                    headers: {
                        Authorization: `Bearer ${this.loginInfo?.access_token}`,
                    },
                }
            );
            runInAction(async () => {
                console.log(response.data);
                this.user = await response.data;
                window.localStorage.setItem("user", JSON.stringify(this.user));
            });
        }
    }

    async logOut(navigate) {
        console.log("logout");
        this.user = null;
        await window.localStorage.removeItem("user");
        navigate("/login");
    }
}

export default AuthStore;
