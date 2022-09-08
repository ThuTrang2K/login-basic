import React from "react";
import axios from "axios";
import FormData from "form-data";
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
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules/${id}`,
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
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids: data.file_ids,
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
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }

    async UpdateEvent(data, id) {
         await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules/${id}`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids:data.file_ids ,
                host: data.host,
                location: data.location,
                preparation: data.preparation,
                start_at: data.start_at,
                title: "",
                assign_person_update: data.assign_person_update,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        this.files = [];
    }
    async getListDepartmentsUsers() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/departments/users`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.departments = response.data.map((item) => {
                return {
                    title: item.name,
                    value: item.name,
                    code: item.code,
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
