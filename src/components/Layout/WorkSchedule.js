import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, DatePicker, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import "./style.scss";
import moment from 'moment'
import vi from "moment/locale/vi";
import { Link, useNavigate } from "react-router-dom";

const columns = [
    {
        title: "Ngày tháng",
        dataIndex: "start_at",
        key: "start_at",
        width:"100px",
        render: (text, record) => (
            <>          
            <div style={{fontWeight:"bold"}}><div style={{fontWeight:"bold"}}>{moment(record?.start_at).locale("vi", vi).format('dddd').charAt(0).toUpperCase()+ moment(record?.start_at).locale("vi", vi).format('dddd').slice(1)}</div>
            <div>{moment(record?.start_at).format('DD/MM')}</div>
            </div>
        
            </>
          )
    },
    {
        title: "Nội dung công việc",
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
            <>
            <div style={{fontWeight:"bold"}}>{moment(record?.start_at).locale("vi", vi).format('HH[h]mm') }<span>{record?.end_at && ` đến ${moment(record?.end_at).locale("vi", vi).format('HH[h]mm')}`}</span></div>
            <span>{!record.title ? <div dangerouslySetInnerHTML={{__html:record.event_notice}}/> : record.title} </span>
            </>
          )
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
        title: "Địa điểm",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Chủ trì",
        dataIndex: "host",
        key: "host",
    },
];

const WorkSchedule = observer(() => {
    const navigate = useNavigate();
    const [date, setDate ]=useState(moment()) ;
    const { workSchedulesStore } = useContext(AuthContext);
    useEffect(() => {
        workSchedulesStore.getschedules(date);
    }, [date]);
    const handleDatePicker = (date, dateString) => {
        console.log("date",date);
        setDate(date);
        // workSchedulesStore.getschedules();
    };
    
    return (
        <>
            <div className="workschedule-header">
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
                <div>
                    <DatePicker
                        style={{ marginRight: 20 }}
                        // defaultValue={'2015/01/01'}
                        // defaultValue={moment('2015/01')}
                        onChange={handleDatePicker}
                        placeholder="Chọn tuần"
                        defaultValue={moment()}
                        format={(value) => {
                            return `Tuần ${value.format("WW")}, ${value.format(
                                "YYYY"
                            )}`;
                        }}
                        picker="week"
                    />
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#2c65ac", border: "none" }}
                        
                    >
                        {" "}
                        <Link style={{ color:"white" }} to={`/company-work-schedule/create`}><PlusCircleOutlined /> Tạo sự kiện mới</Link> 
                    </Button>
                </div>
            </div>

            <Table
                bordered
                style={{fontSize:"12px !important"}}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`view/${record.schedule_code}`)
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
