import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, DatePicker, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import "../style.scss";
import moment from "moment";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Link, useNavigate } from "react-router-dom";

const getRowSpans = (arr, key) => {
    let sameValueLength = 0;
    const rowSpans = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i === 0) {
            rowSpans[i] = sameValueLength + 1;
            continue;
        }
        if (arr[i][key] === arr[i - 1][key]) {
            rowSpans[i] = 0;
            sameValueLength++;
        } else {
            rowSpans[i] = sameValueLength + 1;
            sameValueLength = 0;
        }
    }
    return rowSpans;
};
const WorkSchedule = observer(() => {
    const navigate = useNavigate();
    const [date, setDate] = useState(moment());
    const { workSchedulesStore } = useContext(AuthContext);
    useEffect(() => {
        workSchedulesStore.getschedules(date);
    }, [date]);
    const rowSpans = getRowSpans(workSchedulesStore.schedules, "date");
    const columns = [
        {
            title: "Ngày tháng",
            dataIndex: "date",
            key: "date",
            width: "10%",
            render: (value, record, index) => {
                const obj = {
                    children: (
                        <div style={{ fontWeight: "bold" }}>
                            <div style={{ fontWeight: "bold" }}>
                                {moment(record?.start_at)
                                    .locale("vi", vi)
                                    .format("dddd")
                                    .charAt(0)
                                    .toUpperCase() +
                                    moment(record?.start_at)
                                        .locale("vi", vi)
                                        .format("dddd")
                                        .slice(1)}
                            </div>
                            <div>
                                {moment(record?.start_at)
                                    .locale("vi", vi)
                                    .format("DD/MM")}
                            </div>
                        </div>
                    ),
                    props: {},
                };

                obj.props.rowSpan = rowSpans[index];
                return obj;
            },
        },
        {
            title: "Nội dung công việc",
            dataIndex: "title",
            key: "title",
            width: "25%",
            render: (text, record) => (
                <>
                    <div style={{ fontWeight: "bold" }}>
                        {moment(record?.start_at)
                            .locale("vi", vi)
                            .format("HH[h]mm")}
                        <span>
                            {record?.end_at &&
                                ` đến ${moment(record?.end_at)
                                    .locale("vi", vi)
                                    .format("HH[h]mm")}`}
                        </span>
                    </div>
                    <span>
                        {!record.title ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: record.event_notice,
                                }}
                            />
                        ) : (
                            record.title
                        )}{" "}
                    </span>
                </>
            ),
        },
        {
            title: "Tài liệu",
            dataIndex: "preparation",
            key: "preparation",
            width: "15%",
        },
        {
            title: "Thành Viên tham gia",
            dataIndex: "attenders",
            key: "attenders",
            width: "20%",
        },
        {
            title: "Địa điểm",
            dataIndex: "location",
            key: "location",
            width: "20%",
        },
        {
            title: "Chủ trì",
            dataIndex: "host",
            key: "host",
            width: "25%",
        },
    ];
    const handleDatePicker = (date, dateString) => {
        setDate(date);
    };

    return (
        <>
            <div className="workschedule-header">
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                        fontWeight: 500,
                        fontSize: 12,
                    }}
                >
                    <Breadcrumb.Item>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Lịch cơ quan</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <DatePicker
                        locale={locale}
                        style={{ marginRight: 20 }}
                        onChange={handleDatePicker}
                        placeholder="Chọn tuần"
                        defaultValue={moment()}
                        format={(value) => {
                            return `Tuần ${value.format("WW")}, ${value.format(
                                "YYYY"
                            )}`;
                        }}
                        picker="week"
                    />
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#2c65ac", border: "none" }}
                    >
                        {" "}
                        <Link
                            style={{ color: "white" }}
                            to={`/company-work-schedule/create`}
                        >
                            <PlusCircleOutlined /> Tạo sự kiện mới
                        </Link>
                    </Button>
                </div>
            </div>
            <Table
                // className="hire-td"
                bordered
                style={{ fontSize: "12px !important" }}
                rowKey={(record) => record.schedule_code}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`view/${record.schedule_code}`);
                        }, // click row
                    };
                }}
                columns={columns}
                dataSource={workSchedulesStore?.schedules}
                pagination={false}
            />
            {/* {workSchedulesStore?.eventByDate.map((item=>( <Table
            className="hire-tr"
                bordered
                style={{fontSize:"12px !important"}}
                rowKey={record => record.schedule_code}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`view/${record.schedule_code}`)
                        }, // click row
                    };
                }}
                columns={columns}
                dataSource={item}
                pagination={false}
            />)))} */}
        </>
    );
});

export default WorkSchedule;
