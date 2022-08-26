import React from "react";
import axios from "axios";
import FormData from "form-data";
import { makeAutoObservable, runInAction } from "mobx";

// const fs = require('fs/promises');
class EventStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    event = {};
    departments = [];
    files = [];

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

    async uploadFile(file) {
        const data = new FormData();
        data.append("file", file.originFileObj);
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/upload`,
            data,
            {
                headers: {
                    // ...data.getHeaders(),
                    Authorization: `Bearer ${this.access_token}`,
                    "content-type": "multipart/form-data",
                },
            }
        );
        runInAction(() => {
            this.files = [...this.files, response.data.file_id];
            console.log("file array", this.files);
        });
    }

    async downLoad(file_id,file_name) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/upload/attachments/${file_id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
                responseType: "blob",
            }
        );
        runInAction(() => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file_name); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    async createEvent(data) {
        console.log("create");
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids: this.files,
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
        this.files = [];
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
        return await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/v1/work-schedules/${id}`,
            {
                attenders: data.attenders,
                end_time: data.end_time,
                end_at: data.end_at,
                start_date: data.start_date,
                start_time: data.start_time,
                event_notice: data.event_notice,
                file_ids: this.files,
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
