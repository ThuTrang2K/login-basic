/* eslint-disable react-hooks/rules-of-hooks */
import { BankOutlined, CloseOutlined } from "@ant-design/icons";
import { Avatar, Empty } from "antd";
import React from "react";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";

const ListUsers = ({ selects, setSelects, setCheckedKeys, typeDepartments, typeUsers, hasEmpty }) => {
    return (
        <>
            {hasEmpty && selects[typeUsers]?.length <= 0 &&
                selects[typeDepartments]?.length <= 0 && (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            {selects[typeDepartments]?.map((department) => (
                <div className="tag-selected" key={department.key}>
                    <Avatar className="user-item-avatar">
                        <BankOutlined />
                    </Avatar>
                    {department.title}
                    <CloseOutlined
                        style={{
                            color: "red",
                            marginLeft: 4,
                        }}
                        onClick={(value) => {
                            setSelects({
                                ...selects,
                        [typeDepartments]:
                                    selects[typeDepartments].filter(
                                        (item) =>
                                            item.value !== department.value
                                    ),
                            });
                            setCheckedKeys([
                                ...selects[typeUsers].map((user) => user.key),
                                ...selects[typeDepartments]
                                    .filter(
                                        (item) =>
                                            item.value !== department.value
                                    )
                                    .map((item) => item.key),
                            ]);
                        }}
                    />
                </div>
            ))}
            {selects[typeUsers]?.length > 0 &&
                selects[typeUsers]?.map((user) => (
                    <div className="tag-selected" key={user.value}>
                        <Avatar className="user-item-avatar">
                            {user?.name?.at(0)}
                        </Avatar>
                        {useCapitalizeTheFirstLetter(user?.name)}
                        <CloseOutlined
                            style={{
                                color: "red",
                                marginLeft: 4,
                            }}
                            onClick={() => {
                                setSelects({
                                    ...selects,
                            [typeUsers]: selects[typeUsers].filter(
                                        (item) => item.value !== user.value
                                    ),
                                });
                                setCheckedKeys([
                                    ...selects[typeDepartments].map(
                                        (department) => department.key
                                    ),
                                    ...selects[typeUsers]
                                        .filter(
                                            (item) => item.value !== user.value
                                        )
                                        .map((item) => item.key),
                                ]);
                            }}
                        />
                    </div>
                ))}
        </>
    );
};

export default ListUsers;
