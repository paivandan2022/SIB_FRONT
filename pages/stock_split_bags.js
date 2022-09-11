import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { IoIosSwap } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import { internalIpV4 } from "internal-ip";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import { useEffect, useState } from "react";
import { Layout, Print_split } from "../components";

import api from "../lib/api";
const { Option } = Select;

const Stock_split_bags = ({ computerName }) => {
  const [opt_type, setOpt_type] = useState();
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [data_unit_no, setData_unit_no] = useState();
  const [data_show_tb, setData_show_tb] = useState();
  const [data_chk_split, setData_chk_split] = useState();

  const [frm_split_unit_no] = Form.useForm();
  const [frm_search_unit_no] = Form.useForm();

  const showModalPass = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  //------------------------------------//
  useEffect(async () => {
    await LoadType();
  }, []);
  //----------------------------------//
  
  const LoadType = async () => {
    const result = await api.get("/option_type");
    setOpt_type(result.data);
  };

  // -------------------------------------------------------------------------------

  const search_unit_split = async () => {
    const frmData = frm_search_unit_no.getFieldValue();
    console.log("-------->frmData", frmData);
    const results = await api.get(`/get_unit_no`, {
      params: {
        keyword: frmData.unit_no,
        keyword_type: frmData.bag_type_id,
      },
    });
    setdata_tb(frmData.unit_no);

    console.log("data---==>", results.data[0]);
    if (!results.data[0]) {
      Modal.error();
      frm_search_unit_no.setFieldsValue({
        hos_long_name_th: "",
        l_name: "",
        blood_value: "",
        group: "",
        donor_date: "",
        expiry_date: "",
      });
      setData_unit_no(results.data[0]);
    } else {
      setData_unit_no(results.data[0]);
      frm_search_unit_no.setFieldsValue({
        ...results.data[0],
        group: results.data[0]?.blood_group + results.data[0]?.blood_rh,
        bag_type_id: Number(results.data[0]?.blood_type),
      });
    }
  };

  const split = async () => {
    console.log("data_unit_no", data_unit_no);
    const results = await api.get(`/gen_unit_no`, {
      params: {
        keyword: data_unit_no?.blood_no,
      },
    });
    console.log("split", results.data[0]);
    setData_chk_split(results.data[0]);
    frm_split_unit_no.setFieldsValue({
      ...data_unit_no,
      unit_no: data_unit_no.blood_no + "-" + results.data[0][0].run_num,
      group: data_unit_no.blood_group + data_unit_no.blood_rh,
      bag_type_id: Number(data_unit_no.blood_type),
      donor_date: moment(data_unit_no.date_collect).add(543, "year"),
      expiry_date: moment(data_unit_no.date_exp).add(543, "year"),
    });
  };
  const save_split = async () => {
    const ip_init = await internalIpV4();
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff_name =
      resultLogin.data.pname +
      resultLogin.data.fname +
      " " +
      resultLogin.data.lname;
    try {
      if (resultLogin.data.id_user) {
        setIsModalPassword(false);
        setPassword();
        const frmData = frm_split_unit_no.getFieldValue();
        console.log("save_split", frmData);
        const results = await api.post(`/save_split_unit`, {
          ...frmData,
          date_collect: moment(frmData.donor_date)
            .add(-543, "year")
            .format("YYYY-MM-DD"),
          date_exp: moment(frmData.expiry_date)
            .add(-543, "year")
            .format("YYYY-MM-DD"),
          computer_name: computerName,
          staff_name: staff_name,
          ip: ip_init,
        });
        console.log("setData_show_tb", results.data);
        setdata_tb(frmData.blood_no);
        frm_split_unit_no.resetFields();
        setData_chk_split();
      } else {
        Modal.error({
          title: "Password invalid",
          content: "กรุณากรอกรหัสผ่านให้ถูกต้อง!!",
        });
      }
      setIsModalPassword(false);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "กรุณากรอกข้อมูลให้ครบถ้วน!!",
      });
    }
  };
  const setdata_tb = async (value) => {
    console.log("value--->>>", value);
    const results = await api.get(`/setdata_tb`, {
      params: { keyword: value },
    });
    console.log("results.data--->>>", results.data);

    setData_show_tb(results.data);
  };
  const refresh = () => {
    frm_search_unit_no.resetFields();
    frm_split_unit_no.resetFields();
    setData_unit_no();
    setData_chk_split();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "",
      key: "",
      align: "center",

      render: (text, record, index) => {
        return <b style={{ fontSize: "12px" }}>{index + 1}</b>;
      },
    },
    {
      title: "Unint No.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: 120,
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "Vol.",
      dataIndex: "blood_value",
      key: "blood_value",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "bl_status_name",
      key: "bl_status_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "EXP",
      dataIndex: "expiry_date_unit",
      key: "expiry_date_unit",
      align: "center",
      width: 100,
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      dataIndex: "id",
      align: "center",

      render: (text, record) => (
        <>
          <Print_split data={[record]} />
        </>
      ),
    },
  ];

  return (
    <>
      <Layout keyTab="stock_split_bags">
        <div>
          <Head>
            <title>SIBSOFT : แบ่งถุง</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Card    style={{
              marginTop: "20px",
            }}>
          <Row style={{ marginTop: "-10px" }}>
            <Col
              span={5}
              style={{
                border: "1px solid",
                padding: "15px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <Row justify="center" style={{ marginTop: -35 }}>
                <p
                  style={{
                    fontSize: "14px",
                    border: "1px solid",
                    borderRadius: "7px",
                    backgroundColor: "white",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  ข้อมูลเลือดที่ต้องการแบ่ง
                </p>
              </Row>
              <Form form={frm_search_unit_no} onFinish={search_unit_split}>
                <Form.Item
                  label="ประเภท"
                  name="bag_type_id"
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    marginTop: "-5px",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Select
                    size="small"
                    style={{
                      fontSize: "14px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    placeholder="ประเภท"
                  >
                    {opt_type?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.s_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="เลขที่ถุง"
                  name="unit_no"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "11px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="ผู้บริจาค"
                  name="hos_long_name_th"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "7px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="ประเภท"
                  name="l_name"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "11px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="ปริมาณ"
                  name="blood_value"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "30px",
                  }}
                >
                  <Input suffix="ml." size="small" />
                </Form.Item>
                <Form.Item
                  label="หมู่เลือด"
                  name="group"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "27px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="วันที่เจาะ"
                  name="donor_date"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "23px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="วันที่หมดอายุ"
                  name="expiry_date"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Row justify="end" style={{ marginTop: "40px" }}>
                  <Form.Item style={{ marginTop: "-15px", display: "none" }}>
                    <Button htmlType="submit">ค้นหา</Button>
                  </Form.Item>
                </Row>
              </Form>
            </Col>

            <Col span={2} style={{ marginTop: "20px" }}>
              <Row justify="center">
                <p style={{ marginTop: "70px" }}>
                  &nbsp;
                  <Button
                    style={{
                      fontSize: "12px",
                      height: "28px",
                    }}
                    icon={
                      <IoIosSwap
                        style={{
                          marginBottom: "-5px",
                          fontSize: "18px",
                        }}
                      />
                    }
                    onClick={split}
                    disabled={!data_unit_no ? true : false}
                  >
                    แบ่งถุง
                  </Button>
                  &nbsp;
                  <br />
                  <br />
                  &nbsp;
                  <Button
                    style={{
                      fontSize: "12px",
                      height: "28px",
                    }}
                    onClick={refresh}
                    type="primary"
                    danger
                    icon={
                      <MdRefresh
                        // className="icon-style"
                        style={{
                          marginBottom: "-3px",
                          fontSize: "16px",
                        }}
                      />
                    }
                    className="btn-refresh"
                  >
                    เริ่มใหม่
                  </Button>
                </p>
              </Row>
            </Col>

            <Col
              span={5}
              style={{
                border: "1px solid",
                padding: "15px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <Row justify="center" style={{ marginTop: -35 }}>
                <p
                  style={{
                    fontSize: "14px",
                    border: "1px solid",
                    borderRadius: "7px",
                    backgroundColor: "white",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  แบ่งถุงเลือด
                </p>
              </Row>
              <Form form={frm_split_unit_no}>
                <Row>
                  <Form.Item
                    label="เลขที่ถุง"
                    name="unit_no"
                    style={{ width: "100%", marginTop: "-5px" }}
                  >
                    <Input size="small" disabled />
                  </Form.Item>
                </Row>
                <Form.Item
                  label="ประเภท"
                  name="bag_type_id"
                  style={{ width: "100%", marginTop: "-25px" }}
                >
                  <Select
                    style={{
                      fontSize: "15px",
                      width: "100%",
                      textAlign: "center",
                    }}
                    size="small"
                    placeholder="ประเภท"
                  >
                    {opt_type?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.s_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="ผู้บริจาค"
                  name="hos_long_name_th"
                  style={{ width: "100%", marginTop: "-25px" }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="ประเภท"
                  name="l_name"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "3px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="ปริมาณ"
                  name="blood_value"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "30px",
                  }}
                >
                  <Input suffix="ml." size="small" />
                </Form.Item>
                <Form.Item
                  label="หมู่เลือด"
                  name="group"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "26px",
                  }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  label="วันที่เจาะ"
                  name="donor_date"
                  style={{
                    width: "100%",
                    marginTop: "-25px",
                    paddingLeft: "22px",
                  }}
                >
                  <DatePicker
                    size="small"
                    format="DD-MM-YYYY"
                    // size="large"
                    locale={th_TH}
                  />
                </Form.Item>
                <Form.Item
                  label="วันที่หมดอายุ"
                  name="expiry_date"
                  style={{ width: "100%", marginTop: "-25px" }}
                >
                  <DatePicker
                    size="small"
                    format="DD-MM-YYYY"
                    // size="large"
                    locale={th_TH}
                  />
                </Form.Item>
                <Row justify="end" style={{ marginTop: "-20px" }}>
                  <Button
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
                    type="primary"
                    disabled={!data_chk_split}
                    style={{
                      fontSize: "12px",
                      height: "28px",
                      backgroundColor: !data_chk_split ? "" : "#3AB0FF",
                      color: !data_chk_split ? "" : "white",
                    }}
                  >
                    บันทึกข้อมูล
                  </Button>
                </Row>
              </Form>
            </Col>

            <Col span={12} style={{ marginTop: "20px",paddingLeft:"10px" }}>
              <Table
                scroll={{ y: 365 }}
                // style={{ marginLeft: "-18px" }}
                pagination={false}
                columns={columns}
                dataSource={data_show_tb}
                size="small"
                style={{ width: "900px", border: "1px solid" }}
                className="xm"
              />
              <Row justify="end" style={{ marginTop: "15px" }}>
                {data_show_tb && <Print_split data={data_show_tb} />}
              </Row>
            </Col>
          </Row>
        </Card>
      </Layout>

      {/* /-----------------------/ */}
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
              save_split();
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
            onClick={save_split}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_split_bags;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
