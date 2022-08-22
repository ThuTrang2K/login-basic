import React from "react";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class EventStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    event = {};
    departments = [];

    constructor() {
        makeAutoObservable(this);
    }
    async getEventById(id) {
        const response = await axios.get(
            `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.event = response.data;
        });
    }

    async createEvent(data) {
        return await axios.post(
            `https://stg.vimc.fafu.com.vn/api/v1/work-schedules`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids: [],
                host: data.host,
                location: data.location,
                preparation: data.preparation,
                start_at: data.start_at,
                title: "",
                assignees: data.assignees,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }

    async deleteEvent(id) {
        return await axios.delete(
            `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }

    async UpdateEvent(data, id) {
        return await axios.put(
            `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${id}`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids: [],
                host: data.host,
                location: data.location,
                preparation: data.preparation,
                start_at: data.start_at,
                title: "",
                assign_person_update:data.assign_person_update
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async getListDepartmentsUsers() {
        const response = await axios.get(
            `https://stg.vimc.fafu.com.vn/api/v1/departments/users`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            console.log("newDtata", response.data);
            this.departments = response.data.map((item) => {
                return {
                    title: item.name,
                    value: item.name,
                    children: item.users.map((user) => {
                        return {
                            title: user.name_uppercase,
                            value: user.user_name,
                        };
                    }),
                };
            });
        });
    }
}

export default EventStore;
