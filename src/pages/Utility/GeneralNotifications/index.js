import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    HomeOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Divider,
    Dropdown,
    Menu,
    Modal,
} from "antd";
import React, { useContext, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import { observer } from "mobx-react-lite";
import FileAttached from "../../../components/FileAttached";

const GeneralNotifications = observer(() => {
    const { generalNotifStore } = useContext(AuthContext);
    useEffect(() => {
        generalNotifStore.getGeneralNotif();
    }, []);
    const menu =(id)=> (
        <Menu
            items={[
                {
                    label: (
                        <Link to={`/utility/general-notifications/view/${id}`}>
                            <EyeOutlined />&nbsp; Xem chi tiết
                        </Link>
                    ),
                    key: "0",
                },
                {
                    label: (
                        <Link to={`/utility/general-notifications/update/${id}`}>
                            <EditOutlined />&nbsp; Sửa thông tin
                        </Link>
                    ),
                    key: "1",
                },
                {
                    label: <Link to=""> <DeleteOutlined />&nbsp; Xóa</Link>,
                    key: "2",
                    danger: true,
                    onClick:()=>handleDelete(id)
                },
            ]}
        />
    );
    const handleDelete = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: async() => {
                await generalNotifStore.deleteNews(id);
                await generalNotifStore.getGeneralNotif();
            },
        });
    };
    return (
        <div className="general-notif-container">
            <div className="notif-header">
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
                    <Breadcrumb.Item>Thông báo chung</Breadcrumb.Item>
                </Breadcrumb>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" }}
                >
                    {" "}
                    <Link
                        style={{ color: "white" }}
                        to={`/utility/general-notifications/create`}
                    >
                        Đăng thông báo
                    </Link>
                </Button>
            </div>
            <div className="notif-body">
                {generalNotifStore?.news.map((item) => (
                    <div className="notif-item" key={item.id}>
                        <div className="notif-item-header">
                            <div className="notif-item-title">
                                {item.subject}
                            </div>
                            <Dropdown overlay={menu(item.id)} trigger={["click"]}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <div className="notif-item-more">
                                        <MoreOutlined />
                                    </div>
                                </a>
                            </Dropdown>
                            {/* <div className="notif-item-more"><MoreOutlined /></div> */}
                        </div>
                        <Divider />
                        <div className="notif-item-content">
                            {item.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                    className="editor"
                                ></div>
                            ) : (
                                <div className="no-infor">
                                    Không có nội dung sự kiện.
                                </div>
                            )}
                            <div className="notif-item-file">
                                <div className="file-title">
                                    Tài liệu đính kèm: &nbsp;
                                </div>
                                <FileAttached
                                    files={item?.attachments}
                                    fileName="file_name"
                                    fileId="file_id"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default GeneralNotifications;
