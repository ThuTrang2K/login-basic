import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import {
    Avatar,
    Button,
    Input,
    Modal,
    Popconfirm,
    Select,
    Tooltip,
    Tree,
} from "antd";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";
import useUsersCheck from "../../../../hook/useUsersCheck";
import { useEffect } from "react";

const { Option } = Select;
const { Search } = Input;
const SelectUsersModal = observer(
    ({
        setIsModalOpen,
        companies,
        isModalOpen,
        users,
        selects,
        setSelects,
        setCompanyCode,
        companyCode,
        checkedKeys,
        setCheckedKeys,
        typeDepartments,
        typeUsers,
        children,
    }) => {
        const [disableDepartments, setDisableDepartments] = useState();
        const [disableUsers,setDisableUsers]=useState();
        console.log(selects);
        useEffect(()=>{
             setDisableDepartments( [...selects.handleDepartments.map(item=>({...item,type:'handleDepartments' })),...selects.supportDepartments.map(item=>({...item,type:'supportDepartments' }))
            ].filter(item=>item.type!==typeDepartments))
            setDisableUsers( [...selects.handleUsers.map(item=>({...item,type:'handleUsers' })),...selects.supportUsers.map(item=>({...item,type:'supportUsers' }))
            ].filter(item=>item.type!==typeUsers))
        },[isModalOpen])
        const {onCheck}=useUsersCheck(setCheckedKeys,setSelects,selects,typeDepartments,typeUsers)
        const handleOk = () => {
            setIsModalOpen(false);
        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };
        const handleDelete = () => {
            console.log("hello");
            
        };
        const treeData = users?.map((department) => {
            return {
                title: disableDepartments?.some(item=> item.value===department.code)?<Tooltip title={"Phòng ban này đã được chọn"}>{department.name}</Tooltip> : department.name,
                value: department.code,
                key: `${department.code}`,
                type: "DPT",
                disabled: disableDepartments?.some(item=> item.value===department.code),
                children: department.users.map((user) => {
                    return {
                        title:
                            (user.user_name === selects.leader.user_name|| disableUsers?.some(item=> item.value===user.user_name)) ? (
                                <Tooltip title={"Người dùng đã được chọn"}>
                                    <div className="tag-selected">
                                        <Avatar className="user-item-avatar">
                                            {user.name_uppercase.at(0)}
                                        </Avatar>
                                        {useCapitalizeTheFirstLetter(
                                            user.name_uppercase
                                        )}
                                    </div>
                                </Tooltip>
                            ) : (
                                <div className="tag-selected">
                                    <Avatar className="user-item-avatar">
                                        {user.name_uppercase.at(0)}
                                    </Avatar>
                                    {useCapitalizeTheFirstLetter(
                                        user.name_uppercase
                                    )}
                                </div>
                            ),
                        name: useCapitalizeTheFirstLetter(user.name_uppercase),
                        disabled: user.user_name === selects.leader.user_name||disableUsers?.some(item=> item.value===user.user_name),
                        value: user.user_name,
                        key: `${department.code}-${user.user_name}`,
                        department: department.code,
                        type: "USER",
                    };
                }),
            };
        });
        return (
            <>
                <Modal
                    className="user-modal user-handler"
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
                                    <Tree
                                        checkable
                                        checkedKeys={checkedKeys}
                                        onCheck={onCheck}
                                        treeData={treeData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="selected-list">
                            <div className="selected-list-title">
                                Danh sách đã chọn
                            </div>

                            {children}
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

export default SelectUsersModal;
