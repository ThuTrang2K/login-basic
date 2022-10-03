import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
    Avatar,
    Button,
    Checkbox,
    Collapse,
    Empty,
    Input,
    Modal,
    Popconfirm,
    Select,
} from "antd";
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";

const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;
const SelectLeaderModal = observer(
    ({
        setIsModalOpen,
        companies,
        isModalOpen,
        users,
        selects,
        setSelects,
        setCompanyCode,
        companyCode,
    }) => {
        const handleOk = () => {
            setIsModalOpen(false);
        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };
        const handleDelete = () => {
            setSelects({
                ...selects,
                leader: "",
            });
            setIsModalOpen(false);
        };
        return (
            <>
                <Modal
                    className="user-modal"
                    title={
                        <div className="general-flex-header">
                            <Select
                                placeholder="--Chọn cơ quan ban hành--"
                                defaultValue={companies[0]?.name}
                                onChange={(value) => {
                                    setCompanyCode(value);
                                }}
                                value={companyCode}
                            >
                                {companies?.length > 0 &&
                                    companies?.map((company) => (
                                        <Option
                                            value={company.code}
                                            key={company.name}
                                        >
                                            {company.name}
                                        </Option>
                                    ))}
                            </Select>
                            <div className="general-flex-header">
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa hết người được chọn không ?"
                                    okText="Đồng ý"
                                    cancelText="Không"
                                    onConfirm={handleDelete}
                                >
                                    <Button
                                        className="secondary-button"
                                        style={{
                                            marginTop: "16px",
                                            backgroundColor: "#fff",
                                            marginRight: 8,
                                        }}
                                    >
                                        Hủy bỏ
                                    </Button>
                                </Popconfirm>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        marginTop: "16px",
                                        marginRight: "16px",
                                        backgroundColor: "#2c65ac",
                                        border: "none",
                                    }}
                                    onClick={handleCancel}
                                >
                                    Đồng ý
                                </Button>
                            </div>
                        </div>
                    }
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={false}
                >
                    <div className="flex-column">
                        <div style={{ flex: 1 }}>
                            <div className="select-item">
                                <Search
                                    allowClear
                                    placeholder="Tìm theo tên người dùng hoặc phòng ban"
                                    // onSearch={(value) => {
                                    //     setCurentPage(0);
                                    //     setSelects({
                                    //         ...selects,
                                    //         signer: value,
                                    //     });
                                    // }}
                                />
                                <div className="collapse-wrapper">
                                    <Collapse
                                        expandIcon={({ isActive }) =>
                                            isActive ? (
                                                <CaretDownOutlined />
                                            ) : (
                                                <CaretRightOutlined />
                                            )
                                        }
                                    >
                                        {users?.length > 0 &&
                                            users?.map((item) => {
                                                return (
                                                    <Panel
                                                        header={item?.name}
                                                        key={item?.code}
                                                    >
                                                        {item.users.map(
                                                            (user) => (
                                                                <div className="user-item">
                                                                    <span>
                                                                        <Checkbox
                                                                            checked={
                                                                                user.user_code ===
                                                                                selects
                                                                                    .leader
                                                                                    .user_code
                                                                            }
                                                                            value={
                                                                                user.user_code
                                                                            }
                                                                            key={
                                                                                user.name_uppercase
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                                    ? setSelects(
                                                                                          {
                                                                                              ...selects,
                                                                                              leader: user,
                                                                                          }
                                                                                      )
                                                                                    : setSelects(
                                                                                          {
                                                                                              ...selects,
                                                                                              leader: "",
                                                                                          }
                                                                                      );
                                                                            }}
                                                                        >
                                                                            <div className="user-item-info">
                                                                                <Avatar className="user-item-avatar">
                                                                                    {user.name_uppercase.at(
                                                                                        0
                                                                                    )}
                                                                                </Avatar>
                                                                                <span>
                                                                                    {useCapitalizeTheFirstLetter(
                                                                                        user.name_uppercase
                                                                                    )}
                                                                                </span>
                                                                                &nbsp;
                                                                                <i>{`(${user.position_name})`}</i>
                                                                            </div>
                                                                        </Checkbox>
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </Panel>
                                                );
                                            })}
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                        <div className="selected-list">
                            <div className="selected-list-title">
                                Danh sách đã chọn
                            </div>
                            {!selects.leader ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <div className="tag-selected">
                                    <Avatar className="user-item-avatar">
                                        {selects.leader.name_uppercase.at(0)}
                                    </Avatar>
                                    {useCapitalizeTheFirstLetter(
                                        selects.leader.name_uppercase
                                    )}
                                    <CloseOutlined
                                        style={{ color: "red", marginLeft: 4 }}
                                        onClick={() =>
                                            setSelects({
                                                ...selects,
                                                leader: "",
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

export default SelectLeaderModal;
