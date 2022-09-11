import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { CgClose } from "react-icons/cg";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MdOutlineCheck, MdRefresh } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";

import api from "../lib/api";

const Setting_Spin = () => {
  const { Option } = Select;

  const [choicebag, setChoicebag] = useState();
  const [cell_choice, setCell_choice] = useState();
  const [platelet_choice, setPlatelet_choice] = useState();
  const [pasma_choice, setPasma_choice] = useState();
  const [setting_data, setSetting_data] = useState();
  const [search_data, setSearch_data] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setting_all, setSetting_all] = useState();
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [checkBag, setCheckBag] = useState([]);
  const [newcheckBag, setNewCheckBag] = useState([]);
  const [newBag, setNewBag] = useState([]);

  const [isModalPassword, setIsModalPassword] = useState(false);
  const [password, setPassword] = useState();

  const [isModalPasswordEdit, setIsModalPasswordEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState();

  const [typeBag, setTypeBag] = useState();
  const [bag1, seBag1] = useState();
  const [bag2, setBag2] = useState();
  const [bag3, setBag3] = useState();

  const [frmSetting_Spin] = Form.useForm();
  const [frmSetting] = Form.useForm();

  const Choice_bag = async () => {
    const result = await api.get("/bag_choice");
    setChoicebag(result.data);
    console.log("Choice_bag", result.data);
  };
  const Choice_cell = async () => {
    const result = await api.get("/spin_choice_cell");
    setCell_choice(result.data);
    console.log("Choice_cell", result.data);
  };
  const Choice_platelet = async () => {
    const result = await api.get("/spin_choice_platelet");
    setPlatelet_choice(result.data);
    console.log("Choice_platelet", result.data);
  };
  const Choice_pasma = async () => {
    const result = await api.get("/spin_choice_pasma");
    setPasma_choice(result.data);
    console.log("Choice_pasma", result.data);
  };
  const Setting_data = async () => {
    const result = await api.get("/setting_bag");
    setSetting_data(result.data);
    console.log("Setting_data", result.data);
  };

  const Clear_value = () => {
    frmSetting_Spin.resetFields();
    setTypeBag("");
  };

  const mapColorStatus = {
    0: "#6c757d",
    1: "#28a745",
  };

  const columnAll = [
    {
      title: "bagcode",
      dataIndex: "bagcode",
      key: "bagcode",
      align: "center",
      width: 70,
      render: (text, record) => <h style={{ fontSize: "10px" }}>{text}</h>,
    },
    {
      title: "ประเภทถุงเลือด",
      dataIndex: "bagtype",
      key: "bagtype",
      align: "center",
      width: 200,
      render: (text, record) => <h style={{ fontSize: "10px" }}>{text}</h>,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 80,
      render: (text, record) => (
        <>
          {text === 0 ? (
            <Tag
              icon={<CgClose style={{ marginBottom: "-1px" }} />}
              color={mapColorStatus[record.status]}
            >
              &nbsp;{" "}
              <h style={{ fontSize: "10px" }}>{text === 0 ? "ปิด" : "เปิด"}</h>
            </Tag>
          ) : (
            <Tag
              icon={<MdOutlineCheck style={{ marginBottom: "-1px" }} />}
              color={mapColorStatus[record.status]}
            >
              &nbsp;
              <h style={{ fontSize: "10px" }}>{text === 0 ? "ปิด" : "เปิด"}</h>
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      align: "center",
      width: 100,
      render: (text, record) => (
        <Button
          style={{
            fontSize: "10px",
            height: "23px",
            backgroundColor: "#17a2b8",
            color: "white",
          }}
          icon={
            <RiListSettingsLine
              style={{
                fontSize: "13px",
                marginRight: "3px",
                marginBottom: "-3px",
              }}
            />
          }
          size="small"
          onClick={() => showModalEdit(record.bagcode)}
        >
          แก้ไข
        </Button>
      ),
    },
  ];

  //Setting Auto Result Spin..
  const showModalPassword = async () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  //Setting Modal..
  const showModalPasswordEdit = async () => {
    setIsModalPasswordEdit(true);
    setTimeout(() => {
      document.getElementById("passEdit").focus();
    }, 500);
  };

  const showModal = async () => {
    setIsModalVisible(true);
    const result = await api.get("/setting_all");
    setSetting_all(result.data);
    const bagAll = result.data.map((item) => item.bagcode);
    setCheckBag(bagAll);

    console.log("setting_all", result.data);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalEdit = async (value) => {
    setIsModalEdit(true);
    console.log("value", value);

    const bagSelected = setting_all.find((item) => item.bagcode === value);
    setNewBag(bagSelected);

    frmSetting.setFieldsValue({
      bagcode: bagSelected.bagcode,
      bagtype: bagSelected.bagtype,
      sep_cell_edit: Number(bagSelected.bag_sep1),
      sep_platelet_edit: Number(bagSelected.bag_sep2),
      sep_pasma_edit: Number(bagSelected.bag_sep3),
      status: Number(bagSelected.status),
      his_bag_id: bagSelected.his_bag_type_id,
    });
    console.log("edit", bagSelected);
  };

  const handleOkEdit = async () => {
    const frmData = frmSetting.getFieldValue();
    const result = await api.put("/update_setting_bag", {
      ...frmData,
      // status: (frmData.status === 'เปิด'? 1 : 0)
    });
    console.log("frmData=>", frmData);
    showModal();
    setIsModalPasswordEdit(false);
    setPasswordEdit();
    setIsModalEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalEdit(false);
  };

  const ChangeSelect = async (e) => {
    console.log("ChangeSelect", e);
    setTypeBag(e);

    const bagSelected = setting_data.find((item) => item.bagcode === e);

    setSearch_data(bagSelected);
    console.log("result", bagSelected);

    frmSetting_Spin.setFieldsValue({
      sep_cell: Number(bagSelected.bag_sep1),
      sep_platelet: Number(bagSelected.bag_sep2),
      sep_pasma: Number(bagSelected.bag_sep3),
    });
  };

  useEffect(async () => {
    await Choice_bag();
    await Choice_pasma();
    await Choice_platelet();
    await Choice_cell();
    await Setting_data();
  }, []);

  useEffect(async () => {
    const newBagcode = checkBag.filter((item) => item !== newBag.bagcode);

    setNewCheckBag(newBagcode);
  }, [newBag]);

  const update_set_bag = async () => {
    const frmData = frmSetting_Spin.getFieldsValue();
    console.log("frmData", frmData);

    const result = await api.put("/Update_setting", {
      blood_type: frmData.blood_type,
      sep_cell: frmData.sep_cell,
      sep_platelet: frmData.sep_platelet,
      sep_pasma: frmData.sep_pasma,
    });
    Setting_data();
    setIsModalPassword(false);
    setPassword();
    // frmSetting_Spin.resetFields();
  };
  const columns = [
    // {
    //   title: "ลำดับ",
    //   align: "center",
    //   width: 60,
    //   fixed: "left",
    //   render: (text, record, index) => {
    //     return index + 1;
    //   },
    // },
    {
      title: "Bagcode",
      dataIndex: "bagcode",
      key: "bagcode",
      align: "center",
      width: 70,
      fixed: "left",
    },
    {
      title: "Bag Type",
      dataIndex: "bagtype",
      key: "bagtype",
      align: "center",
      width: 130,
      fixed: "left",
    },
    {
      title: "Bag 1",
      dataIndex: "b1",
      key: "b1",
      align: "center",
      width: 90,
    },
    {
      title: "Bag 2",
      dataIndex: "b2",
      key: "b2",
      align: "center",
      width: 90,
    },
    {
      title: "Bag 3",
      dataIndex: "b3",
      key: "b3",
      align: "center",
      width: 90,
    },
  ];
  return (
    <>
      <div>
        <Head>
          <title>SIBSOFT : ตั้งค่าการปั่นเเยก</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
      </div>
      <Row justify="center">
        <Card title="Setting Auto Result Spin.." style={{ width: 800 }}>
          <Form form={frmSetting_Spin} layout="horizontal">
            <Row style={{ marginTop: "-10px" }}>
              <Col span={10}>
                <Form.Item
                  label="ประเภทถุง"
                  name="blood_type"
                  //   rules={[{ required: true }]}
                >
                  <Select
                    size="small"
                    showArrow={false}
                    style={{
                      fontSize: "12px",
                      width: "200px",
                      textAlign: "center",
                    }}
                    onChange={ChangeSelect}
                  >
                    {choicebag?.map((item) => (
                      <Option key={item.bagcode} value={item.bagcode}>
                        {item.bagtype}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Button
                  style={{
                    fontSize: "12px",
                    marginLeft: "5px",
                    backgroundColor: "orange",
                    color: "white",
                    marginTop: "4px",
                  }}
                  icon={
                    <MdRefresh
                      style={{
                        fontSize: "14px",
                        marginRight: "3px",
                        marginBottom: "-2px",
                      }}
                    />
                  }
                  onClick={Clear_value}
                  size="small"
                >
                  เริ่มใหม่
                </Button>
              </Col>
              <Col span={5} style={{ marginLeft: "100px" }}>
                <Button
                  style={{
                    fontSize: "12px",
                    height: "28px",
                    marginLeft: "30px",
                    backgroundColor: "#17a2b8",
                    color: "white",
                  }}
                  icon={
                    <RiListSettingsLine
                      style={{
                        fontSize: "16px",
                        marginRight: "3px",
                        marginBottom: "-3px",
                      }}
                    />
                  }
                  onClick={showModal}
                >
                  ตั้งค่าถุงเลือด
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "-22px", marginLeft: "25px" }}>
              <Form.Item
                name="sep_cell"
                label="ถุงที่ 1"
                //   rules={[{ required: true }]}
              >
                <Select
                  size="small"
                  showArrow={false}
                  style={{ fontSize: "12px", width: "100px" }}
                >
                  {cell_choice?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.s_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="sep_platelet"
                label="ถุงที่ 2"
                style={{ marginLeft: "5px" }}
                //   rules={[{ required: true }]}
              >
                <Select
                  size="small"
                  showArrow={false}
                  style={{ fontSize: "12px", width: "100px" }}
                >
                  {platelet_choice?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.s_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="sep_pasma"
                label="ถุงที่ 3"
                style={{ marginLeft: "5px" }}

                //   rules={[{ required: true }]}
              >
                <Select
                  size="small"
                  showArrow={false}
                  style={{ fontSize: "12px", width: "100px" }}
                >
                  {pasma_choice?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.s_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Row>

            <Row justify="end">
              <Tooltip placement="right" title={(!typeBag || typeBag === "")?"กรุณากรอกข้อมูล":""}>
                <Button
                  disabled={!typeBag || typeBag === ""}
                  onClick={showModalPassword}
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
                    backgroundColor:
                      !typeBag || typeBag === "" ? "" : "#3AB0FF",
                    color: !typeBag || typeBag === "" ? "" : "white",
                  }}
                >
                  บันทึกข้อมูล
                </Button>
              </Tooltip>
            </Row>
          </Form>
          <Row justify="center" style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={setting_data}
                size="small"
                className="xm"
                bordered
              ></Table>
            </Col>
          </Row>
        </Card>
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        style={{ top: 20 }}
      >
        <>
          <Row justify="center">
            <Table
              size="small"
              pagination={false}
              className="xm"
              bordered
              columns={columnAll}
              dataSource={setting_all}
              scroll={{
                y: 300,
              }}
            />
          </Row>
        </>
      </Modal>

      <Modal
        visible={isModalEdit}
        onOk={showModalPasswordEdit}
        onCancel={handleCancelEdit}
        footer={false}
        style={{ top: 20 }}
      >
        <>
          <Row justify="center">
            <Form form={frmSetting}>
              <Row>
                <Col span={8} style={{ marginLeft: "-20px" }}>
                  <Form.Item
                    label="bagcode"
                    name="bagcode"
                    rules={[
                      { required: true, message: "input bagcode!" },
                      {
                        validator: (rule, value, callback) => {
                          try {
                            if (newcheckBag?.includes(value)) {
                              throw new Error("Something wrong!");
                            } else {
                              return callback();
                            }
                          } catch (err) {
                            callback(err);
                          }
                        },
                        message: "bagcode ซ้ำ",
                      },
                    ]}
                    style={{ fontSize: "12px" }}
                  >
                    <Input
                      disabled
                      style={{
                        color: "black",
                        fontSize: "12px",
                        width: "100px",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12} style={{ marginLeft: "30px" }}>
                  <Form.Item label="bagtype" name="bagtype">
                    <Input style={{ fontSize: "12px" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={7} style={{ marginLeft: "7px" }}>
                  <Form.Item
                    name="sep_cell_edit"
                    label="ถุงที่ 1"
                    //   rules={[{ required: true }]}
                  >
                    <Select
                      size="small"
                      style={{
                        fontSize: "12px",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {cell_choice?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.s_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={7} style={{ marginLeft: "15px" }}>
                  <Form.Item
                    name="sep_platelet_edit"
                    label="ถุงที่ 2"
                    style={{ marginLeft: "5px" }}
                    //   rules={[{ required: true }]}
                  >
                    <Select
                      size="small"
                      style={{
                        fontSize: "12px",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {platelet_choice?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.s_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={7} style={{ marginLeft: "17px" }}>
                  <Form.Item
                    name="sep_pasma_edit"
                    label="ถุงที่ 3"
                    style={{ marginLeft: "5px" }}

                    //   rules={[{ required: true }]}
                  >
                    <Select
                      size="small"
                      style={{
                        fontSize: "12px",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {pasma_choice?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.s_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={10} style={{ marginLeft: "-18px" }}>
                  <Form.Item label="his_bag_id" name="his_bag_id">
                    <Input style={{ width: "100px", fontSize: "12px" }} />
                  </Form.Item>
                </Col>

                <Col span={10} style={{ marginLeft: "-18px" }}>
                  <Form.Item label="สถานะ" name="status">
                    <Select
                      size="small"
                      style={{
                        fontSize: "12px",
                        width: "80px",
                        textAlign: "center",
                      }}
                    >
                      <Option value={1}>เปิด</Option>
                      <Option value={0}>ปิด</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="end" style={{ marginTop: "-25px" }}>
                <Button
                  size="small"
                  onClick={showModalPasswordEdit}
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
          </Row>
        </>
      </Modal>

      <Modal
        visible={isModalPassword}
        onCancel={() => {
          setIsModalPassword(false), setPassword();
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
              update_set_bag();
            }
          }}
        />

        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPassword(false), setPassword();
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
            onClick={update_set_bag}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
        {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      </Modal>

      {/* ยืนยันรหัส frm ใน modal */}
      <Modal
        visible={isModalPasswordEdit}
        onCancel={() => {
          setIsModalPasswordEdit(false), setPasswordEdit();
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
              handleOkEdit();
            }
          }}
        />

        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalPasswordEdit(false), setPasswordEdit();
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
            onClick={handleOkEdit}
            disabled={!passwordEdit}
          >
            ยืนยัน
          </Button>
        </Row>
        {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      </Modal>
    </>
  );
};

export default Setting_Spin;
