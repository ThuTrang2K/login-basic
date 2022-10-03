import { CloseOutlined, TeamOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const ListGroups = ({ selects, setSelects , typeGroups}) => {
    return (
        <>
            {selects[typeGroups] &&
                selects[typeGroups]?.map((group) => (
                    <div className="tag-selected">
                        <Avatar className="user-item-avatar">
                            <TeamOutlined />
                        </Avatar>
                        {group.name}
                        <CloseOutlined
                            style={{
                                color: "red",
                                marginLeft: 4,
                            }}
                            onClick={(value) =>
                                setSelects({
                                    ...selects,
                            [typeGroups]: selects[typeGroups].filter(
                                        (item) => item.id !== group.id
                                    ),
                                })
                            }
                        />
                    </div>
                ))}
        </>
    );
};

export default ListGroups;
