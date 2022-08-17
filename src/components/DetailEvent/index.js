import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Badge, Breadcrumb, Button, Descriptions, Modal } from "antd";
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../context";
import "./style.scss";

const DetailEvent = observer(() => {
    const { eventStore } = useContext(AuthContext);
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
            <div className="detail-desc">
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
                        {event?.start_at}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thời gian bắt đầu">
                        {event?.start_at}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Thời gian kết thúc">
                        {!event?.start_at ? "Không rõ." : event.start_at}
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
                    <Descriptions.Item span="12" label="Nội dung sự kiện">
                        {event?.event_notice}
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
                        {event?.created_at}
                    </Descriptions.Item>
                    <Descriptions.Item span="12" label="Chỉnh sửa lần cuối">
                        {event?.updated_at}
                    </Descriptions.Item>
                </Descriptions>
                <div style={{ textAlign:"right",marginTop:16}}>
                    <Button style={{ textAlign:"right",marginRight:16}} danger onClick={handleDelete}>
                    <DeleteOutlined /> Xóa
                    </Button>
                    <Button style={{ textAlign:"right",marginTop:24}}><EditOutlined /> Chỉnh sửa</Button>
                </div>
            </div>
        </>
    );
});

export default DetailEvent;
