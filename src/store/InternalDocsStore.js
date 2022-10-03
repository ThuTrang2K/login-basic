import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class InternalDocsStore {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    incoming = [];
    total_incoming_count = 0;
    outgoing = [];
    total_outgoing_count = 0;
    electronic = [];
    total_electronic_count = 0;
    bookGroups = [];
    books = [];
    incoming_number = 0;
    users = [];
    companies=[];
    detailIncoming={}
    listGroups=[];
    groupMembers=[]
    loading = false; 
    warnDocNumberError= "";
    constructor() {
        makeAutoObservable(this);
    }
    async getListIncoming(
        page = 0,
        { title = "", incoming_date, date_issued, signer, authority_name }
    ) {
        this.loading = true;
        this.error = "";
        const from_incoming_date = incoming_date
            ? `&from_incoming_date=${incoming_date[0].format("YYYY-MM-DD")}`
            : "";
        const to_incoming_date = incoming_date
            ? `&to_incoming_date=${incoming_date[1].format("YYYY-MM-DD")}`
            : "";
        const from_date_issued = date_issued
            ? `&from_date_issued=${date_issued[0].format("YYYY-MM-DD")}`
            : "";
        const to_date_issued = date_issued
            ? `&to_date_issued=${date_issued[1].format("YYYY-MM-DD")}`
            : "";
        signer = signer ? `&signer=${signer}` : "";
        authority_name = authority_name
            ? `&authority_name=${authority_name}`
            : "";
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/incoming?page=${page}&size=10${from_date_issued}${from_incoming_date}${signer}&title=${title}${to_date_issued}${to_incoming_date}${authority_name}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.incoming = response.data.data;
                this.total_incoming_count = response.data.total_count;
                console.log("this.incoming", this.incoming);
                this.loading = false;
                this.error = "";
            });
        } catch (e) {
            console.log("e", e);
            this.error = "Có Lỗi xảy ra";
            this.loading = false;
        }
    }
    async createIncoming(data) {
        this.loading = true;
        this.error = "";
        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/incoming`,
                {
                    ...data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.loading = false;
                this.error = "";
            });
        } catch (e) {
            console.log("e", e);
            this.error = e.response.data.errorMessage.messages.vi;
            this.loading = false;
        }
    }
    async warnDocNumber(document_number,type) {
        this.loading = true;
        this.warnDocNumberError = "";
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/incoming/warning-document-number?document_number=${document_number}&type=${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.loading = false;
                console.log(response.data.status)
                this.warnDocNumberError =response.data.status==="OK"? "": response.data.message;
            });
        } catch (e) {
            console.log("e", e);
            this.warnDocNumberError = "Có Lỗi xảy ra";
            this.loading = false;
        }
    }
    async getListOutgoing(page = 0) {
        this.loading = true;
        this.error = "";
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/outgoing?page=${page}&size=10`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.outgoing = response.data.data;
                this.total_outgoing_count = response.data.total_count;
                this.loading = false;
                this.error = "";
            });
        } catch (e) {
            console.log("e", e);
            this.error = "Có Lỗi xảy ra";
            this.loading = false;
        }
    }
    async getListElectronic(page = 0) {
        this.loading = true;
        this.error = "";
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/electronic-document?page=${page}&size=10`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.electronic = response.data.data;
                this.total_electronic_count = response.data.total_count;
                this.loading = false;
                this.error = "";
            });
        } catch (e) {
            console.log("e", e);
            this.error = "Có Lỗi xảy ra";
            this.loading = false;
        }
    }
    async getListBookGroups(type = "") {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/book-groups?type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.bookGroups = response.data;
        });
    }
    async getListBooks(bookGroupId = "") {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/book-groups/${bookGroupId}/books`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.books = response.data;
        });
    }
    async getIncomingNumber(bookId = "") {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/incoming/suggest-incoming-number?book_id=${bookId}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.incoming_number = response.data.incoming_number;
            console.log(this.incoming_number);
        });
    }
    async getListUsers(company_code) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/departments/users?sort=departmentCode,desc,CDTCT,BCNTT,VPCQTCT,BTGTT,BPC%2526QTRR,BTTKH,BCB%2526DVHH,BVTB,BKTKTNB,BTKTH,BTCKT,BTCNS,BDH,HDQT&company_code=${company_code}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.users = response.data;
        });
    }
    async getListCompanies() {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/companies?status=true`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.companies = response.data;
        });
    }
    async getDetailIncoming(id) {
        this.loading = true;
        this.error = "";
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }
            );
            runInAction(() => {
                this.detailIncoming = response.data;
                this.loading = false;
                this.error = "";
            });
        } catch (e) {
            console.log("e", e);
            this.error = "Có Lỗi xảy ra";
            this.loading = false;
        }
    }
    async deleteIncoming(id) {
        await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/internal-documents/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
    }
    async getListGroup(company_code) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/group/list?page=0&size=1000&company_code=${company_code}`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.listGroups = response.data.data;
        });
    }
    async getListGroupMembers(id_group) {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/group/${id_group}/member?page=0&size=100`,
            {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            }
        );
        runInAction(() => {
            this.groupMembers = response.data.data;
        });
    }
    
}

export default InternalDocsStore;
