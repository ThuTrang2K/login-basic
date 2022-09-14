import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UsersStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    users = [];
    user = {};
    commands=[];
    usersbyDepartment = [];
    total_count = 0;
    total_count_Department = 0;
    loading = false;
    constructor() {
        makeAutoObservable(this);
    }
    async getListUsers(
        page = 0,
        {
            keyword = "",
            department_code = "",
            status = "",
            direction = "",
            sort_by = "",
        },
        company_code = ""
    ) {
        department_code = department_code
            ? `&department_code=${department_code}`
            : "";
        status = status ? `&status=${status}` : "";
        direction = direction ? `&direction=${direction}` : "";
        sort_by = sort_by ? `&sort_by=${sort_by}` : "";

        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=${keyword}${department_code}${status}${direction}${sort_by}&has_admin=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${company_code}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.users = response.data.data;
            this.total_count = response.data.total_count;
        });
    }
    async getUserByUser_code(user_code) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/accounts?user_code=${user_code}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.user = response.data[0];
        });
    }
    async getUserCommands() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/commands`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.commands = response.data;
        });
    }
    // async getListUsers(page=0,name="",company_code='') {
    //     const response = await axios.get(
    //         `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=${name}&status=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${company_code}`,
    //         {
    //             headers: {
    //                Authorization: `Bearer ${this.access_token}`,
    //             },}
    //     );
    //     runInAction(() => {
    //         this.users = response.data.data;
    //         this.total_count=response.data.total_count
    //     });
    // }
    async getListUsersByDepartment(
        page = 0,
        name = "",
        department_code = "",
        company_code = ""
    ) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=${name}&department_code=${department_code}&status=true&sort=&company_code=${company_code}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.usersbyDepartment = response.data.data;
            this.total_count_Department = response.data.total_count;
        });
    }
    async createUser(data) {
        await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users`,
            {
                ...data
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async updateUserById(data, id) {
        await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`,
            {
                ...data
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async updateUserCommands(data, user_code) {
        await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/${user_code}/commands`,
            {
                commands : data
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async updateUserStatus(status, id) {
        await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}`,
            {
                status: status,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async updateUserRoles(data, id) {
        await axios.patch(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}/roles`,
            {
                role_name: data,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
}

export default UsersStore;
