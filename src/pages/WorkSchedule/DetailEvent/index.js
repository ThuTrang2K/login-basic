import {
    ArrowLeftOutlined,
    CalendarOutlined,
    DeleteOutlined,
    EditOutlined,
    FieldTimeOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { Badge, Breadcrumb, Button, Descriptions, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./style.scss";
import UpdateEvent from "../UpdateEvent";
import moment from "moment";
import vi from "moment/locale/vi";
import { AuthContext } from "../../../context";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";

const DetailEvent = observer(() => {
    const { eventStore } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    const { schedule_code } = useParams();
    const event = eventStore.event;
    console.log("data", event);
    //2021-08-09T14:00:00+07:00
    useEffect(() => {
        eventStore.getEventById(schedule_code);
    }, [schedule_code]);
    const handleDelete = () => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: () => {
                eventStore.deleteEvent(schedule_code);
                setTimeout(() => navigate(-1), 500);
            },
        });
    };
    const handleClose = () => {
        setOpen(false);
    };
    const assignees = event?.assignees?.filter(
        (item) => item.permission !== "CREATE"
    );
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
                <span
                    className="back-button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowLeftOutlined />
                </span>
                <span className="create-title">Chi tiết sự kiện</span>
            </div>
            {!open ? (
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
                            <span className="detail-icon">
                                <CalendarOutlined />
                            </span>{" "}
                            {moment(event?.start_at).format("DD-MM-YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Thời gian bắt đầu">
                            <span className="detail-icon">
                                <FieldTimeOutlined />
                            </span>
                            {moment(event?.start_at)
                                .locale("vi", vi)
                                .format("HH[h]mm")}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Thời gian kết thúc">
                            <span className="detail-icon">
                                <FieldTimeOutlined />
                            </span>
                            {event?.end_at ? (
                                moment(event?.end_at)
                                    .locale("vi", vi)
                                    .format("HH[h]mm")
                            ) : (
                                <div className="no-infor">Không rõ.</div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Chủ trì">
                            {event?.host}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Địa điểm">
                            {event?.location}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Chuẩn bị">
                            {event?.preparation ? (
                                event?.preparation
                            ) : (
                                <div className="no-infor">
                                    Không có chuẩn bị.
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Nội dung sự kiện">
                            {event.event_notice ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: event.event_notice,
                                    }}
                                    className="editor"
                                ></div>
                            ) : (
                                <div className="no-infor">
                                    Không có nội dung sự kiện.
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item
                            span="12"
                            label="Tài liệu đính kèm
"
                        >
                            {/* {event?.file_ids?.length <= 0 ?  */}

                            <div className="no-infor">
                                Không có tài liệu đính kèm.
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item
                            span="12"
                            label="Thành viên tham gia"
                        >
                            {event?.attenders ? (
                                event?.attenders
                            ) : (
                                <div className="no-infor">
                                    Không có thành viên tham gia.
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Thông báo">
                            {assignees && assignees.length > 0 ? (
                                assignees
                                    .map((item) => {
                                        return useCapitalizeTheFirstLetter(item.name_uppercase);
                                    })
                                    .join(", ")
                            ) : (
                                <div className="no-infor">
                                    Không có người nhận thông báo.
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Ngày tạo">
                            {event?.assignees &&
                                useCapitalizeTheFirstLetter(event?.assignees.find(
                                    (item) => item.permission === "CREATE"
                                ).name_uppercase)}{" "}
                            -{" "}
                            {moment(event?.created_at)
                                .locale("vi", vi)
                                .format("DD-MM-YYYY | HH[h]mm")}
                        </Descriptions.Item>
                        <Descriptions.Item span="12" label="Chỉnh sửa lần cuối">
                            {event?.last_edit_by ? (
                                `${
                                    useCapitalizeTheFirstLetter(event.last_edit_by.name_uppercase)
                                } - ${moment(event?.updated_at)
                                    .locale("vi", vi)
                                    .format("DD-MM-YYYY | HH[h]mm")}`
                            ) : (
                                <div className="no-infor">
                                    Không có thông tin.
                                </div>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{ textAlign: "right", marginTop: 16 }}>
                        <Button
                            style={{ textAlign: "right", marginRight: 16 }}
                            danger
                            onClick={handleDelete}
                        >
                            <DeleteOutlined /> Xóa
                        </Button>
                        <Button
                            style={{ textAlign: "right", marginTop: 24 }}
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <EditOutlined /> Chỉnh sửa
                        </Button>
                    </div>
                </div>
            ) : (
                <UpdateEvent event={event} handleClose={handleClose} />
            )}
        </>
    );
});

export default DetailEvent;
