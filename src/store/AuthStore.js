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
        this.userLogined();
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
            window.localStorage.setItem("token", JSON.stringify(response.data.access_token));
            await this.getUser();
            navigate("/");
        });
    }
    async getUser() {
        if (this.loginInfo) {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/users/current-user`,
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

    userLogined(){
        this.user =JSON.parse( window.localStorage.getItem("user"));
    }

    async logOut(navigate) {
        console.log("logout");
        this.user = null;
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
        console.log("this.user",this.user);
        navigate("/login");
    }
}

export default AuthStore;
