import { FileImageOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
  Upload,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { Layout } from "../components";
import api from "../lib/api";
import env from "/env.json";
import { VscSaveAs } from "react-icons/vsc";

const { Option } = Select;

const Showuser = () => {
  const [frmEdit] = Form.useForm();
  const [frmAdduser] = Form.useForm();

  //Modal add user / edit user
  const [isModalVisibleEditUser, setIsModalVisibleEditUser] = useState(false);
  const [isModalVisibleAddUser, setIsModalVisibleAddUser] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingUploadPic, setLoadingUploadPic] = useState(false);
  //
  const [userList, setUserList] = useState([]);
  const [userSelect, setUserSelect] = useState({});
  const [pname, setPname] = useState([]);
  const [userNameList, setUserNameList] = useState([]);
  const [passwordList, setPasswordList] = useState([]);
  const [newUserListName, setnewUserListName] = useState([]);
  const [newPassword, setNewPasswrod] = useState([]);
  const [flag, setFlag] = useState();

  // Show modal
  const showModalEditUser = () => {
    setIsModalVisibleEditUser(true);
    frmEdit.resetFields();
    setImageUrl();
  };
  const handleCancelEditUser = () => {
    setIsModalVisibleEditUser(false);
    frmEdit.resetFields();
    setImageUrl();
  };

  const showModalAddUser = () => {
    setIsModalVisibleAddUser(true);
    frmAdduser.resetFields();
    setImageUrl();
  };

  const handleCancelModalAddUser = () => {
    setIsModalVisibleAddUser(false);
    frmAdduser.resetFields();
    setImageUrl();
  };
  ///////

  // สร้างฟังก์ชั่น fetchUserList มาเพื่อรีเฟรชข้อมูลใหม่ เมื่อมีการเพิ่มหรือแก้ไขข้อมูล

  const fetchUserList = async () => {
    setLoadingTable(true);
    const result = await api.get("/user");
    setUserList(result.data);
    const userNameAll = result.data.map((item) => item.user_name);
    const passwordAll = result.data.map((item) => item.password);
    setUserNameList(userNameAll);
    setPasswordList(passwordAll);
    setLoadingTable(false);
  };
  // นำฟังก์ชั่น fetchUserList มาใส่ useEffect เพื่อเรียกใช้งาน

  useEffect(async () => {
    await fetchUserList();
    const result = await api.get("/user");
    setUserList(result.data);
  }, []);
  ////////////////// check update user
  useEffect(async () => {
    const newUser = userNameList.filter(
      (item) => item !== userSelect.user_name
    );
    const newPassword = passwordList.filter(
      (item) => item !== userSelect.password
    );
    setnewUserListName(newUser);
    setNewPasswrod(newPassword);
  }, [userSelect]);

  // ฟังก์ชั่นเรียกคำนำหน้า
  useEffect(async () => {
    const result = await api.get("/pname");
    setPname(result.data);
  }, []);
  ////////////////////////

  const checkFlagDelete = (flag_value) => {
    if (flag_value === "1") {
      setFlag(1);
    } else if (flag_value === "0") {
      setFlag(0);
    }
  };

  const onFinishAdduser = async (value) => {
    // await Adduser data
    const result = await api.post(`/adddata_user`, {
      user_type: value.user_type,
      user_name: value.user_name,
      password: value.password,
      pname: value.pname,
      fname: value.fname,
      lname: value.lname,
      job_id: value.job_id,
      his_id: value.his_id,
    });
    // await Upload Image
    await api.post("/image-upload", image, {
      params: { id: `${result?.data?.insertId}.${fileType}` },
    });
    // await Update pic
    await api.put(`/update_pic/${result?.data?.insertId}`, {
      pic: `${result?.data?.insertId}.${fileType}`,
    });
    // Close modal
    setIsModalVisibleAddUser(false);
    await fetchUserList();
    setImageUrl();
  };
  ////////////////////////////
  const onFinishEditUser = async (value) => {
    const result = await api.put(`/update_user`, {
      user_type: value.user_type,
      user_name: value.user_name,
      password: value.password,
      pname: value.pname,
      fname: value.fname,
      lname: value.lname,
      job_id: value.job_id,
      his_id: value.his_id,
      flag_delete: value.flag_delete,
      id_user: value.id_user,
    });

    // await Upload Image
    console.log("image", image);
    await api.post("/image-upload", image, {
      params: { id: `${value.id_user}.${fileType}` },
    });
    // await Update pic
    await api.put(`/update_pic/ ${value.id_user}`, {
      pic: `${value.id_user}.${fileType}`,
    });
    console.log("= value.id_user =", value.id_user, fileType);
    // Close modal
    setIsModalVisibleEditUser(false);
    await fetchUserList();
    setImageUrl();
  };

  // Upload FILE //
  const [fileType, setFileType] = useState("png");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      // setLoading(true);
      setLoadingUploadPic(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info", info);
      const type = info.file.type?.split("/")[1];
      if (type === "jpeg") {
        setFileType("jpg");
      } else {
        setFileType(type);
      }
      const formData = new FormData();
      formData.append(
        "my-image-file",
        info.file.originFileObj,
        info.file.originFileObj.name
      );
      setImage(formData);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoadingUploadPic(false);
      });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  //  END Upload FILE //

  const onEdit = async (id_user) => {
    const userSelected = userList.find((item) => item.id_user === id_user);
    setUserSelect(userSelected);
    setIsModalVisibleEditUser(true);
    frmEdit.setFieldsValue({
      ...userSelected,
      flag_delete: String(userSelected.flag_delete),
    });
  };

  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "pic",
      key: "pic",
      // fixed: "left",
      align: "center",
      render: (text, record) => (
        <Avatar
        size={25}
          src={`${env.PATH_IMG}/image/${text}?date=${moment().format(
            "HHmmss"
          )}`}
        />
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "flag_delete2",
      key: "flag_delete2",
      align: "center",
      // fixed: "left",
    },
    {
      title: "ประเภทผู้ใช้",
      dataIndex: "user_type",
      key: "user_type",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      align: "center",
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      render: (text, record) =>
        `${record.pname}${record.fname} ${record.lname}`,
    },
    {
      title: "Job ID",
      dataIndex: "job_id",
      key: "job_id",
      align: "center",
    },
    {
      title: "HIS ID",
      dataIndex: "his_id",
      key: "his_id",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (record) => (
        <div>
          <Tooltip title="แก้ไขข้อมูล">

              <BsFillGearFill className="pointer" onClick={() => onEdit(record.id_user)} style={{ fontSize: "12px", }}/>
              
              
           
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Layout keyTab="showuser">
      <>
        {/* <Row style={{ margin: 5 }}>
          <Col>
            <PageHeader
              className="site-page-header"
              // onBack={() => null}
              title="จัดการข้อมูลผู้ใช้งาน"
            />
          </Col>
        </Row> */}
        <Row justify="end" >
          <Col span={20}></Col>
          <Col span={4} style={{marginTop:"15px"}}>
            <Button
              onClick={showModalAddUser}
              style={{backgroundColor:"#17a2b8", color:"white"}}
            >
              <UserAddOutlined />
              เพิ่มผู้ใช้งานใหม่
            </Button>
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col span={22} offset={1}>
            
              <Table
                // rowClassName={(record, index) => {
                //   return index % 2 === 0 ? "bg-gray " : "";
                // }}
                bordered
                columns={columns}
                dataSource={userList}
                loading={loadingTable}
                rowKey="id_user"
                className="xm"
                size="small"
              />
            
          </Col>
          <Col span={1}></Col>
        </Row>
        {/* ///////////////MODAL//////////////////// */}
        {/* Modal เพิ่มผู้ใช้งาน */}
        <Modal
          visible={isModalVisibleAddUser}
          // onOk={handleOk}
          onCancel={handleCancelModalAddUser}
          footer={false}
          width={650}
          style={{top: 40}}
          // bodyStyle={{ backgroundColor: "#FFEFD5" }}
        >
          <Row style={{ marginTop: "-10px" }}>
            <p style={{fontSize:"16px"}}>เพิ่มผู้ใช้งาน</p>
          </Row>
          <Form
            form={frmAdduser}
            layout="horizontal"
            onFinish={onFinishAdduser}
          >
            <Row justify="center">
              <Col offset={1}>
                <Form.Item name="pic">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={dummyRequest}
                  >
                    <Spin spinning={loadingUploadPic}>
                      {imageUrl ? (
                        <Avatar
                          size={100}
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <Avatar>
                          {loading}
                          <FileImageOutlined />
                          <div style={{ marginTop: 8 }} />
                        </Avatar>
                      )}
                    </Spin>
                  </Upload>
                </Form.Item>
              </Col>
              <Col offset={1}>
                <Form.Item
                  label="ประเภทผู้ใช้"
                  name="user_type"
                  rules={[
                    { required: true, message: "กรุณาเลือกประเภทผู้ใช้งาน!" },
                  ]}
                >
                  <Select>
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                    <Option value="Doctor">Doctor</Option>
                    <Option value="Nurse">Nurse</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="user_name"
                  style={{ marginTop: "-15px" ,marginLeft: "6px" }}
                  rules={[
                    { required: true, message: "กรุณากรอกชื่อผู้ใช้งาน!" },
                    {
                      validator: (rule, value, callback) => {
                        try {
                          if (userNameList?.includes(value)) {
                            throw new Error("Something wrong!");
                          } else {
                            return callback();
                          }
                        } catch (err) {
                          callback(err);
                        }
                      },
                      message: "ชื่อผู้ใช้งานนี้มีในระบบแล้ว!!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  style={{ marginTop: "-15px" ,marginLeft: "11px" }}
                  rules={[
                    { required: true, message: "กรุณากรอกรหัสผ่าน!" },
                    {
                      validator: (rule, value, callback) => {
                        try {
                          if (passwordList?.includes(value)) {
                            throw new Error("Something wrong!");
                          } else {
                            return callback();
                          }
                        } catch (err) {
                          callback(err);
                        }
                      },
                      message: "รหัสผ่านนนี้มีในระบบแล้ว!!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
           
            <Row  style={{ marginTop: "-15px" ,marginLeft: "6px" }}>
              <Space>
                <Form.Item
                  label="ชื่อ - นามสกุล"
                  name="pname"
                  rules={[{ required: true, message: "กรุณาเลือกคำนำหน้า!" }]}
                >
                  <Select style={{ width: "100px" }} placeholder="คำนำหน้า">
                    {pname.map((item) => (
                      <Option key={item.id} value={item.pname}>
                        {item.pname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="fname"
                  rules={[
                    { required: true, message: "กรุณากรอกชื่อเจ้าหน้าที่!" },
                  ]}
                >
                  <Input placeholder="ชื่อ" />
                </Form.Item>
                <Form.Item
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: " กรุณากรอกนามสกุลเจ้าหน้าที่!",
                    },
                  ]}
                >
                  <Input placeholder="นามสกุล" />
                </Form.Item>
              </Space>
            </Row>
            <Row  style={{ marginTop: "-15px" ,marginLeft: "54px" }}>
              <Space>
                <Form.Item label="JOB ID" name="job_id">
                  <Input style={{ width: "120px" }}  />
                </Form.Item>
                <Form.Item label="HIS ID" name="his_id">
                  <Input />
                </Form.Item>
              </Space>
            </Row>
            <Row justify="end" style={{ marginTop: "-20px" }}>
            <Button
                 htmlType="submit"
                  icon={
                    <VscSaveAs
                      style={{
                        fontSize: "14px",
                        marginRight: "3px",
                        marginBottom: "-2px",
                      }}
                    />
                  }
                  style={{
                    fontSize: "12px",
                    height: "28px",
                    backgroundColor: "#3AB0FF",
                    color: "white",
                  }}
                >
                  บันทึกข้อมูล
                </Button>
             
            </Row>
          </Form>
        </Modal>
        {/* end modal เพิ่มผู้ใช้งาน */}
        {/* modal edit user */}
        <Modal
          title=""
          visible={isModalVisibleEditUser}
          onCancel={handleCancelEditUser}
          footer={false}
          width={650}
          // bodyStyle={{ backgroundColor: "#FFEFD5" }}
          style={{top: 40}}

        >
           <Row style={{ marginTop: "-10px" }}>
            <p style={{fontSize:"16px"}}>แก้ไขข้อมูลผู้ใช้งาน</p>
          </Row>
          <Form form={frmEdit} layout="horizontal" onFinish={onFinishEditUser}>
            <Row justify="center">
              <Col offset={1}>
                <Form.Item name="id_user" hidden={true}></Form.Item>
                <Form.Item name="pic">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={dummyRequest}
                  >
                    <Spin spinning={loadingUploadPic}>
                      {imageUrl ? (
                        <Avatar
                          size={100}
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <div>
                          <Avatar
                            size={100}
                            src={`${env.PATH_IMG}/image/${
                              userSelect.pic
                            }?date=${moment().format("HHmmss")}`}
                          />
                          {loading}
                          <div style={{ marginTop: 4 }} />
                        </div>
                      )}
                    </Spin>
                  </Upload>
                </Form.Item>
              </Col>
              <Col offset={1}>
                <Form.Item label="ประเภทผู้ใช้" name="user_type">
                  <Select>
                    <Option value="SuperAdmin">SuperAdmin</Option>
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                    <Option value="Doctor">Doctor</Option>
                    <Option value="Nurse">Nurse</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="user_name"
                  style={{ marginTop: "-15px" ,marginLeft: "-5px" }}

                  rules={[
                    { required: true, message: "Please input your Username!" },
                    {
                      validator: (rule, value, callback) => {
                        try {
                          if (newUserListName?.includes(value)) {
                            throw new Error("Something wrong!");
                          } else {
                            return callback();
                          }
                        } catch (err) {
                          callback(err);
                        }
                      },
                      message: "Duplicate User Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  style={{ marginTop: "-15px" ,marginLeft: "-1px" }}

                  rules={[
                    { required: true, message: "Please input your Password!" },
                    {
                      validator: (rule, value, callback) => {
                        try {
                          if (newPassword?.includes(value)) {
                            throw new Error("Something wrong!");
                          } else {
                            return callback();
                          }
                        } catch (err) {
                          callback(err);
                        }
                      },
                      message: "Duplicate Password",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row  style={{ marginTop: "-15px" ,marginLeft: "25px" }}>
              <Space>
                <Form.Item label="ชื่อ-นามสกุล" name="pname">
                  <Select style={{ width: "100px" }}>
                    {pname.map((item) => (
                      <Option key={item.id} value={item.pname}>
                        {item.pname}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="fname">
                  <Input />
                </Form.Item>
                <Form.Item name="lname">
                  <Input />
                </Form.Item>
              </Space>
            </Row>
            <Row  style={{ marginTop: "-15px" ,marginLeft: "54px" }}>
              <Space>
                <Form.Item label="JOB ID" name="job_id">
                  <Input style={{ width: "120px" }} />
                </Form.Item>
                <Form.Item label="HIS ID" name="his_id">
                  <Input style={{ width: "140px" }} />
                </Form.Item>
                <Form.Item label="สถานะ" name="flag_delete">
                  <Select>
                    <Option value="1">ปกติ</Option>
                    <Option value="0">ยกเลิก</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Row>
            <Row justify="end">
            <Button
                 htmlType="submit"
                  icon={
                    <VscSaveAs
                      style={{
                        fontSize: "14px",
                        marginRight: "3px",
                        marginBottom: "-2px",
                      }}
                    />
                  }
                  style={{
                    fontSize: "12px",
                    height: "28px",
                    backgroundColor: "#3AB0FF",
                    color: "white",
                  }}
                >
                  บันทึกข้อมูล
                </Button>
            </Row>
          </Form>
        </Modal>
        {/* end edit modal */}
      </>
    </Layout>
  );
};

export default Showuser;
