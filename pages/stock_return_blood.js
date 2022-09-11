import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import React, { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { Layout } from "../components";
import api from "../lib/api";

let index = 0;

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Stock_return_blood = ({ computerName }) => {
  const [items, setItems] = useState();
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const [items_2, setItems_2] = useState();
  const [name_2, setName_2] = useState("");
  const inputRef_2 = useRef(null);

  const [opt_type, setOpt_type] = useState();
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [bag_condition, setCheckbag_condition] = useState();
  const [bag_temp, setCheckbag_temp] = useState();

  const [data_show, setData_show] = useState([]);
  const [data_table, setData_table] = useState();

  const [frm_save_reverse] = Form.useForm();
  const [frm_search_unit_no] = Form.useForm();
  const [frm_search_his] = Form.useForm();

  const onNameChange = (event) => {
    setName(event.target.value);
    console.log("ssssss--->", event.target.value);
  };

  const addItem = async (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    console.log("eeeee---name", name);
    const result = await api.put(`Add_blood_reverse_condition`, {
      condition: name,
    });
    console.log("result---name", result.data);
    await Load_get_blood_reverse_condition();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onNameChange_2 = (event) => {
    setName_2(event.target.value);
    console.log("ssssss--->", event.target.value);
  };

  const addItem_2 = async (e) => {
    e.preventDefault();
    setItems_2([...items_2, name_2 || `New item ${index++}`]);
    setName_2("");
    console.log("eeeee---name", name_2);
    const result = await api.put(`Add_blood_reverse_choice`, {
      choice: name_2,
    });
    console.log("result---name22", result.data);
    await Load_get_blood_reverse_choice();
    setTimeout(() => {
      inputRef_2.current?.focus();
    }, 0);
  };

  //------------------------------------//
  useEffect(async () => {
    await LoadType();
    await Load_get_blood_reverse_condition();
    await Load_get_blood_reverse_choice();
  }, []);
  //----------------------------------//
  const LoadType = async () => {
    const result = await api.get("/option_type");
    setOpt_type(result.data);
  };
  const Load_get_blood_reverse_condition = async () => {
    const result = await api.get("/get_blood_reverse_condition");

    setItems(result.data);
  };
  const Load_get_blood_reverse_choice = async () => {
    const result = await api.get("/get_blood_reverse_choice");

    setItems_2(result.data);
  };

  const onChange = (key) => {
    // console.log(key);
    if (key === "1") {
      // console.log("1");
    }
    if (key === "2") {
      // console.log("2");
    }
  };
  const Fetch_data = async (value) => {
    console.log("val", value);
    const result = await api.get(`/search_blood_retrun`, {
      params: {
        keyword: value.unit_no,
        keyword_type: value.bag_type_id,
      },
    });
    if (result.data == "") {
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
    setData_show(result.data);
    console.log("result", result.data);
  };
  const showModalPass = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };
  const save_reverse = async () => {
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
        const frmData = frm_save_reverse.getFieldsValue();
        console.log("frm............", frmData);
        setIsModalPassword(false);
        setPassword();
        const result = await api.put(`/blood_reverse`, {
          bag_temp: frmData.bag_temp,
          bag_condition: frmData.bag_condition,
          staff_name: staff_name,
          blood_no: data_show[0]?.blood_no,
          order_number: data_show[0]?.order_number,
          bl_id: data_show[0]?.bl_id,
          xm_id: data_show[0]?.xm_id,
          xm_type: data_show[0]?.xm_type,
        });
        if (result.data.message === "success") {
          Modal.success({
            title: "แจ้งเตือน",
            content: "ทำรายการสำเร็จ!!",
          });
          frm_search_unit_no.resetFields();
          frm_save_reverse.resetFields();
          setData_show("");
        }
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
  //-------------------------------------------

  const SaerchHis = async () => {
    const frmData = frm_search_his.getFieldValue();
    try {
      const params = {
        date_start: moment(frmData.date_Search[0])
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_end: moment(frmData.date_Search[1])
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        unit_no_search: frmData.unit_no_search,
      };
      delete params.date_Search;
      // console.log("params", params);
      await Fetch_his_list(params);
    } catch (error) {
      Modal.error({ title: "แจ้งเตือน", content: "กรุณาเลือกช่วงเวลา !!!" });
    }
  };
  const Fetch_his_list = async (params) => {
    console.log("=====>", params);
    const result = await api.get("/search_his_reverse", { params });
    console.log("ราย...........", result.data);
    setData_table(result.data);
    if (result.data == "") {
      Modal.warning({
        title: "แจ้งเตือน !!",
        content: "ไม่พบข้อมูล...",
      });
    }
  };
  const clearSearch = () => {
    setData_table([]);
    frm_search_his.resetFields();
  };
  // -------------------------------------------------------------------------------
  const columnsHis = [
    {
      title: "#",
      dataIndex: "No",
      key: "no",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "เลขที่ขอเลือด",
      dataIndex: "order_number",
      key: "order_number",
      align: "center",
      width: "10%",
    },
    {
      title: "unit_no",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "10%",
    },
    {
      title: "Gr.",
      dataIndex: "full_group",
      key: "full_group",
      align: "center",
      width: "6%",
    },
    {
      title: "Type",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "8%",
    },
    {
      title: "สถานะ",
      dataIndex: "status_name",
      key: "status_name",
      align: "center",
      width: "8%",
    },
    {
      title: "วันที่คืน",
      dataIndex: "reverse_date",
      key: "reverse_date",
      align: "center",
      width: "12%",
    },
    {
      title: "bag_temp",
      dataIndex: "bag_temp",
      key: "bag_temp",
      align: "center",
      width: "8%",
    },
    {
      title: "bag_condition",
      dataIndex: "bag_condition",
      key: "bag_condition",
      align: "center",
      width: "8%",
    },
    {
      title: "detail",
      dataIndex: "detail",
      key: "detail",
      align: "center",
      width: "10%",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "save_name",
      key: "save_name",
      align: "center",
      width: "12%",
    },
  ];
  return (
    <>
      <Layout keyTab="stock_return_blood">
        <div>
          <Head>
            <title>SIBSOFT : คืนเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={23}>
            <Card>
              <Tabs onChange={onChange} type="card" style={{ marginTop: -20 }}>
                <TabPane tab="คืนถุงเลือด" key="1">
                  <Row style={{ marginTop: "15px" }}>
                    <Col span={12}>
                      <Form
                        form={frm_search_unit_no}
                        onFinish={Fetch_data}
                        layout="horizontal"
                      >
                        <Row>
                          <Col span={6}>
                            <Form.Item
                              label="ประเภท"
                              name="bag_type_id"
                              style={{ width: "100%", marginTop: "-15px" }}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "",
                              //   },
                              // ]}
                            >
                              <Select
                                style={{
                                  fontSize: "15px",
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
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label="เลขที่ถุง"
                              name="unit_no"
                              style={{
                                width: "100%",
                                marginTop: "-15px",
                                paddingLeft: "11px",
                              }}
                            >
                              <Input
                                style={{
                                  fontSize: "16px",
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              style={{
                                display: "block",
                                marginTop: "-13px",
                                paddingLeft: "11px",
                              }}
                            >
                              <Button
                                htmlType="submit"
                                style={{
                                  fontSize: "12px",
                                  height: "32px",
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
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                    <Col span={12}></Col>
                  </Row>
                  <Form form={frm_save_reverse}>
                    <Row style={{ marginTop: -15 }}>
                      <p
                        style={{
                          fontSize: "14px",
                          border: "1px solid",
                          borderRadius: "5px",
                          backgroundColor: "white",
                          paddingLeft: "9px",
                          paddingRight: "9px",
                          marginLeft: "10px",
                        }}
                      >
                        ข้อมูลถุงเลือด
                      </p>
                    </Row>
                    <Row
                      style={{
                        border: "1px solid",
                        borderRadius: "5px",
                        marginTop: -20,
                      }}
                    >
                      <Col span={5} style={{ marginTop: 10, marginLeft: 10 }}>
                        <Form.Item label="Unit No." style={{ color: "blue" }}>
                          {data_show[0]?.blood_no}
                        </Form.Item>
                        <Form.Item
                          label="วันที่เจาะ"
                          style={{ marginTop: -25, color: "blue" }}
                        >
                          {data_show[0]?.donor_date}
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ marginTop: 10 }}>
                        <Form.Item label="ประเภท" style={{ color: "blue" }}>
                          {data_show[0]?.s_name}
                        </Form.Item>
                        <Form.Item
                          label="วันหมดอายุ"
                          style={{ marginTop: -25, color: "blue" }}
                        >
                          {data_show[0]?.date_exp}
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ marginTop: 10 }}>
                        <Form.Item label="หมู่เลือด" style={{ color: "blue" }}>
                          {data_show[0]?.blood_group}
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ marginTop: 10 }}>
                        <Form.Item label="ปริมาณ" style={{ color: "blue" }}>
                          {data_show[0]?.blood_value}
                          <p
                            style={{
                              color: data_show[0]?.blood_value
                                ? "blue"
                                : "black",
                              marginTop: "5px",
                            }}
                          >
                            ml.{" "}
                          </p>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row style={{ margin: 10 }}>
                      <p
                        style={{
                          fontSize: "14px",
                          border: "1px solid",
                          borderRadius: "5px",
                          backgroundColor: "white",
                          paddingLeft: "9px",
                          paddingRight: "9px",
                          marginLeft: "10px",
                        }}
                      >
                        ข้อมูลผู้รับ
                      </p>
                    </Row>
                    <Row
                      style={{
                        border: "1px solid",
                        borderRadius: "5px",
                        marginTop: -30,
                      }}
                    >
                      <Col span={24}>
                        <Row>
                          <Col
                            span={6}
                            style={{ marginTop: 10, marginLeft: 10 }}
                          >
                            <Form.Item label="BB No." style={{ color: "blue" }}>
                              {data_show[0]?.order_number}
                            </Form.Item>
                            <Form.Item
                              label="HN"
                              style={{ marginTop: -28, color: "blue" }}
                            >
                              {data_show[0]?.hn}
                            </Form.Item>
                            <Form.Item
                              label="ว.ด.ป. เกิด"
                              style={{ marginTop: -28, color: "blue" }}
                            >
                              {data_show[0]?.patient_birthday}
                            </Form.Item>
                            <Form.Item
                              label="Ward"
                              style={{ marginTop: -28, color: "blue" }}
                            >
                              {data_show[0]?.ward_name}
                            </Form.Item>
                          </Col>
                          <Col span={6} style={{ marginTop: 10 }}>
                            <Form.Item
                              label="ชื่อ - นามสกุล"
                              style={{ color: "blue" }}
                            >
                              {data_show[0]?.patientname}
                            </Form.Item>
                            <Form.Item
                              label="อายุ"
                              style={{ marginTop: -28, color: "blue" }}
                            >
                              {data_show[0]?.patient_age}
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item label="เพศ" style={{ color: "blue" }}>
                              {data_show[0]?.patient_sex}
                            </Form.Item>
                            <Form.Item
                              label="หมู่เลือด"
                              style={{ marginTop: -28, color: "blue" }}
                            >
                              {data_show[0]?.patient_gr}
                              {data_show[0]?.patient_rh}
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: -25 }}>
                          <Col span={6} style={{ marginLeft: 10 }}>
                            <Form.Item
                              label="วันที่ขอเลือด"
                              style={{ color: "blue" }}
                            >
                              {data_show[0]?.request_time}
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              label="วันที่ใช้เลือด"
                              style={{ color: "blue" }}
                            >
                              {data_show[0]?.use_time}
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: 10 }}>
                      <p
                        style={{
                          fontSize: "14px",
                          border: "1px solid",
                          borderRadius: "5px",
                          backgroundColor: "white",
                          paddingLeft: "9px",
                          paddingRight: "9px",
                          marginLeft: "10px",
                        }}
                      >
                        ข้อมูลการรับถุงเลือด
                      </p>
                    </Row>
                    <Row
                      style={{
                        border: "1px solid",
                        borderRadius: "5px",
                        marginTop: -20,
                      }}
                    >
                      <Form.Item
                        name="bag_temp"
                        label="อุณหภูมิ"
                        style={{ marginLeft: 30, marginTop: 15 }}
                      >
                        <Input
                          maxLength="2"
                          onChange={(e) => setCheckbag_temp(e.target.value)}
                          suffix="องศา"
                        />
                      </Form.Item>
                      &nbsp;
                      <Form.Item
                        name="bag_condition"
                        label="สภาพถุงเลือดที่มา"
                        style={{ marginTop: 15 }}
                      >
                        <Select
                          style={{
                            width: 300,
                          }}
                          onChange={(e) => setCheckbag_condition(e)}
                          placeholder="สภาพถุงเลือดที่มา"
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider
                                style={{
                                  margin: "8px 0",
                                }}
                              />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                }}
                              >
                                <Input
                                  placeholder="Please enter item"
                                  ref={inputRef}
                                  value={name}
                                  onChange={onNameChange}
                                />
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={addItem}
                                >
                                  Add item
                                </Button>
                              </Space>
                            </>
                          )}
                        >
                          {items?.map((item) => (
                            <Option key={item.bc_id} value={item.bc_name}>
                              {item.bc_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      &nbsp;
                      <Form.Item>
                        <Button
                          type="primary"
                          style={{
                            fontSize: "12px",
                            height: "28px",
                            backgroundColor:
                              data_show[0]?.length > 0 ? "#3AB0FF" : "",
                            color: data_show[0]?.length > 0 ? "white" : "",
                            marginTop: 17,
                          }}
                          disabled={
                            !(bag_temp && bag_condition && data_show[0])
                              ? true
                              : false
                          }
                          icon={
                            <VscSaveAs
                              style={{
                                fontSize: "14px",
                                marginRight: "3px",
                                marginBottom: "-2px",
                              }}
                            />
                          }
                          onClick={showModalPass}
                        >
                          บันทึกข้อมูล
                        </Button>
                      </Form.Item>
                    </Row>
                  </Form>
                </TabPane>

                <TabPane tab="ประวัติการคืนถุงเลือด" key="2">
                  <Form
                    form={frm_search_his}
                    initialValues={{
                      date_Search: [
                        moment().add(543, "year"),
                        moment().add(543, "year"),
                      ],
                    }}
                  >
                    <Row justify="center" style={{ marginTop: -10 }}>
                      <Form.Item label="วันที่" name="date_Search">
                        <RangePicker
                          placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                          format="DD-MM-YYYY"
                          locale={th_TH}
                        />
                      </Form.Item>
                      <Form.Item
                        label="เลขที่ถุงเลือด"
                        name="unit_no_search"
                        style={{ marginLeft: "7px" }}
                      >
                        <Input
                          onPressEnter={SaerchHis}
                          placeholder="เลขที่ถุงเลือด"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        />
                      </Form.Item>

                      <Button
                        style={{
                          fontSize: "12px",
                          height: "32px",
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
                        onClick={SaerchHis}
                      >
                        ค้นหา
                      </Button>

                      <Button
                        style={{
                          fontSize: "12px",
                          height: "32px",
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
                        onClick={clearSearch}
                      >
                        เริ่มใหม่
                      </Button>
                    </Row>
                  </Form>

                  <Row style={{ marginTop: -15 }}>
                    <Col span={24}>
                      <Table
                        className="xm"
                        bordered
                        columns={columnsHis}
                        dataSource={data_table}
                        pagination={{
                          hideOnSinglePage: true,
                          showSizeChanger: false,
                          pageSize: 15,
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

      <Modal
        visible={isModalPassword}
        onOk={save_reverse}
        onCancel={() => {
          setIsModalPassword(false), setPassword();
        }}
        footer={false}
        width={250}
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
              save_reverse();
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
            onClick={save_reverse}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_return_blood;

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
