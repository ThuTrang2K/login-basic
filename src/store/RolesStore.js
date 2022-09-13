import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class RolesStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    roles = [];
    constructor() {
        makeAutoObservable(this);
    }
    async getListRoles() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/roles`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.roles = response.data;
        });
    }
}

export default RolesStore;
