import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class GeneralNotifStore  {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    news=[];

    constructor() {
        makeAutoObservable(this)
        this.getGeneralNotif();
    }
    async getGeneralNotif() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/news?page=1&size=10`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(()=>{
            this.news= response.data.data
        })
    }
};

export default GeneralNotifStore;

