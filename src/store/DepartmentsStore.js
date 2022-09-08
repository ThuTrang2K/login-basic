import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class DepartmentsStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    departments = [];

    constructor() {
        makeAutoObservable(this);
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

export default DepartmentsStore;
