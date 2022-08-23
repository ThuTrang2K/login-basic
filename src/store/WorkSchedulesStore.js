import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import React from "react";

class WorkSchedulesStore {
    schedules = [];
    constructor() {
        makeAutoObservable(this);
    }
    // eventByDate = [];
    async getschedules(date) {
        const startDate = date?.startOf("week").format("YYYY-MM-DD");

        const endDate = date?.endOf("week").format("YYYY-MM-DD");
        const access_token = JSON.parse(window.localStorage.getItem("token"));
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules?from_date=${startDate}&to_date=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        runInAction(() => {
            this.schedules = response.data.map((item) => {
                return { ...item, date: moment(item["start_at"]).day() };
            });
            // this.eventByDate = this.groupEventByDate();
            // console.log(this.eventByDate);
            // console.log(this.schedules);
        });
    }

    // groupEventByDate() {
    //     return this.schedules.reduce((result, currentItem) => {
    //         (result[currentItem.date] =
    //             result[currentItem.date] || []).push(currentItem);
    //         return result;
    //     }, []).filter(item=>item!==undefined);
    // }
}

export default WorkSchedulesStore;
