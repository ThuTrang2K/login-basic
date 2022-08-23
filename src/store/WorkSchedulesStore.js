import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

class WorkSchedulesStore {
    schedules = [];
    constructor() {
        makeAutoObservable(this);
    }
    async getschedules(date) {
        const startDate = date?.startOf("week").format("YYYY-MM-DD");

        const endDate = date?.endOf("week").format("YYYY-MM-DD");
        console.log(startDate,endDate);
        const access_token = JSON.parse(window.localStorage.getItem("token"));
        console.log(process.env);
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules?from_date=${startDate}&to_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        runInAction(() => {
            console.log(response.data);
            this.schedules = response.data;
        });
    }
}

export default WorkSchedulesStore;
