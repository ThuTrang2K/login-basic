import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class GeneralNotifStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    news = [];
    newsDetail={};
    constructor() {
        makeAutoObservable(this);
        this.getGeneralNotif();
    }
    async getGeneralNotif() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/news?page=0&size=10`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.news = response.data.data;
        });
    }

    async getNewsById(id) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/news/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.newsDetail = response.data;
        });
    }

    async createNews(data) {
        return await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/news`,
            {
                subject: data.subject,
                content: data.content,
                author: data.author,
                attachments_request: data.attachments_request,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
         
    }

    async deleteNews(id) {
        return await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/news/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
}

export default GeneralNotifStore;
