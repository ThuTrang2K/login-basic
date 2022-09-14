import { CloseCircleOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Select, Space,Input } from 'antd';
import React from 'react';

const { Search } = Input;
const { Option } = Select;
const AdvancedSearch = ({props}) => {
    return (
        <>
            <div className="general-flex-header">
                <Space direction="vertical">
                    <Search
                        className="general-search"
                        placeholder="Tìm kiếm theo tên hoặc username"
                        onSearch={(value) => {
                            props.setCurentPage(0)
                            props.setSelects({ ...props.selects, keyword: value });
                        }}
                        enterButton
                    />
                </Space>
                <Button
                    onClick={() => {
                        props.setOpenSelectList(!props.openSelectList);
                        props.setSelects({});
                    }}
                >
                    {!props.openSelectList ? (
                        <>
                            <FilterOutlined /> &nbsp; Tìm kiếm nâng cao
                        </>
                    ) : (
                        <>
                            <CloseCircleOutlined />
                            &nbsp; Tắt tìm kiếm nâng cao
                        </>
                    )}
                </Button>
            </div>
            {props.openSelectList && (
                <div className="select-list">
                    <div className="select-item">
                        <p>Sắp xếp theo</p>
                        <Select 
                            placeholder="Sắp xếp theo"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                props.setCurentPage(0)
                                props.setSelects({ ...props.selects, sort_by: value });
                            }}
                        >
                            <Option value="nameUppercase">Họ tên</Option>
                            <Option value="username">Tên đăng nhập</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Thứ tự</p>
                        <Select
                            placeholder="Lựa chọn"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                props.setCurentPage(0)
                                props.setSelects({ ...props.selects, direction: value });
                            }}
                        >
                            <Option value="ASC">Tăng dần</Option>
                            <Option value="DESC">Giảm dần</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Trạng thái</p>
                        <Select
                            placeholder="Trạng thái"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                props.setCurentPage(0)
                                props.setSelects({ ...props.selects, status: value });
                            }}
                        >
                            <Option value="true">Active</Option>
                            <Option value="false">Inactive</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Phòng ban</p>
                        <Select
                            placeholder="Phòng ban"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                props.setCurentPage(0)
                                props.setSelects({
                                    ...props.selects,
                                    department_code: value,
                                });
                            }}
                        >
                            {props.departmentsStore?.departments.length > 0 &&
                                props.departmentsStore?.departments.map(
                                    (department) => (
                                        <Option value={department.code}>
                                            {department.title}
                                        </Option>
                                    )
                                )}
                        </Select>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdvancedSearch;