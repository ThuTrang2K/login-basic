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
const SelectGroupModel = observer(
    ({
        setIsModalOpen,
        companies,
        isModalOpen,
        users,
        selectUsers,
        setSelectUsers,
        handleDelete
    }) => {
        const handleOk = () => {
            setIsModalOpen(false);
        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };

        console.log(selectUsers);
        return (
            <div className="user-modal">
                <Modal
                    title={
                        <div className="general-flex-header">
                            <Select
                                placeholder="--Chọn cơ quan ban hành--"
                                defaultValue={companies[0]?.name}
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
                                                <CaretRightOutlined />
                                            ) : (
                                                <CaretDownOutlined />
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
                                                                                selectUsers
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
                                                                                console.log(
                                                                                    selectUsers.leader
                                                                                );
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                                    ? setSelectUsers(
                                                                                          {
                                                                                              ...selectUsers,
                                                                                              leader: user,
                                                                                          }
                                                                                      )
                                                                                    : setSelectUsers(
                                                                                          {
                                                                                              ...selectUsers,
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
                            {!selectUsers.leader ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                <div className="tag-selected">
                                    <Avatar className="user-item-avatar">
                                        {selectUsers.leader.name_uppercase.at(
                                            0
                                        )}
                                    </Avatar>
                                    {useCapitalizeTheFirstLetter(
                                        selectUsers.leader.name_uppercase
                                    )}
                                    <CloseOutlined
                                        style={{ color: "red", marginLeft: 4 }}
                                        onClick={() =>
                                            setSelectUsers({
                                                ...selectUsers,
                                                leader: "",
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
);

export default SelectGroupModel;


