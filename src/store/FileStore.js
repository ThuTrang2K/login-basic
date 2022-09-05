import React from 'react';
import axios from "axios";
import FormData from "form-data";
import { makeAutoObservable, runInAction } from "mobx";

class FileStore  {
    access_token = JSON.parse(window.localStorage.getItem("token"));
    files = [];
    
    constructor() {
        makeAutoObservable(this);
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
     
};

export default FileStore;