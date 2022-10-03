import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class AuthorityIssuedsStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    authorityIssueds = [];
    members = [];
    error = "";

    constructor() {
        makeAutoObservable(this);
    }
    async getListAuthorityIssueds(type = "") {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/authority-issueds?type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.authorityIssueds = response.data;
        });
    }
    async createAuthorityIssued(data) {
        this.loading = true;
        this.error = "";
        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/authority-issueds`,
                { ...data },
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            this.loading = false;
            this.error = "";
        } catch (e) {
            console.log("e", e);
            this.error = e.response.data.errorMessage.messages.vi;
            this.loading = false;
        }
    }
    async getMembers(id) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/group/${id}/member?page=0&size=100`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.memebers = response.data.data;
        });
    }
}

export default AuthorityIssuedsStore;
