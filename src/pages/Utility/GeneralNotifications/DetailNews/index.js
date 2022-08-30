import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, EyeOutlined, HomeOutlined, MoreOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider, Dropdown, Menu, Modal } from 'antd';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileAttached from '../../../../components/FileAttached';
import { AuthContext } from '../../../../context';
import { observer } from "mobx-react-lite";

const DetailNews = observer(() => {
    let navigate = useNavigate();
    const { news_id } = useParams();
    const { generalNotifStore } = useContext(AuthContext);
    useEffect(() => {
        generalNotifStore.getNewsById(news_id);
    }, [news_id]);
    const menu =(id)=> (
        <Menu
            items={[
                {
                    label: (
                        <Link to={`/utility/general-notifications/update/${news_id}`}>
                            <EditOutlined />&nbsp; Sửa thông tin
                        </Link>
                    ),
                    key: "1",
                },
                {
                    label: <Link to=""> <DeleteOutlined />&nbsp; Xóa</Link>,
                    key: "2",
                    danger: true,
                    onClick:()=>handleDelete(news_id)
                },
            ]}
        />
    );
    const handleDelete = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: async() => {
                await generalNotifStore.deleteNews(id);
                navigate('/utility/general-notifications')
            },
        });
    };
    return (
        <div className="create-event-container">
            <Breadcrumb
                style={{
                    margin: "16px 0",
                    fontWeight: 500,
                    fontSize: 12,
                }}
            >
                <Breadcrumb.Item style={{
                    cursor: "pointer"
                }} onClick={()=>navigate('/dashboard')}>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{
                    cursor: "pointer"
                }} onClick={()=>navigate('/utility/general-notifications')}>Thông báo chung</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết thông báo</Breadcrumb.Item>
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
                <span className="create-title">Chi tiết thông báo</span>
            </div>
            <div className="create-form">
                    <div className="notif-item" key={generalNotifStore.newsDetail.id}>
                        <div className="notif-item-header">
                            <div className="notif-item-title">
                                {generalNotifStore.newsDetail.subject}
                            </div>
                            <Dropdown overlay={menu(generalNotifStore.newsDetail.id)} trigger={["click"]}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <div className="notif-item-more">
                                        <MoreOutlined />
                                    </div>
                                </a>
                            </Dropdown>
                        </div>
                        <Divider />
                        <div className="notif-item-content">
                            {generalNotifStore.newsDetail.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: generalNotifStore.newsDetail.content,
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
                                    files={generalNotifStore.newsDetail?.attachments}
                                    fileName="file_name"
                                    fileId="file_id"
                                />
                            </div>
                        </div>
                    </div>
            </div>
    </div>
    );
});

export default DetailNews;