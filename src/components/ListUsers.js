import { Avatar, Pagination, Table } from 'antd';
import React from 'react';
import useCapitalizeTheFirstLetter from '../hook/useCapitalizeFirstLetter';

const ListUsers = ({curentPage,dataSource,total,setCurentPage}) => {
    const columns = [
        {
            title: "Thông tin",
            dataIndex: "name_capitalized",
            key: "name_capitalized",
            render: (text) => (
                <div className="contacts-flex">
                    <Avatar>{text.at(0)}</Avatar>
                    <span className="contacts-name">{text}</span>
                </div>
            ),
            width: "25%",
        },
        {
            title: "ID",
            dataIndex: "username",
            key: "username",
            width: "5%",
        },
        {
            title: "Mã nhân viên",
            dataIndex: "ma_nv",
            key: "ma_nv",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "10%",
        },
        {
            title: "Điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
            width: "5%",
        },
        {
            title: "Số máy nội bộ",
            dataIndex: "home_phone",
            key: "home_phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
            width: "10%",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
            width: "10%",
        },
        {
            title: "Chức vụ",
            dataIndex: "position",
            key: "address",
            width: "10%",
        },
        {
            title: "Phòng ban",
            dataIndex: "department",
            key: "department",
            width: "15%",
        },
    ];
    
    return (
        <>
            <div className="contacts-table-wrapper">
            <Table
                columns={columns}
                rowKey={(record) => record.code}
                dataSource={dataSource}
            />
            </div>
            <Pagination
                className="contacts-users-pagination"
                defaultCurrent={curentPage + 1}
                current={curentPage + 1}
                pageSize={10}
                total={total}
                onChange={(page) => {
                    setCurentPage(page - 1);
                }}
            />
        </>
    );
};

export default ListUsers;