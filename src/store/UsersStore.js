import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UsersStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    users = [];
    usersbyDepartment=[];
    total_count=0
    total_count_Department=0
    loading=false
    constructor() {
        makeAutoObservable(this);
    }
    async getListUsers(page=0,name="",company_code='') {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=${name}&status=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${company_code}`,
            {
                headers: {
                   Authorization: `Bearer ${this.access_token}`,
                },}
        );
        runInAction(() => {
            this.users = response.data.data; 
            this.total_count=response.data.total_count
        });
    }
    async getListUsersByDepartment(page=0,name="",department_code='',company_code='') {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/users?page=${page}&size=10&keyword=${name}&department_code=${department_code}&status=true&sort=&company_code=${company_code}`,
            {
                headers: {
                   Authorization: `Bearer ${this.access_token}`,
                },            }
        );
        runInAction(() => {
            this.usersbyDepartment = response.data.data; 
            this.total_count_Department=response.data.total_count
        });
    }
}

export default UsersStore;
