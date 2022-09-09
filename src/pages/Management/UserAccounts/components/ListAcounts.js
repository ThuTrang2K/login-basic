import { Input, Space } from 'antd';
import React from 'react';
import { observer } from "mobx-react-lite";


const { Search } = Input;
const ListAcounts = observer(() => {
    const onSearch = (value) => {};
    return (
        <div>
            <Space direction="vertical">
                <Search
                    className="general-search"
                    placeholder="Tìm kiếm theo tên hoặc username"
                    onSearch={onSearch}
                    enterButton
                />
            </Space>
        </div>
    );
});

export default ListAcounts;