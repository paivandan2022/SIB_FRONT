import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCheck, BiDonateBlood, BiFileFind, BiUserX } from "react-icons/bi";
import { Layout } from "../components";

import api from "../lib/api";
import env from "/env.json";

const { TabPane } = Tabs;
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const mapColorStatus = {
  1: "#17a2b8",
  2: "#eca52b",
  3: "#fe6d43",
  4: "#28a745",
  5: "#343a40",
};

const Editpopup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1280;
  const appH = 720;
  const url = "/Donor_frmedit?id=" + value;
  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};
const Bloodpopup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1280;
  const appH = 720;
  const url = "/Donor_frmblood?id=" + value;
  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};
const Confirmpopup = (value) => {
  const scW = screen.width / 2;
  const scH = screen.height / 2;
  const appW = 1100;
  const appH = 720;
  const url = "/Donor_frmconfirm?id=" + value;
  const title = "TEST";
  const callW = appW / 2;
  const callH = appH / 2;

  const str =
    "width=" +
    appW +
    ",height=" +
    appH +
    ",top=" +
    (scH - callH) +
    ",left=" +
    (scW - callW);
  window.open(url, title, str);
};
const Donor_donation_list = () => {
  const [newDonorlist, setnewDonorlist] = useState([]);
  const [isModalVisibleEject, setIsModalVisibleEject] = useState(false);
  const [password, setPassword] = useState();
  const [datadonor, setDatadonor] = useState();
  const [donor_status, setDonor_status] = useState();
  const [Loanding_table, setLoanding_table] = useState(false);
  const [frmSearch] = Form.useForm();
  const [frmEject] = Form.useForm();

  //-----------------------------------//
  const onFinishSearch = async (value) => {
    try {
      setLoanding_table(true);
      const params = {
        ...value,
        date_start: moment(value.date_Search[0]).format("YYYY-MM-DD"),
        date_end: moment(value.date_Search[1]).format("YYYY-MM-DD"),
      };
      delete params.date_Search;
      console.log("params", params);

      await Fetch_Donor_list(params);
    } catch (error) {
      Modal.error({ title: "แจ้งเตือน", content: "กรุณาเลือกช่วงเวลา !!!" });
    }
    setLoanding_table(false);
  };
  //-----------------------------------//

  const Fetch_Donor_list = async (params) => {
    const result = await api.get("/Get_donor_list", { params });
    console.log("รายชื่อผู้บริจาค", result.data);
    setnewDonorlist(result.data);
  };
  const Fetch_Donor_blood_status = async () => {
    const result = await api.get("/Get_donor_blood_status");
    console.log("Get_donor_blood_status", result.data);
    setDonor_status(result.data);
  };
  useEffect(async () => {
    await Fetch_Donor_list({
      date_start: moment().format("YYYY-MM-DD"),
      date_end: moment().format("YYYY-MM-DD"),
    });
    await Fetch_Donor_blood_status();
  }, []);
  const showModalEject = (value) => {
    setDatadonor(value);
    frmEject.setFieldsValue({
      pid: value.pid,
    });
    setIsModalVisibleEject(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const handleOkEject = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin.data);
    try {
      if (resultLogin.data.id_user) {
        const formDataEject = frmEject.getFieldsValue();
        const result1 = await api.post(`/Eject_register`, {
          ignore_status: true,
          eject_note: formDataEject.eject_note,
          staff: resultLogin.data.fname + " " + resultLogin.data.lname,
          pid: formDataEject.pid,
        });
        setIsModalVisibleEject(false);
        setPassword();
        search.click();
        // Fetch_Donor_list();

        //window.close();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalVisibleEject(false);
    } catch (error) {
      Modal.error({ title: "Error", content: "Error!!" });
    }
    setIsModalVisibleEject(false);
  };
  const handleCancelEject = () => {
    setIsModalVisibleEject(false);
    setPassword();
  };
  const Clear_value = () => {
    frmSearch.resetFields();
    setnewDonorlist();
  };
  //-------------------------//
  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text, record) => (
        <Avatar
          src={`${env.PATH_IMG}/image/${text}?pathType=2&date=${moment().format(
            "HHmmss"
          )}`}
          width="10px"
          icon={<UserOutlined style={{ fontSize: "12px" }} />}
        />
      ),
    },
    {
      title: "เลขประจำตัว",
      dataIndex: "cid",
      key: "cid",
      align: "center",
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
      align: "center",
      render: (text) => (
        <div style={{ color: text < "17" || text > "60" ? "red" : "" }}>
          {text}
        </div>
      ),
    },
    {
      title: "หมู่เลือด",
      dataIndex: "bloodgroup",
      key: "bloodgroup",
      align: "center",
    },
    {
      title: "เพศ",
      dataIndex: "sex",
      key: "sex",
      align: "center",
    },
    {
      title: "เบอร์ติดต่อ",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "status_name",
      key: "status_name",
      align: "center",
      render: (text, record) => (
        <Space>
          <Tag
            icon={<SyncOutlined spin />}
            color={mapColorStatus[record.status]}
          >
            {text}
          </Tag>
        </Space>
      ),
    },
    {
      title: "การทำงาน",
      key: "Option",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="ดูข้อมูลผู้บริจาค">
            <Button
              // size="large"
              style={{ fontSize: "10px", color: "#2F4F4F", height: "25px" }}
              shape="circle"
              icon={<BiFileFind />}
              onClick={() => Editpopup(record.pid)}
              disabled={
                record.status === "4"
                  ? "true"
                  : "" || record.status === "5"
                  ? "true"
                  : ""
              }
            />
          </Tooltip>
          <Tooltip title="ลงทะเบียนบริจาคเลือด">
            <Button
              // size="large"
              style={{ fontSize: "5px", color: "#0099FF", height: "25px" }}
              shape="circle"
              icon={<BiDonateBlood size="large" />}
              onClick={() => Bloodpopup(record.pid)}
              disabled={
                record.status === "1"
                  ? "true"
                  : "" || record.status === "4"
                  ? "true"
                  : "" || record.status === "5"
                  ? "true"
                  : ""
              }
            />
          </Tooltip>
          <Tooltip title="ยืนยันข้อมูล">
            <Button
              // size="large"
              style={{ fontSize: "5px", color: "green", height: "25px" }}
              shape="circle"
              icon={<BiCheck size="large" />}
              onClick={() => Confirmpopup(record.pid)}
              disabled={
                record.status === "1"
                  ? "true"
                  : "" || record.status === "2"
                  ? "true"
                  : ""
              }
            />
          </Tooltip>
          <Tooltip title="ยกเลิก">
            <Button
              // size="large"
              style={{ fontSize: "5px", color: "Tomato", height: "25px" }}
              shape="circle"
              icon={<BiUserX size="large" />}
              onClick={
                record.status === "5"
                  ? () =>
                      Modal.error({
                        title: "ยกเลิกการบริจาค",
                        content: (
                          <div>
                            <Space direction="vertical">
                              <Row>
                                <Text underline>ชื่อ-นามสกุล : </Text>
                                <Text strong>
                                  &nbsp; {record?.fullname} &nbsp;
                                </Text>
                              </Row>
                              <Row>
                                <Text underline>เลขประจำตัว : </Text>
                                <Text strong>&nbsp; {record?.cid}</Text>
                              </Row>
                              <Row>
                                <Text>เหตุผลการยกเลิก : </Text>
                                <Col>
                                  <TextArea
                                    rows={2}
                                    placeholder="เหตุผลการยกเลิก"
                                    maxLength={200}
                                    style={{ width: 300 }}
                                    value={record.eject_note}
                                    disabled
                                  />
                                </Col>
                              </Row>
                              <Text>ผู้ยกเลิก : {record.staff_eject}</Text>
                              <Text>วัน-เวลา : {record.date_eject}</Text>
                            </Space>
                          </div>
                        ),
                      })
                  : () => showModalEject(record)
              }
              disabled={record.status === "4" ? "true" : ""}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="Donor_donation_list">
        <div>
          <Head>
            <title>SIBSOFT : รายการผู้มาบริจาคเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center" style={{ padding: "10px" }}>
          <Col span={24}>
            <Card>
              <Tabs type="card" style={{ marginTop: -20 }}>
                <TabPane tab="รายการผู้มาบริจาคเลือด" key="1">
                  <Row style={{ marginTop: "20px" }}>
                    <Col span={19} offset={1}>
                      <Form
                        form={frmSearch}
                        layout="inline"
                        onFinish={onFinishSearch}
                        initialValues={{
                          date_Search: [moment(), moment()],
                        }}
                      >
                        <Form.Item name="date_Search">
                          <RangePicker
                            placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                          />
                        </Form.Item>
                        <Form.Item name="keyword">
                          <Input
                            placeholder="ชื่อ-สกุล / เลขประจำตัวประชาชน"
                            style={{
                              textAlign: "center",
                            }}
                          />
                        </Form.Item>
                        <Form.Item> หรือ </Form.Item>
                        <Form.Item name="keyword_status">
                          <Select
                            placeholder="สถานะ"
                            style={{
                              height: "40px",
                              width: "200px",

                              textAlign: "center",
                            }}
                          >
                            {donor_status?.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.status_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            id="search"
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "5px",
                              backgroundColor: "#17a2b8",
                              color: "white",
                            }}
                            icon={
                              <MdManageSearch
                                style={{
                                  fontSize: "16px",
                                  marginRight: "3px",
                                  marginBottom: "-3px",
                                }}
                              />
                            }
                          >
                            ค้นหา
                          </Button>
                          &nbsp;
                          <Button
                            style={{
                              fontSize: "12px",
                              height: "28px",
                              marginLeft: "5px",
                              backgroundColor: "orange",
                              color: "white",
                            }}
                            icon={
                              <MdRefresh
                                style={{
                                  fontSize: "16px",
                                  marginRight: "3px",
                                  marginBottom: "-3px",
                                }}
                              />
                            }
                            onClick={Clear_value}
                          >
                            เริ่มใหม่
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Link href="/Donor_register">
                          <a target="_blank">
                            <Button
                              type="primary"
                              style={{
                                background: "#08979c",
                                borderColor: "#e6fffb",
                              }}
                              // href="/Donor_register"
                              // icon={<BiUserPlus size="large"/>}
                            >
                              ลงทะเบียนผู้มาบริจาค
                            </Button>
                          </a>
                        </Link>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="center" style={{ marginTop: "-10px" }}>
                    <Col span={23}>
                      <Table
                        className="xm"
                        bordered
                        size="small"
                        columns={columns}
                        dataSource={newDonorlist}
                        loading={Loanding_table}
                        pagination={{
                          hideOnSinglePage: true,
                          showSizeChanger: false,
                        }}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
      {/* ------------------------ */}

      <Modal
        title=""
        visible={isModalVisibleEject}
        onCancel={handleCancelEject}
        style={{ top: 60 }}
        width={550}
        // okText="ยืนยัน"
        // cancelText="ยกเลิก"
        footer={false}
      >
        <Space direction="vertical">
          <Row>
            <p style={{ fontSize: "16px" }}>ยกเลิกการบริจาค</p>
          </Row>
          <Row style={{ marginTop: "-22px", marginLeft: "20px" }}>
            <Form.Item name="pid" hidden>
              <Input />
            </Form.Item>
            <Text style={{ fontSize: "14px" }}>ต้องการ </Text>
            <Text type="danger" underline strong style={{ fontSize: "14px" }}>
              ยกเลิก
            </Text>
            <Text style={{ fontSize: "14px" }}>การบริจาคเลือด &nbsp; </Text>
          </Row>
          <Row style={{ marginLeft: "20px" }}>
            <Text underline style={{ fontSize: "14px" }}>
              ชื่อ-นามสกุล :{" "}
            </Text>
            <Text strong style={{ fontSize: "14px" }}>
              &nbsp; {datadonor?.fullname} &nbsp;
            </Text>
            <Text underline style={{ fontSize: "14px" }}>
              เลขประจำตัว :{" "}
            </Text>
            <Text strong style={{ fontSize: "14px" }}>
              &nbsp; {datadonor?.cid}
            </Text>
          </Row>

          <Form form={frmEject}>
            <Row>
              <Col span={10} style={{ paddingRight: "10px" }}>
                <p>ยกเลิกก่อนเจาะ</p>
                <Form.Item>
                  <Select>
                    <Option>คำถามไม่ผ่าน</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={14}>
                <p>ยกเลิกหลังเจาะ</p>
                <Form.Item
                  label="Deferred due to"
                  name="defer"
                  rules={[{ required: false }]}
                  style={{
                    margin: "0% 0px",
                    marginTop: "-15px",
                  }}
                >
                  <Input style={{ marginLeft: 0 }} />
                </Form.Item>
                <Form.Item
                  label="กินยาที่มีผลต่อเกล็ดเลือด"
                  name="medic"
                  rules={[{ required: false }]}
                  style={{
                    display: "",
                    margin: "2% 0px",
                    marginTop: "-1px",
                    textAlign: "center",
                  }}
                  initialValue={0}
                >
                  <Radio.Group defaultValue={0}>
                    <Radio value={0}>ไม่ใช่</Radio>
                    <Radio value={1}>ใช่</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Under volume"
                  name="under_volume"
                  rules={[{ required: false }]}
                  style={{
                    display: "",
                    margin: "2% 0px",
                    marginTop: "-18px",
                    textAlign: "center",
                    marginLeft: "56px",
                  }}
                  initialValue={0}
                >
                  <Radio.Group defaultValue={0}>
                    <Radio value={0}>ไม่ใช่</Radio>
                    <Radio value={1}>ใช่</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Hight volume"
                  name="high_volume"
                  rules={[{ required: false }]}
                  style={{
                    display: "",
                    margin: "0% 0px",
                    marginTop: "-18px",
                    textAlign: "center",
                    marginLeft: "60px",
                  }}
                  initialValue={0}
                >
                  <Radio.Group defaultValue={0}>
                    <Radio value={0}>ไม่ใช่</Radio>
                    <Radio value={1}>ใช่</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Discarded"
                  name="discard"
                  rules={[{ required: false }]}
                  style={{
                    display: "",
                    margin: "0% 0px",
                    marginTop: "-12px",
                    textAlign: "center",
                    marginLeft: "80px",
                  }}
                  initialValue={0}
                >
                  <Radio.Group defaultValue={0} style={{ marginLeft: "3px" }}>
                    <Radio value={0}>ไม่ใช่</Radio>
                    <Radio value={1}>ใช่</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Text type="secondary">เหตุผลการยกเลิก :</Text>
            <Row></Row>
            <Row>
              <Col span={24}>
                <Form.Item name="eject_note">
                  <TextArea
                    showCount
                    rows={4}
                    placeholder="เหตุผลการยกเลิก"
                    maxLength={200}
                    style={{ width: 460 }}
                    name="eject_note"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Text type="secondary">รหัสผ่าน :</Text>

          <Input.Password
            id="pass"
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row justify="end">
            <Button
              type="primary"
              danger
              onClick={handleCancelEject}
              style={{ fontSize: "12px", height: "28px" }}
            >
              ยกเลิก
            </Button>
            <Button
              icon={
                <VscSaveAs
                  style={{
                    fontSize: "14px",
                    marginRight: "3px",
                    marginBottom: "-2px",
                  }}
                />
              }
              onClick={handleOkEject}
              type="primary"
              style={{ fontSize: "12px", height: "28px", marginLeft: "5px" }}
              disabled={!password}
            >
              บันทึกข้อมูล
            </Button>
          </Row>
        </Space>
      </Modal>
    </>
  );
};

export default Donor_donation_list;
