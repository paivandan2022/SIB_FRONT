import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdManageSearch } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { Layout } from "../components";
import api from "../lib/api";

const Donor_settingMobile = () => {
  const [frmEdit] = Form.useForm();
  const [frmAdduser] = Form.useForm();
  const [frmSearch] = Form.useForm();

  //Modal add user / edit user
  const [isModalVisible_Edit, setIsModalVisible_Edit] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  //
  const [data_mobile, setData_mobile] = useState();

  const [newMobcode, setNewMobcode] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState();

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState();

  const [mobcode, setMobcode] = useState();
  const [mobname, setMobname] = useState();
  const [mobnameEdit, setMobnameEdit] = useState();

  const showModalPass = async () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const showModalPassEidt = async () => {
    setIsModalVisibleEdit(true);
    setTimeout(() => {
      document.getElementById("passEdit").focus();
    }, 500);
  };

  // Show modal
  const show_Modal_Edit = () => {
    setIsModalVisible_Edit(true);
    frmEdit.resetFields();
  };
  const Cancel_Modal_Edit = () => {
    setIsModalVisible_Edit(false);
    frmEdit.resetFields();
  };

  ///////

  // นำฟังก์ชั่น fetchUserList มาใส่ useEffect เพื่อเรียกใช้งาน

  useEffect(async () => {
    await facth_mobile();
  }, []);

  ////////////////// check update user
  useEffect(async () => {
    const newMob_code = newMobcode?.filter(
      (item) => item !== data_mobile?.MOBCODE
    );
  }, [data_mobile]);

  const onFinishAdduser = async () => {
    const frm = frmAdduser.getFieldValue();
    console.log("onFinishAdduser", frm);
    const result = await api.post(`/Add_mobile`, {
      mob_code: frm.mob_code,
      mob_name: frm.mob_name,
    });

    facth_mobile();
    setPassword();
    setMobcode();
    setMobname();
    setIsModalVisible(false);
    frmAdduser.resetFields();
  };
  ////////////////////////////
  const onFinish_edit_mob = async () => {
    const frm = frmEdit.getFieldValue();
    console.log("onFinish_edit_mob", frm);
    const result = await api.put(`/Update_mobile`, {
      mob_code: frm.MOBCODE,
      mob_name: frm.MOBNAME,
    });
    facth_mobile();
    // Close modal
    setIsModalVisible_Edit(false);
    setPasswordEdit();
    setIsModalVisibleEdit(false);
  };
  //////////////////////

  const onEdit = async (MOBCODE) => {
    const data_mobiles = data_mobile?.find((item) => item.MOBCODE === MOBCODE);
    console.log("data_mobiles", data_mobiles);
    show_Modal_Edit();
    setMobnameEdit(data_mobiles.MOBNAME);
    frmEdit.setFieldsValue({
      ...data_mobiles,
    });
  };

  const facth_mobile = async () => {
    setLoadingTable(true);
    const result = await api.get(`/Get_Mobile`);
    setData_mobile(result.data);

    console.log("facth_mobile", result.data);

    const newMobcode = result.data.map((item) => item.MOBCODE);
    setNewMobcode(newMobcode);

    setLoadingTable(false);
  };

  const onFinishSearch = async (params) => {
    console.log("value------>", params);
    try {
      const result = await api.get("/Search_moblie", { params });
      console.log("รายชื่อหน่วยบริจาค", result.data);
      setData_mobile(result.data);
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };
  const columns = [
    {
      title: "MOBCODE",
      dataIndex: "MOBCODE",
      key: "MOBCODE",
      align: "center",
    },
    {
      title: "MOBNAME",
      dataIndex: "MOBNAME",
      key: "MOBNAME",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      align: "center",
      width: 120,
      render: (record) => (
        <div>
          <SettingOutlined
            style={{ fontSize: "13px", color: "#461111" }}
            onClick={() => onEdit(record.MOBCODE)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout keyTab="Donor_settingMobile">
      <>
        <div>
          <Head>
            <title>SIBSOFT : ตั้งค่าหน่วยรับบริจาค</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center" style={{ marginTop: "30px" }}>
          <Card style={{ width: "800px" }}>
            <Row justify="center">
              <Col
                span={9}
                style={{
                  marginTop: "40px",
                  border: "1px solid",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Row>
                  <p style={{ fontSize: "14px" }}>เพิ่มหน่วยบริจาค</p>
                </Row>
                <Form form={frmAdduser} layout="horizontal">
                  <Form.Item
                    label="Mob code"
                    name="mob_code"
                    required
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      size="small"
                      onChange={(e) => setMobcode(e.target.value)}
                      // onChange={checkBtnAdd}
                    />
                  </Form.Item>
                  <Form.Item
                    label="ชื่อหน่วย"
                    name="mob_name"
                    required
                    style={{ paddingLeft: "16px", marginTop: "-15px" }}
                  >
                    <Input
                      size="small"
                      onChange={(e) => setMobname(e.target.value)}
                      //onChange={checkBtnAdd}
                    />
                  </Form.Item>

                  <Row justify="end" style={{ marginTop: "-15px" }}>
                    <Tooltip
                      placement="left"
                      title={!(mobcode && mobname) ? "กรุณากรอกข้อมูล" : ""}
                    >
                      <Button
                        disabled={!(mobcode && mobname)}
                        onClick={showModalPass}
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
                          backgroundColor: !(mobcode && mobname)
                            ? ""
                            : "#3AB0FF",
                          color: !(mobcode && mobname) ? "" : "white",
                        }}
                      >
                        บันทึกข้อมูล
                      </Button>
                    </Tooltip>
                  </Row>
                </Form>
              </Col>

              <Col span={13} style={{ marginLeft: "15px" }}>
                <Row justify="center">
                  <Form form={frmSearch} onFinish={onFinishSearch}>
                    <Space>
                      <Form.Item name="keyword" label="ค้นหา">
                        <Input placeholder="MOBCODE / MOBNAME" />
                      </Form.Item>
                      <Form.Item>
                        <Button
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
                          htmlType="submit"
                        >
                          ค้นหา
                        </Button>
                      </Form.Item>
                    </Space>
                  </Form>
                </Row>
                <Row style={{ marginTop: "-15px" }}>
                  <Table
                    columns={columns}
                    dataSource={data_mobile}
                    loading={loadingTable}
                    rowKey="MOBCODE"
                    pagination={false}
                    scroll={{ y: 280 }}
                    size="small"
                    className="xm"
                    style={{ border: "1px solid" }}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
        <br />
        {/* ///////////////MODAL//////////////////// */}
        {/* modal edit */}
        <Modal
          title=""
          visible={isModalVisible_Edit}
          onCancel={Cancel_Modal_Edit}
          footer={false}
          width="390px"
        >
          <Row>
            <p style={{ fontSize: "14px" }}>แก้ไขหน่วยรับริจาค</p>
          </Row>
          <Row justify="center" style={{ marginTop: "-7px" }}>
            <Form form={frmEdit} layout="horizontal">
              <Form.Item label="Mob code" name="MOBCODE">
                <Input style={{ fontSize: "14px" }} disabled />
              </Form.Item>
              <Form.Item
                label="ชื่อ"
                name="MOBNAME"
                style={{ paddingLeft: "45px", marginTop: "-15px" }}
              >
                <Input
                  style={{ fontSize: "14px" }}
                  onChange={(e) => setMobnameEdit(e.target.value)}
                />
              </Form.Item>
              <Row justify="end" style={{ marginTop: "-15px" }}>
                <Tooltip
                  placement="left"
                  title={!mobnameEdit ? "กรุณากรอกข้อมูล" : ""}
                >
                  <Button
                    disabled={!mobnameEdit}
                    onClick={showModalPassEidt}
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
                      backgroundColor: !mobnameEdit ? "" : "#3AB0FF",
                      color: !mobnameEdit ? "" : "white",
                    }}
                  >
                    บันทึกข้อมูล
                  </Button>
                </Tooltip>
              </Row>
            </Form>
          </Row>
        </Modal>

        {/* end edit modal */}
        {/* //////////////////////////////////////////////////////// */}

        {/* modal pass add */}
        <Modal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false), setPassword();
          }}
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>

          <Input.Password
            id="pass"
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={({ target: { value }, keyCode }) => {
              if (keyCode === 13) {
                // 13 คือ enter
                onFinishAdduser();
              }
            }}
          />

          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalVisible(false), setPassword();
              }}
              style={{
                fontSize: "12px",
                height: "28px",
              }}
            >
              ยกเลิก
            </Button>
            &nbsp;
            <Button
              type="primary"
              style={{
                fontSize: "12px",
                height: "28px",
              }}
              onClick={onFinishAdduser}
              disabled={!password}
            >
              ยืนยัน
            </Button>
          </Row>
          {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Modal>

        {/* modal pass edit */}
        <Modal
          visible={isModalVisibleEdit}
          onCancel={() => {
            setIsModalVisibleEdit(false), setPasswordEdit();
          }}
          width={250}
          footer={false}
        >
          <Row>
            <h style={{ fontSize: "14px" }}>ยืนยันรหัสผ่าน</h>
          </Row>

          <Input.Password
            id="passEdit"
            placeholder="กรุณากรอกรหัสผ่าน"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            style={{ width: "100%" }}
            value={passwordEdit}
            onChange={(e) => setPasswordEdit(e.target.value)}
            onKeyDown={({ target: { value }, keyCode }) => {
              if (keyCode === 13) {
                // 13 คือ enter
                onFinish_edit_mob();
              }
            }}
          />

          <Row justify="end" style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsModalVisibleEdit(false), setPasswordEdit();
              }}
              style={{
                fontSize: "12px",
                height: "28px",
              }}
            >
              ยกเลิก
            </Button>
            &nbsp;
            <Button
              type="primary"
              style={{
                fontSize: "12px",
                height: "28px",
              }}
              onClick={onFinish_edit_mob}
              disabled={!passwordEdit}
            >
              ยืนยัน
            </Button>
          </Row>
          {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        </Modal>
      </>
    </Layout>
  );
};

export default Donor_settingMobile;
