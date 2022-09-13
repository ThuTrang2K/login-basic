import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class PositionsStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    positions = [];
    constructor() {
        makeAutoObservable(this);
    }
    async getListPosition() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/positions`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.positions = response.data;
        });
    }
}

export default PositionsStore;
