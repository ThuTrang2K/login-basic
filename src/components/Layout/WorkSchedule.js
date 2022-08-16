import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, DatePicker, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context";

const columns = [
    {
        title: "Ngày tháng",
        dataIndex: "start_at",
        key: "start_at",
    },
    {
        title: "Nội dung công việc",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Tài liệu",
        dataIndex: "preparation",
        key: "preparation",
    },
    {
        title: "Thành Viên tham gia",
        dataIndex: "attenders",
        key: "attenders",
    },
    {
        title: "Chủ trì",
        dataIndex: "host",
        key: "host",
    },
];

const WorkSchedule = observer(() => {
    const { workSchedulesStore } = useContext(AuthContext);
    useEffect(() => {
        workSchedulesStore.getschedules();
    }, []);
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                    fontWeight: 500,
                    fontSize: 12,
                }}
            >
                <Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Lịch cơ quan</Breadcrumb.Item>
            </Breadcrumb>

            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            console.log(event.currentTarget);
                        }, // click row
                    };
                }}
                key={workSchedulesStore?.schedules?.schedule_code}
                columns={columns}
                dataSource={workSchedulesStore?.schedules}
                pagination={false}
            />
        </>
    );
});

export default WorkSchedule;
