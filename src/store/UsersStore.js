import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UsersStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    users = [];
    total_count=0
    loading=false
    constructor() {
        makeAutoObservable(this);
    }
    async getListUsers(page=0) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=&status=`,
            {
                headers: {
                   Authorization: `Bearer ${this.access_token}`,
                },            }
        );
        runInAction(() => {
            this.users = response.data.data; 
            this.total_count=response.data.total_count
        });
    }
//     async getNewsById(id) {
//         const response = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/api/v1/news/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${this.access_token}`,
//                 },
//             }
//         );
//         runInAction(() => {
//             this.newsDetail = response.data;
//         });
//     }
// 
//     async createNews(data) {
//         this.loading=true
//         await axios.post(
//             `${process.env.REACT_APP_BASE_URL}/api/v1/news`,
//             {
//                 subject: data.subject,
//                 content: data.content,
//                 author: data.author,
//                 attachments_request: data.attachments_request,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${this.access_token}`,
//                 },
//             }
//         );
//         this.loading=false
//     }
// 
//     async deleteNews(id) {
//         return await axios.delete(
//             `${process.env.REACT_APP_BASE_URL}/api/v1/news/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${this.access_token}`,
//                 },
//             }
//         );
//     }
// 
//     async UpdateNews(data, id) {
//         await axios.patch(
//            `${process.env.REACT_APP_BASE_URL}/api/v1/news`,
//            {
//                 id:data.id,
//                 subject: data.subject,
//                 content: data.content,
//                 author: data.author,
//                 attachments_request: data.attachments_request,
//            },
//            {
//                headers: {
//                    Authorization: `Bearer ${this.access_token}`,
//                },
//            }
//        );
//        this.files = [];
//    }
}

export default UsersStore;
