import { ArrowLeftOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, FieldTimeOutlined, HomeOutlined } from "@ant-design/icons";
import { Badge, Breadcrumb, Button, Descriptions, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../context";
import "./style.scss";
import UpdateEvent from "../UpdateEvent";
import moment from "moment";

const DetailEvent = observer(() => {
    const { eventStore } = useContext(AuthContext);
    const [open, setOpen]= useState(false)
    let navigate = useNavigate();
    const { schedule_code } = useParams();
    const event = eventStore.event;
    console.log("data", event);

    useEffect(() => {
        eventStore.getEventById(schedule_code);
    }, [schedule_code]);
    const handleDelete = () => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: () => {
                // eventStore.deleteEvent(schedule_code);
                setTimeout(() => navigate(-1), 500);
            },
        });
    };
    const handleClose=()=>{
        setOpen(false);
    }
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
                <Breadcrumb.Item>Chi tiết sự kiện</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: "16px" }}>
                <span className="back-button">
                    <ArrowLeftOutlined
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                </span>
                <span className="create-title">Chi tiết sự kiện</span>
            </div>
            {!open ? <div className="detail-desc">
                <Descriptions>
                    <Descriptions.Item
                        labelStyle={{ fontWeight: "bold" }}
                        contentStyle={{ fontWeight: "bold" }}
                        span="12"
                        label="Thông tin"
                    >
                        Mô tả chi tiết :
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Ngày thực hiện">
                    <span className="detail-icon"><CalendarOutlined /></span> {moment(event?.start_at).utc().format('DD-MM-YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thời gian bắt đầu">
                    <span className="detail-icon"><FieldTimeOutlined /></span>{ moment(event?.start_at).utc().format('HH:MM')}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thời gian kết thúc">
                        {!event?.end_at ? "Không rõ." :  moment(event?.end_at).utc().format('HH:MM')}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Chủ trì">
                        {event?.host}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Địa điểm">
                        {event?.location}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Chuẩn bị">
                        {event?.preparation}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Nội dung sự kiện">{event.event_notice}
                    </Descriptions.Item>
                    <Descriptions.Item
                        span="12"
                        label="Tài liệu đính kèm
"
                    >
                        {event?.file_ids}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thành viên tham gia">
                        {event?.attenders}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thông báo">
                        {/* {event?.assignees} */}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Ngày tạo">
                        {moment(event?.created_at).utc().format('DD-MM-YYYY | HH:MM')}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Chỉnh sửa lần cuối">
                        {moment(event?.updated_at).utc().format('DD-MM-YYYY | HH:MM')}
                    </Descriptions.Item>
                </Descriptions>
                <div style={{ textAlign:"right",marginTop:16}}>
                    <Button style={{ textAlign:"right",marginRight:16}} danger onClick={handleDelete}>
                    <DeleteOutlined /> Xóa
                    </Button>
                    <Button style={{ textAlign:"right",marginTop:24}} onClick={()=>{setOpen(!open)}}><EditOutlined /> Chỉnh sửa</Button>
                </div>
            </div> : <UpdateEvent handleClose={handleClose}/>}
        </>
    );
});

export default DetailEvent;
