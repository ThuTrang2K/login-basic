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
            // response.data.gender =
            //     response.data.gender === 1 ? "male" : "female";
            // response.data.birthday = new Date(response.data.birthday)
            //     .toISOString()
            //     .slice(0, 10);
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
                start_time:data.start_time,
                event_notice: data.event_notice,
                file_ids: [],
                host: data.host,
                location: data.location,
                preparation: data.preparation,
                start_at: data.start_at,
                title: '',
                assignees: data.assignees
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }

    //     async deleteUser(id){
    //         return await axios.delete(
    //             `https://prod.example.fafu.com.vn/employee/${id}`
    //         )
    //     }
    //
    //     async UpdateUser(data,id){
    //         return await axios.put(
    //             `http://prod.example.fafu.com.vn/employee/${id}?`,
    //             {
    //                 username: data.username,
    //                 firstname: data.firstname,
    //                 lastname: data.lastname,
    //                 email: data.email,
    //                 phone: data.phone,
    //                 address: data.address,
    //                 birthday: data.birthday,
    //                 gender: data.gender,
    //             }
    //         );
    //     }
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
