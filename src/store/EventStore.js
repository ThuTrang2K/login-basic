import React from 'react';
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class EventStore  {
    event = {};
    constructor() {
        makeAutoObservable(this);
    }
    // async getUserById(id) {
    //     const response = await axios.get(
    //         `https://prod.example.fafu.com.vn/employee/${id}`
    //     );
    //     runInAction(() => {
    //         response.data.gender =
    //             response.data.gender === 1 ? "male" : "female";
    //         response.data.birthday = new Date(response.data.birthday)
    //             .toISOString()
    //             .slice(0, 10);
    //         this.user = response.data;
    //     });
    // }

    async createEvent(data){
        return await axios.post(
            `https://stg.vimc.fafu.com.vn/api/v1/work-schedules`,
            {
                attenders: data.attenders,
                end_at: data.end_at,
                event_notice: data.event_notice,
                file_ids: data.file_ids,
                host: data.host,
                location: data.location,
                preparation: data.preparation,
                start_at: data.start_at,
                title: data.title,
            })
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
};

export default EventStore;





