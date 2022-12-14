import {
    Avatar,
    Button,
    Checkbox,
    Collapse,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    TimePicker,
    Tooltip,
    Upload,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./style.scss";
import {
    BankOutlined,
    CloseOutlined,
    DeleteOutlined,
    FileTextOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import CreateAuthIssuedModal from "./components/CreateAuthIssuedModal";
import SelectLeaderModal from "./components/SelectLeaderModal";
import SelectGroupsModal from "./components/SelectGroupsModal";
import SelectUsersModal from "./components/SelectUsersModal";
import ListGroups from "./components/ListGroups";
import ListUsers from "./components/ListUsers";
import RenameFileModal from "./components/RenameFileModal";

const { Option } = Select;
const IncomingCreatePage = observer(() => {
    const { fileStore, internalDocsStore, authorityIssuedsStore } =
        useContext(AuthContext);
    let navigate = useNavigate();
    const [bookGroupId, setBookGroupId] = useState(
        internalDocsStore?.bookGroups[0]?.id
    );
    const [bookId, setBookId] = useState("");
    const [createAuthIssuedModel, setCreateAuthIssuedModel] = useState(false);
    const [companyCode, setCompanyCode] = useState("");
    const [incomingFileList, setIncomingFileList] = useState();
    const [renameFileModal, setRenameFileModal] = useState(false);
    const [fileIndex, setFileIndex] = useState();
    const [selects, setSelects] = useState({
        leader: "",
        handleUsers: [],
        handleGroups: [],
        handleDepartments: [],
        supportUsers: [],
        supportGroups: [],
        supportDepartments: [],
    });
    const [groupIds, setGroupIds] = useState([]);
    //selectLeader
    const [isModalOpen, setIsModalOpen] = useState(false);
    //handleUsers
    const [handleUsersModal, setHandleUsersModal] = useState(false);
    const [checkedHandleUsersKeys, setCheckedHandleUsersKeys] = useState([]);
    //handleGroups
    const [handleGroupsModal, sethandleGroupsModal] = useState(false);
    //supportUsers
    const [supportUsersModal, setSupportUsersModal] = useState(false);
    const [checkedSupportUsersKeys, setCheckedSupportUsersKeys] = useState([]);
    //supportGroups
    const [supportGroupsModal, setSupportGroupsModal] = useState(false);

    const [form] = Form.useForm();
    useEffect(() => {
        async function fetchData() {
            companyCode &&
                (await Promise.all([
                    internalDocsStore.getListGroup(companyCode),
                    internalDocsStore.getListUsers(companyCode),
                ]));
            setGroupIds(
                internalDocsStore?.listGroups?.map((item) => item.id.toString())
            );
        }
        fetchData();
    }, [companyCode]);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                internalDocsStore.getListBookGroups("DEN"),
                internalDocsStore.getListCompanies(),
            ]);
            setBookGroupId(internalDocsStore?.bookGroups[0]?.id);
            setCompanyCode(internalDocsStore?.companies[0]?.code);
            form.setFieldsValue({
                outgoing_date: moment(),
                book_group_id: internalDocsStore?.bookGroups[0]?.id,
            });
        }
        fetchData();
        authorityIssuedsStore.getListAuthorityIssueds("INCOMING");
    }, []);

    useEffect(() => {
        async function fetchListBooks() {
            await internalDocsStore.getListBooks(bookGroupId);
            setBookId(internalDocsStore?.books[0]?.id);
        }
        bookGroupId && fetchListBooks();
    }, [bookGroupId]);
    useEffect(() => {
        bookId && internalDocsStore.getIncomingNumber(bookId);
    }, [bookId]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    internalDocsStore.incoming_number &&
        internalDocsStore?.books[0] &&
        console.log(
            internalDocsStore?.bookGroups[0],
            internalDocsStore?.books[0]
        );
    form.setFieldsValue({
        book_id: internalDocsStore?.books[0]?.id,
        incoming_number: internalDocsStore?.incoming_number,
    });
    const handleUploadFile = (value) => {
        setIncomingFileList(value.fileList);
    };
    const handleRenameFile = (index) => {
        console.log(index);
        setFileIndex(index + 1);
        setRenameFileModal(true);
    };
    const onFinish = async (fieldsValue) => {
        const new_file = new File(
            [fieldsValue?.attachments?.fileList[0]],
            "hello.txt"
        );
        console.log("new_file", new_file);
        await Promise.all(
            fieldsValue?.attachments?.fileList.map((item) =>
                fileStore.uploadFile(item)
            )
        );
        const values = {
            authority_issued_id: fieldsValue?.authority_issued_id,
            book_group_id: fieldsValue?.book_group_id,
            book_id: fieldsValue?.book_id,
            document_number: fieldsValue?.document_number,
            signer: fieldsValue?.signer,
            title: fieldsValue?.title,
            urgency_level: fieldsValue?.urgency_level,
            outgoing_date: fieldsValue?.outgoing_date?.toISOString(),
            date_issued: fieldsValue?.date_issued?.toISOString(),
            incoming_number: fieldsValue?.incoming_number?.toString(),
            attachments: fileStore.files,
            document_type: null,
            sign_date: null,
            assign_user: {
                assignees: [
                    {
                        assignee_code: selects.leader.user_name,
                        assignee_type: "USER",
                        permission: "PIC",
                    },
                    ...selects.handleGroups.map((group) => ({
                        assignee_code: group.id,
                        assignee_type: "GRP",
                        permission: "COOR",
                    })),
                    ...selects.supportGroups.map((group) => ({
                        assignee_code: group.id,
                        assignee_type: "GRP",
                        permission: "VIEW",
                    })),
                    ...selects.handleDepartments.map((department) => ({
                        assignee_code: department.value,
                        assignee_type: "DPT",
                        permission: "COOR",
                    })),
                    ...selects.supportDepartments.map((department) => ({
                        assignee_code: department.value,
                        assignee_type: "DPT",
                        permission: "VIEW",
                    })),
                    ...selects.handleUsers.map((user) => ({
                        assignee_code: user.value,
                        assignee_type: "USER",
                        permission: "COOR",
                    })),
                    ...selects.supportUsers.map((user) => ({
                        assignee_code: user.value,
                        assignee_type: "USER",
                        permission: "VIEW",
                    })),
                ],
                end_date: fieldsValue?.end_date?.toISOString(),
                start_date: fieldsValue?.start_date?.toISOString(),
            },
        };
        console.log("value", values);
        fileStore.files = [];
        await internalDocsStore.createIncoming(values);
        navigate(-1);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const breadcrumb = [
        {
            url: "/internal-document/incoming-document",
            title: "Qu???n l?? VB n???i b???",
        },
        { url: "/internal-document/incoming-document", title: "V??n b???n ?????n" },
        {
            url: "/internal-document/incoming-document/create",
            title: "T???o v??n b???n ?????n",
        },
    ];
    const props = {
        name: "file",
        multiple: true,
        beforeUpload: (file) => {
            return false;
        },
        headers: {
            authorization: "authorization-text",
        },
    };
    return (
        <div className="create-event-container">
            <div className="general-flex-header">
                <Breadcrumbs items={breadcrumb} />
            </div>

            <div className="create-form">
                <div className="">
                    <Form
                        form={form}
                        className=""
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="book_group_id"
                                label="Nh??m s??? v??n b???n"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="--Ch???n nh??m s??? v??n b???n--"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(value) => {
                                        setBookGroupId(value);
                                    }}
                                >
                                    {internalDocsStore?.bookGroups.length > 0 &&
                                        internalDocsStore?.bookGroups.map(
                                            (bookGroup) => (
                                                <Option
                                                    value={bookGroup.id}
                                                    key={bookGroup.name}
                                                >
                                                    {bookGroup.name}
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="book_id"
                                label="S??? v??n b???n"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="--Ch???n nh??m s??? v??n b???n--"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(value) => {
                                        setBookId(value);
                                    }}
                                >
                                    {internalDocsStore?.books.length > 0 &&
                                        internalDocsStore?.books.map((book) => (
                                            <Option
                                                value={book.id}
                                                key={book.name}
                                            >
                                                {book.name}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex-column">
                            <Form.Item
                                label="S??? hi???u"
                                name="document_number"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                    {
                                        validator: async (_, value) => {
                                        
                                            await internalDocsStore.warnDocNumber(
                                                value,
                                                "INCOMING"
                                            );
                                            return internalDocsStore?.warnDocNumberError === ""
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      new Error(
                                                          internalDocsStore?.warnDocNumberError
                                                      )
                                                  );
                                        },
                                    },
                                ]}
                            >
                                <Input placeholder="Nh???p s??? hi???u v??n b???n" />
                            </Form.Item>
                            <Form.Item
                                label="S??? ?????n"
                                name="incoming_number"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nh???p s??? ?????n" />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Tr??ch y???u"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "B???t bu???c!",
                                },
                            ]}
                        >
                            <textarea
                                placeholder="Nh???p tr??ch y???u v??n b???n"
                                name=""
                                id=""
                                className="incoming-textarea"
                                rows="10"
                            ></textarea>
                        </Form.Item>
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="outgoing_date"
                                label="Ng??y ?????n"
                                rules={[
                                    {
                                        type: "object",
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    locale={locale}
                                    style={{ width: "100%" }}
                                    // defaultValue={moment()}
                                    initialValues={moment()}
                                    format={`DD/MM/YYYY`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="date_issued"
                                label="Ng??y v??n b???n"
                            >
                                <DatePicker
                                    locale={locale}
                                    style={{ width: "100%" }}
                                    // defaultValue={moment()}
                                    initialValues={moment()}
                                    format={`DD/MM/YYYY`}
                                />
                            </Form.Item>
                        </div>
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="signer"
                                label="Ng?????i k??"
                            >
                                <Input placeholder="Nh???p t??n ng?????i k??"></Input>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="urgency_level"
                                label="????? kh???n"
                            >
                                <Select
                                    placeholder="--Ch???n ????? kh???n--"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Option value={"001"} key={"Kh???n"}>
                                        Kh???n
                                    </Option>
                                    <Option value={"002"} key={"H???a t???c"}>
                                        H???a t???c
                                    </Option>
                                    <Option
                                        value={"003"}
                                        key={"H???a t???c h???n gi???"}
                                    >
                                        H???a t???c h???n gi???
                                    </Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="T??i li???u ????nh k??m"
                            name="attachments"
                            rules={[
                                {
                                    type: "object",
                                    required: true,
                                    message: "B???t bu???c!",
                                },
                            ]}
                        >
                            <Upload
                                {...props}
                                fileList={incomingFileList}
                                className="incoming-file"
                                onChange={handleUploadFile}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Ch???n t??i li???u ????nh k??m
                                </Button>
                            </Upload>
                        </Form.Item>
                        <div className="file-list">
                            {incomingFileList?.length > 0 &&
                                incomingFileList.map((file, index) => (
                                    <div className="file-row">
                                        <div>
                                            <FileTextOutlined />
                                            <span style={{ marginLeft: 8 }}>
                                                {file.name}
                                            </span>
                                        </div>
                                        <div>
                                            <span
                                                style={{ marginRight: 16 }}
                                                className="digital-signature"
                                            >
                                                K?? s???
                                            </span>
                                            <span
                                                style={{ marginRight: 16 }}
                                                className="rename"
                                                onClick={() =>
                                                    handleRenameFile(index)
                                                }
                                            >
                                                ?????i t??n
                                            </span>
                                            <DeleteOutlined
                                                className="delete-file"
                                                onClick={() => {
                                                    incomingFileList.splice(
                                                        index,
                                                        1
                                                    );
                                                    setIncomingFileList([
                                                        ...incomingFileList,
                                                    ]);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div
                            className="flex-column"
                            style={{ position: "relative" }}
                        >
                            <Form.Item
                                label="C?? quan ban h??nh"
                                name="authority_issued_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="--Ch???n c?? quan ban h??nh--"
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    {authorityIssuedsStore?.authorityIssueds
                                        ?.length > 0 &&
                                        authorityIssuedsStore?.authorityIssueds?.map(
                                            (authorityIssued) => (
                                                <Option
                                                    value={authorityIssued.id}
                                                    key={authorityIssued.name}
                                                >
                                                    {authorityIssued.name}
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Form.Item>

                            <Button
                                style={{
                                    position: "absolute",
                                    right: "0",
                                    top: "32px",
                                    width: 80,
                                }}
                                className="secondary-button"
                                onClick={() => setCreateAuthIssuedModel(true)}
                            >
                                T???o m???i
                            </Button>
                        </div>
                        <div style={{ marginTop: 54, fontWeight: 600 }}>
                            Th??ng tin ph??n ph??t
                        </div>
                        <div className="box-shadow">
                            <div className="flex-column">
                                <div>
                                    <div>
                                        <span>L??nh ?????o s??? l??:</span>
                                        <Tooltip
                                            title="Ch???n ng?????i d??ng"
                                            color="rgb(44, 101, 172)"
                                            key="rgb(44, 101, 173)"
                                        >
                                            <Button
                                                className="button-icon button-user secondary-button"
                                                onClick={() => {
                                                    showModal();
                                                }}
                                            >
                                                <UserOutlined />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    {!selects.leader ? (
                                        ""
                                    ) : (
                                        <div className="tag-selected">
                                            <Avatar className="user-item-avatar">
                                                {selects.leader.name_uppercase.at(
                                                    0
                                                )}
                                            </Avatar>
                                            {useCapitalizeTheFirstLetter(
                                                selects.leader.name_uppercase
                                            )}
                                            <CloseOutlined
                                                style={{
                                                    color: "red",
                                                    marginLeft: 8,
                                                }}
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
                                <div>
                                    <span>Ng?????i s??? l??:</span>
                                    <Tooltip
                                        title="Ch???n ng?????i d??ng"
                                        color="rgb(44, 101, 172)"
                                        key="rgb(44, 101, 173)"
                                    >
                                        <Button
                                            className="button-icon button-user secondary-button"
                                            onClick={() => {
                                                setHandleUsersModal(
                                                    !handleUsersModal
                                                );
                                            }}
                                        >
                                            <UserOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        title="Ch???n nh??m"
                                        color="rgb(255, 192, 105)"
                                        key="rgb(44, 101, 174)"
                                    >
                                        <Button
                                            className="button-icon secondary-button button-group"
                                            onClick={() => {
                                                sethandleGroupsModal(
                                                    !handleGroupsModal
                                                );
                                            }}
                                        >
                                            <TeamOutlined />
                                        </Button>
                                    </Tooltip>
                                    <div className="group-box">
                                        <ListUsers
                                            selects={selects}
                                            setSelects={setSelects}
                                            setCheckedKeys={
                                                setCheckedHandleUsersKeys
                                            }
                                            typeDepartments="handleDepartments"
                                            typeUsers="handleUsers"
                                            hasEmpty={false}
                                        />
                                        <ListGroups
                                            selects={selects}
                                            setSelects={setSelects}
                                            typeGroups="handleGroups"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span>Ph???i h???p/ Theo d??i:</span>
                                    <Tooltip
                                        title="Ch???n ng?????i d??ng"
                                        color="rgb(44, 101, 172)"
                                        key="rgb(44, 101, 173)"
                                    >
                                        <Button
                                            className="button-icon button-user secondary-button"
                                            onClick={() => {
                                                setSupportUsersModal(
                                                    !supportUsersModal
                                                );
                                            }}
                                        >
                                            <UserOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        title="Ch???n nh??m"
                                        color="rgb(255, 192, 105)"
                                        key="rgb(44, 101, 174)"
                                    >
                                        <Button
                                            className="button-icon secondary-button button-group"
                                            onClick={() => {
                                                setSupportGroupsModal(
                                                    !supportGroupsModal
                                                );
                                            }}
                                        >
                                            <TeamOutlined />
                                        </Button>
                                    </Tooltip>
                                    <div className="group-box">
                                        <ListUsers
                                            selects={selects}
                                            setSelects={setSelects}
                                            setCheckedKeys={
                                                setCheckedSupportUsersKeys
                                            }
                                            typeDepartments="supportDepartments"
                                            typeUsers="supportUsers"
                                            hasEmpty={false}
                                        />

                                        <ListGroups
                                            selects={selects}
                                            setSelects={setSelects}
                                            typeGroups="supportGroups"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-column">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    name="start_date"
                                    label="Ng??y b???t ?????u"
                                >
                                    <DatePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                        // defaultValue={moment()}
                                        initialValues={moment()}
                                        format={`DD/MM/YYYY`}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    name="end_date"
                                    label="Ng??y k???t th??c"
                                >
                                    <DatePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                        // defaultValue={moment()}
                                        initialValues={moment()}
                                        format={`DD/MM/YYYY`}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                className="secondary-button"
                                style={{
                                    marginTop: "16px",
                                    marginRight: 8,
                                }}
                                onClick={() => navigate(-1)}
                            >
                                H???y b???
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    marginTop: "16px",
                                    backgroundColor: "#2c65ac",
                                    border: "none",
                                }}
                            >
                                T???o v??n b???n
                            </Button>
                        </Form.Item>
                        <CreateAuthIssuedModal
                            open={createAuthIssuedModel}
                            setOpen={setCreateAuthIssuedModel}
                        />
                        {fileIndex && (
                            <RenameFileModal
                                file={incomingFileList[fileIndex - 1]}
                                files={incomingFileList}
                                fileIndex={fileIndex}
                                open={renameFileModal}
                                setOpen={setRenameFileModal}
                                setFiles={setIncomingFileList}
                                setFileIndex={setFileIndex}
                            />
                        )}

                        <SelectLeaderModal
                            setIsModalOpen={setIsModalOpen}
                            companies={internalDocsStore?.companies}
                            isModalOpen={isModalOpen}
                            users={internalDocsStore?.users}
                            selects={selects}
                            setSelects={setSelects}
                            companyCode={companyCode}
                            setCompanyCode={setCompanyCode}
                        />
                        <SelectUsersModal
                            setIsModalOpen={setHandleUsersModal}
                            companies={internalDocsStore?.companies}
                            isModalOpen={handleUsersModal}
                            users={internalDocsStore?.users}
                            selects={selects}
                            setSelects={setSelects}
                            companyCode={companyCode}
                            setCompanyCode={setCompanyCode}
                            checkedKeys={checkedHandleUsersKeys}
                            setCheckedKeys={setCheckedHandleUsersKeys}
                            typeDepartments="handleDepartments"
                            typeUsers="handleUsers"
                        >
                            <ListUsers
                                selects={selects}
                                setSelects={setSelects}
                                setCheckedKeys={setCheckedHandleUsersKeys}
                                typeDepartments="handleDepartments"
                                typeUsers="handleUsers"
                                hasEmpty={true}
                            />
                        </SelectUsersModal>
                        <SelectGroupsModal
                            groupIds={groupIds}
                            setGroupIds={setGroupIds}
                            setIsModalOpen={sethandleGroupsModal}
                            companies={internalDocsStore?.companies}
                            isModalOpen={handleGroupsModal}
                            selects={selects}
                            setSelects={setSelects}
                            companyCode={companyCode}
                            setCompanyCode={setCompanyCode}
                            selectedGroups={selects.handleGroups}
                            typeGroups="handleGroups"
                        >
                            <ListGroups
                                selects={selects}
                                setSelects={setSelects}
                                typeGroups="handleGroups"
                            />
                        </SelectGroupsModal>
                        <SelectUsersModal
                            companies={internalDocsStore?.companies}
                            companyCode={companyCode}
                            setCompanyCode={setCompanyCode}
                            users={internalDocsStore?.users}
                            selects={selects}
                            setSelects={setSelects}
                            setIsModalOpen={setSupportUsersModal}
                            isModalOpen={supportUsersModal}
                            checkedKeys={checkedSupportUsersKeys}
                            setCheckedKeys={setCheckedSupportUsersKeys}
                            typeDepartments="supportDepartments"
                            typeUsers="supportUsers"
                        >
                            <ListUsers
                                selects={selects}
                                setSelects={setSelects}
                                setCheckedKeys={setCheckedSupportUsersKeys}
                                typeDepartments="supportDepartments"
                                typeUsers="supportUsers"
                                hasEmpty={true}
                            />
                        </SelectUsersModal>
                        <SelectGroupsModal
                            groupIds={groupIds}
                            setGroupIds={setGroupIds}
                            companies={internalDocsStore?.companies}
                            companyCode={companyCode}
                            setCompanyCode={setCompanyCode}
                            selects={selects}
                            setSelects={setSelects}
                            setIsModalOpen={setSupportGroupsModal}
                            isModalOpen={supportGroupsModal}
                            selectedGroups={selects.supportGroups}
                            typeGroups="supportGroups"
                        >
                            <ListGroups
                                selects={selects}
                                setSelects={setSelects}
                                typeGroups="supportGroups"
                            />
                        </SelectGroupsModal>
                    </Form>
                    {/*  */}
                </div>
            </div>
        </div>
    );
});

export default IncomingCreatePage;

//
