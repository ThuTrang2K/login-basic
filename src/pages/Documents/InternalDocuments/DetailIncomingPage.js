import {
    ArrowLeftOutlined,
    CalendarOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    FieldTimeOutlined,
    FormOutlined,
    LinkOutlined,
    MoreOutlined,
    PlusCircleOutlined,
    ProfileOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, Dropdown, Menu, Modal, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import { observer } from "mobx-react-lite";
import "./style.scss";
import { AuthContext } from "../../../context";
import vi from "moment/locale/vi";
//pdf
import { atob } from "base-64";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import moment from "moment";
import FileAttached from "../../../components/FileAttached";

// Create new plugin instance
const { Text } = Typography;
const DetailIncomingPage = observer(() => {
    const { internalDocsStore } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        internalDocsStore.getDetailIncoming(id);
    }, []);
    // console.log(internalDocsStore?.detailIncoming?.attachments[0].id);
    const breadcrumb = [
        {
            url: "/internal-document/incoming-document",
            title: "Quản lý VB nội bộ",
        },
        { url: "/internal-document/incoming-document", title: "Văn bản đến" },
    ];
    //     const base64toBlob = (data) => {
    //         // Cut the prefix `data:application/pdf;base64` from the raw base 64
    //         console.log();
    //         // const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    //
    //         const bytes = atob('NjMyYmUxMjA5YWNlMTI0N2E2MTIzNTJh');
    //         let length = bytes.length;
    //         let out = new Uint8Array(length);
    //
    //         while (length--) {
    //             out[length] = bytes.charCodeAt(length);
    //         }
    //
    //         return new Blob([out], { type: 'application/pdf' });
    //     };
    //
    //     const blob = base64toBlob();
    // const url = URL.createObjectURL(blob);
    const handleDelete = ()=>{
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: async() => {
                await internalDocsStore.deleteIncoming(id);
                navigate(-1);
            },
        });
    }
    const menu = (id) => (
        <Menu
            items={[
                {
                    label: (
                        <Link
                            to={`/utility/general-notifications/update/${id}`}
                        >
                            <EditOutlined />
                            &nbsp; Chỉnh sửa văn bản
                        </Link>
                    ),
                    key: "1",
                },
                {
                    label: (
                        <Link
                            to={`/utility/general-notifications/update/${id}`}
                        >
                            <FormOutlined />
                            &nbsp; Xử lý văn bản
                        </Link>
                    ),
                    key: "2",
                },
                {
                    label: (
                        <Link
                            to={`/utility/general-notifications/update/${id}`}
                        >
                            <ProfileOutlined />
                            &nbsp; Tạo nhiệm vụ từ văn bản
                        </Link>
                    ),
                    key: "3",
                },
                {
                    label: (
                        <Link
                            to={`/utility/general-notifications/update/${id}`}
                        >
                            <SolutionOutlined />
                            &nbsp; Tạo công việc từ văn bản
                        </Link>
                    ),
                    key: "4",
                },
                {
                    label: (
                        <Link to="">
                            {" "}
                            <DeleteOutlined />
                            &nbsp; Xóa
                        </Link>
                    ),
                    key: "5",
                    danger: true,
                    onClick: () => handleDelete(id),
                },
            ]}
        />
    );
    const userHandle =
        internalDocsStore?.detailIncoming?.user_assigneds &&
        internalDocsStore?.detailIncoming?.user_assigneds.filter(
            (user) => user.permission === "COOR"
        );
    const userPic =
        internalDocsStore?.detailIncoming?.user_assigneds &&
        internalDocsStore?.detailIncoming?.user_assigneds.find(
            (user) => user.permission === "PIC"
        );
    const userView =
        internalDocsStore?.detailIncoming?.user_assigneds &&
        internalDocsStore?.detailIncoming?.user_assigneds.filter(
            (user) => user.permission === "VIEW"
        );
    return (
        <>
            <div className="general-flex-header">
                <div>
                    <Breadcrumbs items={breadcrumb} />
                    <div style={{ marginBottom: "16px" }}>
                        <span
                            className="back-button"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowLeftOutlined />
                        </span>
                        <Text ellipsis style={{ maxWidth: 700 }}>
                            <span
                                style={{ fontSize: 20, marginRight: 8 }}
                                className="general-title"
                            >
                                {internalDocsStore?.detailIncoming?.title}
                            </span>
                        </Text>

                        {internalDocsStore?.detailIncoming?.document_status ===
                        "INPROGRESS" ? (
                            <span className="inprogress">Đã bút phê</span>
                        ) : (
                            <span className="pending">Chờ sử lý</span>
                        )}
                    </div>
                </div>
                <Dropdown overlay={menu(id)} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                        <div className="notif-item-more more-btn">
                            <MoreOutlined />
                        </div>
                    </a>
                </Dropdown>
            </div>
            <div style={{ display: "flex" }}>
                <div className="" style={{ flex: 1 }}></div>
                {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer
                    fileUrl={url}
                    plugins={[
                        defaultLayoutPluginInstance,
                    ]}
                />
</Worker> */}
                <div>
                    <div className="detail-desc info-table">
                        <Descriptions>
                            <Descriptions.Item
                                labelStyle={{ fontWeight: "bold" }}
                                contentStyle={{ fontWeight: "bold" }}
                                span="12"
                                label="Thông tin chung"
                            ></Descriptions.Item>
                            <Descriptions.Item span="12" label="Số hiệu">
                                {
                                    internalDocsStore?.detailIncoming
                                        ?.document_number
                                }
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Số đến">
                                {
                                    internalDocsStore?.detailIncoming
                                        ?.incoming_number
                                }
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Ngày văn bản">
                                <span className="detail-icon">
                                    <CalendarOutlined />
                                </span>
                                {internalDocsStore?.detailIncoming
                                    ?.date_issued ? (
                                    moment(
                                        internalDocsStore?.detailIncoming
                                            ?.date_issued
                                    )
                                        .locale("vi", vi)
                                        .format("DD-MM-YYYY")
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Ngày đến">
                                <span className="detail-icon">
                                    <CalendarOutlined />
                                </span>
                                {internalDocsStore?.detailIncoming
                                    ?.outgoing_date ? (
                                    moment(
                                        internalDocsStore?.detailIncoming
                                            ?.outgoing_date
                                    )
                                        .locale("vi", vi)
                                        .format("DD-MM-YYYY")
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Người ký">
                                {internalDocsStore?.detailIncoming?.signer ? (
                                    internalDocsStore?.detailIncoming?.signer
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="CQ ban hành">
                                {internalDocsStore?.detailIncoming
                                    ?.authority_issued_id?.name ? (
                                    internalDocsStore?.detailIncoming
                                        ?.authority_issued_id?.name
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item
                                span="12"
                                label="Tài liệu đính kèm"
                            >
                                <FileAttached
                                    files={
                                        internalDocsStore?.detailIncoming
                                            ?.attachments
                                    }
                                    fileName="name"
                                    fileId="id"
                                />
                            </Descriptions.Item>
                            <Descriptions.Item
                                span="12"
                                label="Liên kết nhiệm vụ
"
                            >
                                {internalDocsStore?.detailIncoming?.name ? (
                                    internalDocsStore?.detailIncoming?.name
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item
                                span="12"
                                label="Liên kết công việc"
                                className="work-item"
                            >
                                {internalDocsStore?.detailIncoming?.linkedWork
                                    ?.length > 0 ? (
                                    internalDocsStore?.detailIncoming?.linkedWork.map(
                                        (work) => (
                                            <Link
                                                to={""}
                                                className={"work-link"}
                                            >
                                                <LinkOutlined />
                                                <div>{work.title}</div>
                                            </Link>
                                        )
                                    )
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className="detail-desc info-table">
                        <Descriptions>
                            <Descriptions.Item
                                labelStyle={{ fontWeight: "bold" }}
                                contentStyle={{ fontWeight: "bold" }}
                                span="12"
                                label="Xử lý văn bản"
                            >
                                <div
                                    style={{ marginLeft: "auto" }}
                                    className="inprogress"
                                >
                                    Phân phát
                                </div>
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Lãnh đạo xử lý">
                                {userPic && (
                                    <div className="work-btn">
                                        {useCapitalizeTheFirstLetter(
                                            userPic.name_uppercase
                                        )}
                                    </div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Người xử lý">
                                {userHandle?.length > 0 &&
                                    userHandle.map((user) => (
                                        <div className="work-btn">
                                            {useCapitalizeTheFirstLetter(
                                                user.name_uppercase
                                            )}
                                        </div>
                                    ))}
                            </Descriptions.Item>
                            <Descriptions.Item
                                span="12"
                                label="Phối hợp/ Theo dõi"
                            >
                                {userView?.length > 0 &&
                                    userView.map((user) => (
                                        <div className="work-btn">
                                            {useCapitalizeTheFirstLetter(
                                                user.name_uppercase
                                            )}
                                        </div>
                                    ))}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Ngày bắt đầu">
                                <span className="detail-icon">
                                    <CalendarOutlined />
                                </span>
                                {internalDocsStore?.detailIncoming
                                    ?.start_date ? (
                                    moment(
                                        internalDocsStore?.detailIncoming
                                            ?.start_date
                                    )
                                        .locale("vi", vi)
                                        .format("DD-MM-YYYY")
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item span="12" label="Ngày kết thúc">
                                <span className="detail-icon">
                                    <CalendarOutlined />
                                </span>
                                {internalDocsStore?.detailIncoming?.end_date ? (
                                    moment(
                                        internalDocsStore?.detailIncoming
                                            ?.end_date
                                    )
                                        .locale("vi", vi)
                                        .format("DD-MM-YYYY")
                                ) : (
                                    <div className="no-infor">Không rõ.</div>
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </div>
        </>
    );
});

export default DetailIncomingPage;
