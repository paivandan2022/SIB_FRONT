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
} from "antd";
import { CgClose, CgPlayListAdd } from "react-icons/cg";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";

import { VscSaveAs } from "react-icons/vsc";
import Layout from "../components/layout";

import api from "../lib/api";

const { Option } = Select;


const Setting_blood_type = () => {

  const [fetchdata, setFetchdata] = useState([]);
  const [fetchcomponentChoice, setFetchcomponentChoice] = useState([]);
  const [isModalAdd, setIsModalAdd] = useState(false);

  const [frmSetting_add] = Form.useForm();
  const [frmSetting] = Form.useForm();

  const fetch_data = async () => {
    const result = await api.get("/fetch_bloodtype");
    setFetchdata(result.data);
    console.log("fetch_bloodtype", result.data);
  };

  const fetch_component_choice = async () => {
    const result = await api.get("/fetch_component_choice");
    setFetchcomponentChoice(result.data);
    console.log("fetch_bloodtype", result.data);
  };

  const onClickRow = (record, rowIndex) => {
    console.log(record, rowIndex);
    frmSetting.setFieldsValue({
      l_name: record.l_name,
      s_name: record.s_name,
      date_expri: record.date_expri,
      display: record.display,
      active: record.active,
      auto_result: record.auto_result,
      component_type: Number(record.component_type),
      id: record.id,
    });
  };

  const update_set_bloodtype = async () => {
    const frmData = frmSetting.getFieldsValue();
    console.log("frmData", frmData);

    const result = await api.put("/update_set_bloodtype", {
      ...frmData,
    });

    fetch_data();
  };

  const Clear_value = () => {
    frmSetting.resetFields();
  };

  const mapColorStatus = {
    0: "#6c757d",
    1: "#28a745",
  };

  const showModalAdd = () => {
    setIsModalAdd(true);
  };

  const handleOkAdd = async () => {
    const frm = frmSetting_add.getFieldValue();

    console.log("frmAdd=>>", frm);

    try {
      const result = await api.put("/add_set_bloodtype", {
        ...frm,
      });

      console.log(result.data.message);
      if (result.data.message === "success") {
        Modal.success();
        fetch_data();
        setIsModalAdd(false);
      }
    } catch (error) {
      Modal.error();
      setIsModalAdd(false);
    }
  };

  const handleCancelAdd = () => {
    setIsModalAdd(false);
  };

  useEffect(async () => {
    await fetch_data();
    await fetch_component_choice();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 30,
      fixed: "left",
    },
    {
      title: "ชื่อเต็ม",
      dataIndex: "l_name",
      key: "l_name",
      align: "center",
      width: 130,
      fixed: "left",
    },
    {
      title: "ชื่อย่อ",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: 70,
      fixed: "left",
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "date_expri",
      key: "date_expri",
      align: "center",
      width: 90,
    },
    {
      title: "สถานะ",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 50,
      render: (text, record) => (
        <>
          {text === 0 ? (
            <Tag
              icon={<CgClose style={{ marginBottom: "-1px" }} />}
              color={mapColorStatus[record.active]}
            >
              &nbsp;{" "}
              <h style={{ fontSize: "10px" }}>{text === 0 ? "ปิด" : "เปิด"}</h>
            </Tag>
          ) : (
            <Tag
              icon={<MdOutlineCheck style={{ marginBottom: "-1px" }} />}
              color={mapColorStatus[record.active]}
            >
              &nbsp;
              <h style={{ fontSize: "10px" }}>{text === 0 ? "ปิด" : "เปิด"}</h>
            </Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="Setting_blood_type">
        <div>
          <Head>
            <title>SIBSOFT : ตั้งค่าประเภทเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Card style={{ marginTop: "15px", width: 800 }}>
            <Form form={frmSetting} layout="horizontal">
              <Row style={{ marginTop: "-15px" }}>
                <Col span={10} style={{ marginLeft: "28px" }}>
                  <Form.Item label="ชื่อเต็ม" name="l_name">
                    <Input style={{ fontSize: "12px", width: "200px" }} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label="ชื่อย่อ" name="s_name">
                    <Input style={{ fontSize: "12px", width: "150px" }} />
                  </Form.Item>
                </Col>
                <Col span={3} style={{ marginLeft: "65px" }}>
                  <Button
                    onClick={showModalAdd}
                    icon={
                      <CgPlayListAdd
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
                      backgroundColor: "#17a2b8",
                      color: "white",
                    }}
                  >
                    เพิ่มประเภทเลือด
                  </Button>
                </Col>
                {/* <Col span={5}>
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
                </Col> */}
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={5}>
                  <Form.Item label="วันหมดอายุ" name="date_expri">
                    <Input style={{ fontSize: "12px", width: "100px" }} />
                  </Form.Item>
                </Col>

                <Col span={7} style={{ marginLeft: "28px" }}>
                  <Form.Item label="Display" name="display">
                    <Input style={{ fontSize: "12px", width: "100px" }} />
                  </Form.Item>
                </Col>

                <Col span={5} style={{ marginLeft: "-40px" }}>
                  <Form.Item label="สถานะ" name="active">
                    <Select
                      style={{
                        fontSize: "12px",
                        width: "120px",
                        textAlign: "center",
                      }}
                    >
                      <Option value={1}>เปิด</Option>
                      <Option value={0}>ปิด</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px", marginLeft: "-10px" }}>
                <Form.Item
                  name="component_type"
                  label="ประเภทเลือด"
                  //   rules={[{ required: true }]}
                >
                  <Select style={{ fontSize: "12px", width: "150px" }}>
                    {fetchcomponentChoice?.map((item) => (
                      <Option
                        style={{ fontSize: "12px" }}
                        key={item.component_type}
                        value={item.component_type}
                      >
                        {item.component_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="separate_type"
                  label="Separate type"
                  style={{ marginLeft: "5px" }}
                  //   rules={[{ required: true }]}
                >
                  <Select disabled style={{ fontSize: "12px", width: "150px" }}>
                    <Option>test</Option>
                  </Select>
                </Form.Item>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Form.Item label="Auto Result" name="auto_result">
                  <Input style={{ fontSize: "12px", width: "120px" }} />
                </Form.Item>
                <Form.Item name="id">
                  <Input style={{ display: "none" }} />
                </Form.Item>
              </Row>

              <Row justify="end" style={{ marginTop: "-55px" }}>
                <Button
                  onClick={update_set_bloodtype}
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
            <Row justify="center" style={{ marginTop: "10px" }}>
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={fetchdata}
                  size="small"
                  className="xm"
                  bordered
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => onClickRow(record, rowIndex), // click row
                    };
                  }}
                ></Table>
              </Col>
            </Row>
          </Card>
        </Row>
      </Layout>

      <Modal
        visible={isModalAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={false}
        style={{ top: 50 }}
        width={650}
      >
        <>
          <Row justify="center">
            <Form form={frmSetting_add} layout="horizontal">
              <Row style={{ marginTop: "-15px" }}>
                <Col span={5} style={{ marginLeft: "8px" }}>
                  <Form.Item label="type code" name="type_code" required>
                    <Input style={{ fontSize: "12px", width: "80px" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={10} style={{ marginLeft: "28px" }}>
                  <Form.Item label="ชื่อเต็ม" name="l_name" required>
                    <Input style={{ fontSize: "12px", width: "200px" }} />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginLeft: "38px" }}>
                  <Form.Item label="ชื่อย่อ" name="s_name" required>
                    <Input style={{ fontSize: "12px", width: "150px" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px" }}>
                <Col span={5} style={{ marginLeft: "1px" }}>
                  <Form.Item label="วันหมดอายุ" name="date_expri" required>
                    <Input style={{ fontSize: "12px", width: "100px" }} />
                  </Form.Item>
                </Col>

                <Col span={7} style={{ marginLeft: "78px" }}>
                  <Form.Item label="Display" name="display" required>
                    <Input style={{ fontSize: "12px", width: "60px" }} />
                  </Form.Item>
                </Col>

                <Col span={5} style={{ marginLeft: "-28px" }}>
                  <Form.Item label="สถานะ" name="active" required>
                    <Select
                      style={{
                        fontSize: "12px",
                        width: "110px",
                        textAlign: "center",
                      }}
                    >
                      <Option value={1}>เปิด</Option>
                      <Option value={0}>ปิด</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: "-15px", marginLeft: "-9px" }}>
                <Form.Item name="component_type" label="ประเภทเลือด" required>
                  <Select style={{ fontSize: "12px", width: "150px" }}>
                    {fetchcomponentChoice?.map((item) => (
                      <Option
                        style={{ fontSize: "12px" }}
                        key={item.component_type}
                        value={item.component_type}
                      >
                        {item.component_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="separate_type"
                  label="Separate type"
                  style={{ marginLeft: "5px" }}
                  required
                >
                  <Select disabled style={{ fontSize: "12px", width: "150px" }}>
                    <Option>test</Option>
                  </Select>
                </Form.Item>
              </Row>

              <Row style={{ marginTop: "-15px", marginLeft: "-5px" }}>
                <Form.Item label="Auto Result" name="auto_result" required>
                  <Input style={{ fontSize: "12px", width: "150px" }} />
                </Form.Item>
              </Row>

              <Row justify="end" style={{ marginTop: "-35px" }}>
                <Button
                  onClick={handleOkAdd}
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
    </>
  );
};

export default Setting_blood_type;
