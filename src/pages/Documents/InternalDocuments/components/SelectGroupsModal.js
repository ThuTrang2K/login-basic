import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
    Avatar,
    Button,
    Checkbox,
    Collapse,
    Input,
    Modal,
    Popconfirm,
    Select,
    Tooltip,
} from "antd";
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CloseOutlined,
    SearchOutlined,
    TeamOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";
import { AuthContext } from "../../../../context";
import useGroupsCheck from "../../../../hook/useGroupsCheck";

const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;
const SelectGroupsModal = observer(
    ({
        setIsModalOpen,
        companies,
        isModalOpen,
        handleDelete,
        groupIds,
        setGroupIds,
        companyCode,
        setCompanyCode,
        selects,
        setSelects,
        children,
        selectedGroups,
        typeGroups
    }) => {
        const { internalDocsStore } = useContext(AuthContext);
        const [groupId, setGroupId] = useState("");
        const [members, setMembers] = useState([]);
        const [disableGroup, setDisableGroup] = useState();
        useEffect(()=>{
            setDisableGroup( [...selects.handleGroups.map(item=>({...item,type:'handleGroups' })),...selects.supportGroups.map(item=>({...item,type:'supportGroups' }))
            ].filter(item=>item.type!==typeGroups))
        },[isModalOpen])
        console.log("disableGroup",disableGroup);
        useEffect(() => {
            async function fetchData() {
                await internalDocsStore.getListGroupMembers(groupId);
                setMembers((prve) => [
                    ...prve,
                    ...internalDocsStore?.groupMembers,
                ]);
            }
            fetchData();
        }, [groupId]);
        const groups = internalDocsStore?.listGroups;
        const {onChange}= useGroupsCheck(setSelects,selects, typeGroups)
        const handleOk = () => {
            setIsModalOpen(false);
        };

        const handleCancel = () => {
            setIsModalOpen(false);
        };
        const handleChangePanel = (keys) => {
            const newId = keys.filter((key) => groupIds.includes(key));
            newId[0] && setGroupId(newId[0]);
            setGroupIds(groupIds.filter((id) => id !== newId[0]));
        };

        return (
            <Modal
                className="user-modal group-modal"
                title={
                    <div className="general-flex-header">
                        <Select
                            placeholder="--Ch???n c?? quan ban h??nh--"
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
                                title="B???n c?? ch???c ch???n mu???n x??a h???t ng?????i ???????c ch???n kh??ng ?"
                                okText="?????ng ??"
                                cancelText="Kh??ng"
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
                                    H???y b???
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
                                ?????ng ??
                            </Button>
                        </div>
                    </div>
                }
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <div className="list-box">
                    <div>
                        <UnorderedListOutlined />
                        &nbsp; Danh s??ch:
                        {children}
                    </div>
                </div>
                <div className="groupModal-body">
                    <div className="groupModal-search">
                        <div>
                            <SearchOutlined />
                            &nbsp; T??m ki???m:
                        </div>
                        <div>
                            <Search
                                placeholder="Nh???p t??n nh??m..."
                                //   onSearch={()={}}
                                style={{
                                    width: 400,
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="group-content">
                            <Collapse
                                expandIcon={({ isActive }) =>
                                    isActive ? (
                                        <CaretDownOutlined />
                                    ) : (
                                        <CaretRightOutlined />
                                    )
                                }
                                onChange={handleChangePanel}
                            >
                                {groups?.length > 0 &&
                                    groups?.map((group) => {
                                        return (
                                            <Panel
                                                header={
                                                    <Checkbox
                                                        checked={selectedGroups?.some(
                                                            item => item.id===group.id
                                                        )}
                                                        disabled={disableGroup?.some(item=> item.id===group.id)} 
                                                        onChange={onChange}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                        }}
                                                        value={group}
                                                    >
                                                        {disableGroup?.some(item=> item.id===group.id)?<Tooltip title={"Ph??ng ban n??y ???? ???????c ch???n"}>{group.name}</Tooltip>  :group.name}
                                                    </Checkbox>
                                                }
                                                key={group.id}
                                            >
                                                {members?.length > 0 &&
                                                    members.map(
                                                        (member) =>
                                                            member.group_id ===
                                                                group.id && (
                                                                <div className="user-item">
                                                                    <span>
                                                                        <div className="user-item-info">
                                                                            <Avatar className="user-item-avatar">
                                                                                {member.user.name_lowercase.at(
                                                                                    0
                                                                                )}
                                                                            </Avatar>
                                                                            <span>
                                                                                {
                                                                                    member
                                                                                        .user
                                                                                        .name_lowercase
                                                                                }
                                                                            </span>
                                                                            &nbsp;
                                                                            <i>{`(${member.user.deparment})`}</i>
                                                                        </div>
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
            </Modal>
        );
    }
);

export default SelectGroupsModal;
