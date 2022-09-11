import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import {
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
  Table,
  Tabs,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { Layout } from "../components";
import api from "../lib/api";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;


const Stock_deposit_blood = () => {
  const [frmDepositBlood] = Form.useForm();


  const [depCommon, setDepCommon] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [password, setPassword] = useState();
  const [valueDep, setValueDep] = useState(1);
  const [dataBlood, setDataBlood] = useState();
  const [bloodtype, setBloodType] = useState();
  const [check, setCheck] = useState(false);
  const [dataDepositList, setDataDepositList] = useState([]);

  const Fetch_depositCommon = async () => {
    const result = await api.get("/fetch_deposit_common");
    setDepCommon(result.data[0]);
  };

  const Fetch_bloodtype = async () => {
    const result = await api.get("/blood_type");
    setBloodType(result.data);
  };

  const onChangedetail = (e) => {
    console.log("valueDep", e.target?.value);
    setValueDep(e.target?.value);
  };

  const showModalPass = () => {
    setIsModalPassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const Search = async () => {
    const frmData = frmDepositBlood.getFieldValue();
    console.log(frmData.blood_type);

    try {
      const resultDataBlood = await api.get("/data_blood", {
        params: { unit_no: frmData.unit_no, blood_type: frmData.blood_type },
      });

      if (resultDataBlood.data[0].length > 0) {
        setDataBlood(resultDataBlood.data[0][0]);
        // console.log("55***",resultDataBlood.data[0][0]);
      } else {
        Modal.warning({
          title: "เเจ้งเตือน !!",
          content: <div>ไม่พบข้อมูลถุงเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
          onOk() {
            frmDepositBlood.setFieldsValue({
              unit_no: null,
            });
            document.getElementById("unit_no").focus();
            setDataBlood();
          },
        });
      }
    } catch (error) {
      Modal.error({
        title: "เเจ้งเตือน !!",
        content: <div>ไม่พบข้อมูลถุงเลือดนี้ กรุณาตรวจสอบอีกครั้ง</div>,
        onOk() {
          frmDepositBlood.setFieldsValue({
            unit_no: null,
          });
          document.getElementById("unit_no").focus();
          setDataBlood();
        },
      });
    }
  };

  const addDeposit = async () => {
    const frmData = frmDepositBlood.getFieldValue();
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    const staff = resultLogin.data.user_name;
    setIsModalPassword(false);
    setPassword();

    let data_end;
    if (
      frmData.dep_datetime_end == undefined ||
      frmData.dep_datetime_end == null
    ) {
      data_end = moment().format("YYYY-MM-DD");
    } else {
      data_end = moment(frmData.dep_datetime_end).format("YYYY-MM-DD");
    }

    try {
      const resultAdd = await api.post(`/add_deposit_blood`, {
        dep_comm_id: valueDep,
        dep_note: frmData.dep_note,
        bl_id: dataBlood.bl_id,
        xm_id: dataBlood.xm_id,
        hn: dataBlood.hn,
        dep_datetime_end: data_end,
        staff: staff,
      });

      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const idOK = document.getElementById("ok");
          if (idOK) {
            idOK.click();
            window.removeEventListener("keydown", handleKeyDown);
          }
        }
      };
      const closeModal = () => {
        Modal.success({
          title: "Successful",
          content: "บันทึกข้อมูลการจ่ายเลือดสำเร็จ",
          onCancel: (close) => {
            close();
          },
          onOk: (close) => {
            close();
            document.getElementById("unit_no").focus();
            setValueDep(1);
            setDataBlood();
            setCheck(false);
          },
          okButtonProps: { id: "ok" },
        });
      };

      if (resultAdd.data.message === "success") {
        closeModal();
        window.addEventListener("keydown", handleKeyDown);
        frmDepositBlood.setFieldsValue({
          unit_no: null,
          dep_note: null,
          dep_datetime_end: moment(),
          dep_comm_id: 1,
        });
      }
    } catch (error) {
      Modal.error({
        title: "เเจ้งเตือน !!",
        content: "ไม่สามารถบันทึกข้อมูลการจ่ายเลือดได้",
      });
    }
  };

  const columnsDepositList = [
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
      title: "Unit No.",
      dataIndex: "unit_no_dot",
      key: "unit_no_dot",
      align: "center",
      width: "10%",
    },
    {
      title: "เลขที่ใบขอเลือด",
      dataIndex: "order_number",
      key: "order_number",
      align: "center",
      width: "10%",
    },
    {
      title: "Gr.",
      dataIndex: "Gr",
      key: "Gr",
      align: "center",
      width: "6%",
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "8%",
    },
    {
      title: "รายการฝาก",
      dataIndex: "dep_comm_name",
      key: "dep_comm_name",
      align: "center",
      width: "12%",
    },
    {
      title: "วันที่ฝาก",
      dataIndex: "deposit_date",
      key: "deposit_date",
      align: "center",
      width: "8%",
    },
    {
      title: "ฝากถึงวันที่",
      dataIndex: "dep_datetime_end",
      key: "dep_datetime_end",
      align: "center",
      width: "8%",
    },
    {
      title: "Note",
      dataIndex: "dep_note",
      key: "dep_note",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return <h>{record.dep_note == "undefined" ? "" : record.dep_note}</h>;
      },
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "dep_staff",
      key: "dep_staff",
      align: "center",
      width: "8%",
      render: (text, record) => {
        return <h>{record.dep_staff == "undefined" ? "" : record.dep_staff}</h>;
      },
    },
    {
      title: "สถานะ",
      dataIndex: "bl_status_name",
      key: "bl_status_name",
      align: "center",
      width: "8%",
    },
  ];

  const clearSearch = () => {
    setDataDepositList([]);
    frmDepositBlood.resetFields();
  };

  const SearchHisDeposit = async () => {
    const frmData = frmDepositBlood.getFieldValue();
    console.log("femSearch", frmData);

    const params = {
      unit_no_search: frmData.unit_no_search,
      date_start: moment(frmData.date_Search[0]).subtract(543, "years").format("YYYY-MM-DD"),
      date_last: moment(frmData.date_Search[1]).subtract(543, "years").format("YYYY-MM-DD"),
    };
    delete params.date_Search;

    try {
      const resultHisDeposit = await api.get("/search_his_deposit", { params });
      console.log(resultHisDeposit.data);
      if (resultHisDeposit.data.length < 1) {
        Modal.warning({
          title: "แจ้งเตือน !!",
          content: <div>ไม่พบข้อมูล กรุณาตรวจสอบข้อมูลอีกครั้ง</div>,
          onOk() {
            clearSearch();
          },
        });
      } else {
        setDataDepositList(resultHisDeposit.data);
      }
    } catch (error) {}
  };

 
  useEffect(async () => {
    await Fetch_depositCommon();
    await Fetch_bloodtype();
  }, []);

  return (
    <>
      <Layout keyTab="stock_deposit_blood">
        <div>
          <Head>
            <title>SIBSOFT : ฝากเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Form
          form={frmDepositBlood}
          initialValues={{
            date_Search: [moment().add(543, "year"), moment().add(543, "year")],
          }}
        >
          <Row style={{ padding: "10px" }}>
            <Col span={22} offset={1}>
              <Card>
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane tab="ฝากเลือด" key="1">
                    <Row>
                      <Col span={5} offset={1}>
                        <Form.Item
                          label="ประเภทเลือด"
                          name="blood_type"
                          style={{ paddingRight: "10px", marginLeft: "15px" }}
                        >
                          <Select
                            onChange={() => {
                              document.getElementById("unit_no").focus();
                            }}
                            placeholder="ประเภทเลือด"
                            size="small"
                            style={{
                              width: "100%",
                              fontSize: "12px",
                            }}
                          >
                            {bloodtype?.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.s_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="unit_no" label="เลขที่ถุงเลือด">
                          <Input
                            //   maxLength={8}
                            id="unit_no"
                            onPressEnter={Search}
                            placeholder="เลขที่ถุงเลือด"
                            style={{
                              width: "100%",
                              height: "28px",
                              fontSize: "12px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row justify="center" style={{ marginTop: "-10px" }}>
                      <Col
                        span={7}
                        style={{
                          border: "1px solid ",

                          //   border: "1px solid #C4DDFF",
                          padding: "10px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          height: "200px",
                        }}
                      >
                        <Row justify="start" style={{ marginTop: -22 }}>
                          <p
                            style={{
                              fontSize: "14px",
                              //   border: "1px solid",
                              //   borderRadius: "6px",
                              backgroundColor: "white",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            }}
                          >
                            ข้อมูลถุงเลือด
                          </p>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              Unit no :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.unit_no_dot}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              ผู้บริจาค :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.fullname_donor}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={8}>
                            <p style={{ fontSize: "13px" }}>
                              ประเภท :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.component_name}
                              </b>
                            </p>
                          </Col>
                          <Col span={8}>
                            <p style={{ fontSize: "13px" }}>
                              Volume :&nbsp;{" "}
                              <b style={{ color: "blue" }}>
                                {" "}
                                {dataBlood?.blood_value === null
                                  ? "0"
                                  : dataBlood?.blood_value}
                              </b>
                              &nbsp;ml
                            </p>
                          </Col>
                          <Col span={8}>
                            <p style={{ fontSize: "13px" }}>
                              หมู่เลือด :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.GrBlood}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              วันที่รับ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.receive_date}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              วันที่เจาะ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.punct_date}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              วันหมดอายุ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.expiry_date}
                              </b>
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        span={7}
                        style={{
                          border: "1px solid ",

                          //   border: "1px solid #C4DDFF",
                          padding: "10px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          height: "200px",
                        }}
                      >
                        <Row justify="start" style={{ marginTop: -22 }}>
                          <p
                            style={{
                              fontSize: "14px",
                              //   border: "1px solid",
                              //   borderRadius: "6px",
                              backgroundColor: "white",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            }}
                          >
                            ข้อมูล Patient
                          </p>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              เลขที่ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.order_number}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              HN :&nbsp;
                              <b style={{ color: "blue" }}>{dataBlood?.hn}</b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              ชื่อ - นามสกุล :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.fullname}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={6}>
                            <p style={{ fontSize: "13px" }}>
                              เพศ :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.sex == 1
                                  ? "ชาย"
                                  : dataBlood?.sex == 2
                                  ? "หญิง"
                                  : ""}
                              </b>
                            </p>
                          </Col>
                          <Col span={12}>
                            <p style={{ fontSize: "13px" }}>
                              อายุ :&nbsp;
                              <b style={{ color: "blue" }}>{dataBlood?.age}</b>
                              &nbsp;ปี
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontSize: "13px" }}>
                              หมู่เลือด :&nbsp;
                              <b style={{ color: "blue" }}>{dataBlood?.Gr}</b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={16}>
                            <p style={{ fontSize: "13px" }}>
                              Ward :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.name_ward}
                              </b>
                            </p>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-10px" }}>
                          <Col span={24}>
                            <p style={{ fontSize: "13px" }}>
                              วันที่ใช้เลือด :&nbsp;
                              <b style={{ color: "blue" }}>
                                {dataBlood?.use_date}
                              </b>
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col
                        span={7}
                        style={{
                          // border: "1px solid #C4DDFF",
                          borderRadius: "5px",
                          border: "1px solid ",
                          padding: "10px",
                          height: "200px",
                        }}
                      >
                        <Row justify="start" style={{ marginTop: -22 }}>
                          <p
                            style={{
                              fontSize: "14px",
                              //   border: "1px solid",
                              //   borderRadius: "6px",
                              backgroundColor: "white",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            }}
                          >
                            ข้อมูลการฝากเลือด
                          </p>
                        </Row>

                        <Row>
                          <Col span={24}>
                            <Form.Item
                              name="dep_comm_id"
                              rules={[{ required: true }]}
                              style={{
                                marginTop: "-10px",
                                marginLeft: "14px",
                                fontSize: "12px",
                              }}
                              initialValue={valueDep}
                            >
                              <Radio.Group
                                onChange={onChangedetail}
                                value={valueDep}
                              >
                                {depCommon?.map((item) => (
                                  <>
                                    <Radio
                                      checked={check}
                                      key={item.dep_comm_id}
                                      value={item.dep_comm_id}
                                    >
                                      {item.dep_comm_name}
                                    </Radio>
                                    <br />
                                  </>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "-22px" }}>
                          <Col span={15}>
                            <Form.Item
                              name="dep_datetime_end"
                              label="ฝากถึงวันที่"
                            >
                              <DatePicker
                                size="small"
                                style={{ width: "100%" }}
                                defaultValue={moment()}
                                format="DD-MM-YYYY"
                                locale={th_TH}
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row>
                          <Col span={24} style={{ marginTop: "-22px" }}>
                            <Form.Item
                              name="dep_note"
                              label="Note"
                              style={{ marginLeft: "34px" }}
                            >
                              <TextArea rows={2}></TextArea>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row justify="end" style={{ marginTop: "10px" }}>
                      <Button
                        disabled={!(valueDep && dataBlood)}
                        type="primary"
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
                          marginLeft: "5px",
                          backgroundColor: !(valueDep && dataBlood)
                            ? ""
                            : "#3AB0FF",
                          color: !(valueDep && dataBlood) ? "" : "white",
                        }}
                        size="small"
                      >
                        บันทึกข้อมูล
                      </Button>
                    </Row>
                  </TabPane>

                  <TabPane tab="รายการฝากเลือด" key="2">
                    <Row justify="center">
                      <Col span={6}>
                        <Form.Item name="date_Search" label="วันที่ฝาก">
                          <RangePicker
                          
                            placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={5} style={{ marginLeft: "3px" }}>
                        <Form.Item
                        label="เลขที่ถุงเลือด"
                          name="unit_no_search"
                          style={{ paddingRight: "12px" }}
                        >
                          <Input
                            onPressEnter={SearchHisDeposit}
                            placeholder="เลขที่ถุงเลือด"
                            style={{
                              width: "100%",

                              fontSize: "14px",
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={2}>
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
                          onClick={SearchHisDeposit}
                        >
                          ค้นหา
                        </Button>
                      </Col>

                      <Col span={2}>
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
                          onClick={clearSearch}
                        >
                          เริ่มใหม่
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <Table
                          bordered
                          className="xm"
                          size="small"
                          dataSource={dataDepositList}
                          columns={columnsDepositList}
                        ></Table>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Form>
      </Layout>

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
              addDeposit();
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
            onClick={addDeposit}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_deposit_blood;
