import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Switch } from "antd";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import Layout from "../components/layout";
import api from "../lib/api";

const Setting_Inf = () => {
  const [frmSetting_Inf] = Form.useForm();

  const [result_inf, setResult_inf] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState();

  const showModal = async () => {
    setIsModalVisible(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const fecth_inf = async () => {
    const result = await api.get("/Check_inf");
    setResult_inf(result.data[0]);

    console.log("fecth_inf", result.data[0]);
    frmSetting_Inf.setFieldsValue({
      // Saline: true,
      // Papian: true,
      Saline: result.data[0]?.Saline === "1" ? true : false,
      Papian: result.data[0]?.Papian === "1" ? true : false,
      Coombs: result.data[0]?.Coombs === "1" ? true : false,
      AntiA: result.data[0]?.AntiA === "1" ? true : false,
      AntiB: result.data[0]?.AntiB === "1" ? true : false,
      TPHA: result.data[0]?.TPHA === "1" ? true : false,
      HBsAg: result.data[0]?.HBsAg === "1" ? true : false,
      HIV: result.data[0]?.HIV === "1" ? true : false,
      HBV_NAT: result.data[0]?.HBVNAT === "1" ? true : false,
      HCV_NAT: result.data[0]?.HCVNAT === "1" ? true : false,
      HIV_NAT: result.data[0]?.HIVNAT === "1" ? true : false,
      ALT: result.data[0]?.ALT === "1" ? true : false,
      HCV: result.data[0]?.HCV === "1" ? true : false,
      HIVAg: result.data[0]?.HIVAg === "1" ? true : false,
    });
  };
  useEffect(async () => {
    await fecth_inf();
  }, []);

  const Ok = async (value) => {
    const frmData = frmSetting_Inf.getFieldsValue();
    const Saline = frmData.Saline;
    const Papian = frmData.Papian;
    const Coombs = frmData.Coombs;
    const AntiA = frmData.AntiA;
    const AntiB = frmData.AntiB;
    const TPHA = frmData.TPHA;
    const HBsAg = frmData.HBsAg;
    const HIV = frmData.HIV;
    const HBV_NAT = frmData.HBV_NAT;
    const HCV_NAT = frmData.HCV_NAT;
    const HIV_NAT = frmData.HIV_NAT;
    const ALT = frmData.ALT;
    const HCV = frmData.HCV;
    const HIVAg = frmData.HIVAg;
    ///-----------------------//
    if (Saline === true) {
      Saline = "1";
    } else {
      Saline = "0";
    }
    if (Papian === true) {
      Papian = "1";
    } else {
      Papian = "0";
    }
    if (Coombs === true) {
      Coombs = "1";
    } else {
      Coombs = "0";
    }
    if (AntiA === true) {
      AntiA = "1";
    } else {
      AntiA = "0";
    }
    if (AntiB === true) {
      AntiB = "1";
    } else {
      AntiB = "0";
    }
    if (TPHA === true) {
      TPHA = "1";
    } else {
      TPHA = "0";
    }
    if (HBsAg === true) {
      HBsAg = "1";
    } else {
      HBsAg = "0";
    }
    if (HIV === true) {
      HIV = "1";
    } else {
      HIV = "0";
    }
    if (HBV_NAT === true) {
      HBV_NAT = "1";
    } else {
      HBV_NAT = "0";
    }
    if (HCV_NAT === true) {
      HCV_NAT = "1";
    } else {
      HCV_NAT = "0";
    }
    if (HIV_NAT === true) {
      HIV_NAT = "1";
    } else {
      HIV_NAT = "0";
    }
    if (ALT === true) {
      ALT = "1";
    } else {
      ALT = "0";
    }
    if (HCV === true) {
      HCV = "1";
    } else {
      HCV = "0";
    }
    if (HIVAg === true) {
      HIVAg = "1";
    } else {
      HIVAg = "0";
    }
    const result = await api.put("/setting_inf", {
      Saline: Saline,
      Papian: Papian,
      Coombs: Coombs,
      AntiA: AntiA,
      AntiB: AntiB,
      TPHA: TPHA,
      HBsAg: HBsAg,
      HIV: HIV,
      HBV_NAT: HBV_NAT,
      HCV_NAT: HCV_NAT,
      HIV_NAT: HIV_NAT,
      ALT: ALT,
      HCV: HCV,
      HIVAg: HIVAg,
    });
    fecth_inf();
    setIsModalVisible(false);
    setPassword();
  };

  return (
    <>
      <Layout keyTab="Setting_Inf">
        <div>
          <Head>
            <title>SIBSOFT : ตั้งค่าลงผลตรวจอัตโนมัติ</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center"  style={{ marginTop: " 20px", }}>
          <Card
            title="Setting Auto Result Imports Inf"
            style={{ width: 600, height: "100%" }}
          >
            <Form
              form={frmSetting_Inf}
              layout="horizontal"
              // onFinish={onSearch}
              // set เป็นวันปัจจุบัน
              //   //initialValues={{
              //     date_Search: [moment(), moment()],
              //   }}
            >
              <Row justify="center">
                <Col span={10} offset={1}>
                  <Form.Item
                    name="Saline"
                    label="Saline"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "12px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="Papian"
                    label="Papian"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "10px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="Coombs"
                    label="Coombs"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="AntiA"
                    label="AntiA"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>

                  <Form.Item
                    name="AntiB"
                    label="AntiB"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="TPHA"
                    label="TPHA"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "16px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HBsAg"
                    label="HBsAg"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "12px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                </Col>
                <Col span={10} offset={1}>
                  <Form.Item
                    name="HIV"
                    label="HIV"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HBV_NAT"
                    label="HBV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HCV_NAT"
                    label="HCV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HIV_NAT"
                    label="HIV NAT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "5px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="ALT"
                    label="ALT"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HCV"
                    label="HCV"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "32px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                  <Form.Item
                    name="HIVAg"
                    label="HIVAg"
                    valuePropName="checked"
                    style={{ marginTop: "-20px", marginLeft: "22px" }}
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="UnActive"
                    />
                  </Form.Item>
                </Col>
                <br />
              </Row>
              <Row justify="center" style={{ marginTop: "-15px" }}>
                <Button
                  onClick={showModal}
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
          </Card>
        </Row>
      </Layout>
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
              Ok();
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
            onClick={Ok}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
        {/* <Input value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      </Modal>
    </>
  );
};

export default Setting_Inf;
