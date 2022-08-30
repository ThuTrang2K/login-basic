import { EyeOutlined, FileImageOutlined } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context";

const FileAttached = ({ files, fileName, fileId }) => {
    const { fileStore} = useContext(AuthContext);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewVisible(false);
    return (
        <ul className="file-list">
            {files?.length > 0 ? (
                files.map((item) => {
                    const fileExtension = item[`${fileName}`]
                        .slice(
                            (Math.max(
                                0,
                                item[`${fileName}`].lastIndexOf(".")
                            ) || Infinity) + 1
                        )
                        .toLowerCase();
                    return (
                        <li>
                            <Tooltip placement="top" title="Tải xuống">
                                <a
                                    className=""
                                    onClick={() => {
                                        fileStore.downLoad(
                                            item[`${fileId}`],
                                            item[`${fileName}`]
                                        );
                                    }}
                                >
                                    <FileImageOutlined
                                        style={{
                                            marginRight: "5px",
                                        }}
                                    />
                                    {item[`${fileName}`]}
                                </a>
                            </Tooltip>
                            {(fileExtension === "png" ||
                                fileExtension === "jpg") && (
                                <Tooltip placement="top" title="Xem tài liệu">
                                    <EyeOutlined
                                        onClick={() => {
                                            setPreviewImage(
                                                `${
                                                    process.env
                                                        .REACT_APP_BASE_URL
                                                }/api/v1/images/${
                                                    item[`${fileId}`]
                                                }?access_token=${
                                                    fileStore.access_token
                                                }`
                                            );
                                            setPreviewTitle(
                                                item[`${fileName}`]
                                            );
                                            setPreviewVisible(true);
                                        }}
                                    />
                                </Tooltip>
                            )}

                            <Modal
                                style={{ overFlow: "" }}
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img
                                    alt="example"
                                    style={{
                                        width: "100%",
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </li>
                    );
                })
            ) : (
                <div className="no-infor">Không có tài liệu đính kèm.</div>
            )}
        </ul>
    );
};

export default FileAttached;
