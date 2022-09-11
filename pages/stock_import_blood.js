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
  TimePicker,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import { internalIpV4 } from "internal-ip";
import JsBarcode from "jsbarcode";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBarcodeReader } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import Layout from "../components/layout";
import api from "../lib/api";
import user from "../lib/user";

const { TextArea } = Input;
const { Option } = Select;

const Import_blood = ({ computerName }) => {
  const [opttype, setOptType] = useState();
  const [senderBlood, setSenderBlood] = useState();
  const [bagType, setBagType] = useState();
  const [blood_name, setBloodName] = useState();
  const [rh_name, setRhName] = useState();
  const [blood_liquid, setBloodLiquid] = useState();
  const [listimport, setListimport] = useState();
  const [sumlists, setSumlists] = useState();

  const [requireGroup, setRequireGroup] = useState(false);
  const [requireRh, setRequireRh] = useState(false);
  const [disabledGr, setDisabledGr] = useState(false);
  const [disabledRh, setDisabledRh] = useState(false);

  const [password, setPassword] = useState();
  const [isModalVisiblePassword, setIsModalVisiblePassword] = useState(false);

  const [frmImport_blood] = Form.useForm();

  const printComponent = useRef(null);

  const [isModalVisibleView, setisModalVisibleView] = useState(false);

  const [colorGr, setColorGr] = useState();

  const showModalPass = async () => {
    setIsModalVisiblePassword(true);
    setTimeout(() => {
      document.getElementById("pass").focus();
    }, 500);
  };

  const showModalView = async () => {
    setisModalVisibleView(true);
    const ids = listimport?.map((item) => item.id);
    // call api
    const result = await api.get(`/Sum_blood`, {
      params: {
        ids: ids,
      },
    });
    // set state
    setSumlists(result.data);
  };

  const handleOkView = async () => {
    // ส่ง user_name and password
    const resultLogin = await api.post(`/Confirm_password`, {
      password: password,
    });
    console.log("resultLogin", resultLogin);
    if (resultLogin.data) {
      const ip = await internalIpV4();
      const ids = listimport.map((item) => item.id);
      // console.log("IPV4", ip);
      // console.log("computerName", computerName);

      const result = await api.put(`/Update_Import_Blood`, {
        ids: ids,
        staff: resultLogin.data.fname + " " + resultLogin.data.lname,
        // computerName,
      });
      console.log("===result", result);
      setisModalVisibleView(false);
      setIsModalVisiblePassword(false);
      setPassword();
      fetchList();
    } else {
      Modal.error({ title: "Password invalid" });
    }
  };

  const handleCancelView = () => {
    setisModalVisibleView(false);
  };
  //--------------------------------------//

  const LoadOptType = async () => {
    const result = await api.get("/OptionType");
    setOptType(result.data);
  };
  const LoadSender = async () => {
    const result = await api.get("/SenderBlood");
    setSenderBlood(result.data);
  };
  const LoadBagType = async () => {
    const result = await api.get("/BagType");
    setBagType(result.data);
  };
  const LoadBloodName = async () => {
    const result = await api.get("/Blood_Name");
    setBloodName(result.data);
  };
  const LoadRhName = async () => {
    const result = await api.get("/Rh_Name");
    setRhName(result.data[0]);
  };
  // const LoadStaffName = async () => {
  //   const result = await api.get("/Staff_Name");
  //   setStaffName(result.data);
  // };
  const LoadBloodLiquid = async () => {
    const result = await api.get("/Blood_Liquid");
    setBloodLiquid(result.data);
  };
  useEffect(async () => {
    await LoadOptType();
    await LoadSender();
    await LoadBagType();
    await LoadBloodName();
    await LoadRhName();
    // await LoadStaffName();
    await LoadBloodLiquid();
  }, []);

  const Refresh = () => {
    frmImport_blood.resetFields();
  };

  const onFinishInsert = async (value) => {
    const ip_init = await internalIpV4();
    // if(value.unit_no != value.unit_no){

    // }
    try {
      const result = await api.post(`/Insert_Import_Blood`, {
        type_id: value.type_id,
        hos_id: value.hos_id,
        bag_type_id: value.bag_type_id,
        liquid_id: value.liquid_id,
        date_received: moment(value.date_received).format("YYYY-MM-DD"),
        date_collect: moment(value.date_collect).format("YYYY-MM-DD"),
        date_exp: moment(value.date_exp).format("YYYY-MM-DD"),
        exp_time: moment(value.exp_time).format("HH:mm:ss"),
        blood_group: value.blood_group,
        blood_rh: value.blood_rh,
        volume: value.volume,
        unit_no: value.unit_no,
        note: value.note,
        // staff_name: value.staff_name,
        computer_name: computerName,
        ip: ip_init,
      });
      console.log("result---", result);

      if (result?.data?.status === "error") {
        Modal.error({ title: <h2>มีถุงเลือดนี้แล้ว</h2> });
      }
      frmImport_blood.setFieldsValue({
        unit_no: "",
      });
      initstaffname();
      document.getElementById("unit_no").focus();
      fetchList();
    } catch (error) {
      Modal.error({ title: "Error" });
    }
  };

  const fetchList = async () => {
    const ip = await internalIpV4();
    const result = await api.get(`/Select_Import_Blood`, {
      params: { ip, computerName },
    });
    const fetchList_blood = result?.data || [];
    console.log("result?.data", result?.data);
    setListimport(fetchList_blood);
    // console.log(ip);
    // console.log(computerName);
    // console.log("===fetchList", result.data);
  };

  console.log(listimport);

  const initstaffname = () => {
    const userDataTemp = user.getUser();
    frmImport_blood.setFieldsValue({
      staff_name: `${userDataTemp.fname}  ${userDataTemp.lname}`,
    });
  };
  useEffect(async () => {
    if (listimport) {
      await initstaffname();
      await fetchList();
    }
  }, []);


  /////////////////////////
  const Delete_data = async (value) => {
    Modal.confirm({
      title: "Are you sure !",
      content: "Delete Record",
      onOk: async () => {
        const result = await api.delete(`/Delete_Import_Blood`, {
          params: { id: value },
        });
        fetchList();
      },
    });
  };
  // //Refresh ข้อมูลปุ่มหมู่เลือด ทุก 1000=1วิ วินาที
  // useEffect(() => {
  //   setInterval(() => {
  //     fetchABO();
  //   }, 1000 * 60);
  // }, []);
  /////////////////////////////////////////////////

  const selectGroup = (e) => {
    console.log("eeeee", e);
    setColorGr(e);
  };

  ////////////////////////////

  const onChangeTypeID = async (value) => {
    // call api
    const result = await api.get(`/GetDateTypeExp`, {
      params: { type_id: value },
    });
    const DateTypeExp = result.data[0];


    const call_exp = moment(frmImport_blood.getFieldValue("date_collect")).add(
      DateTypeExp.date_expri,
      "days"
    );

    switch (DateTypeExp.component_type) {
      case 1: //มี group , rh
        setRequireGroup(true);
        setRequireRh(true);
        setDisabledGr(false);
        setDisabledRh(false);
        frmImport_blood.setFields([
          {
            name: "blood_group",
            //value: componentsUpdate.blood_group,
            errors: [],
          },
          {
            name: "blood_rh",
            errors: [],
            // value: componentsUpdate.blood_rh,
          },
        ]);
        break;
      case 2: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmImport_blood.setFields([
          {
            name: "blood_group",
            errors: [],
            //value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 3: //มี group
        setRequireGroup(true);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(true);
        frmImport_blood.setFields([
          {
            name: "blood_group",
            errors: [],
            //value: componentsUpdate.blood_group,
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;
      case 4: //ไม่มี group , rh
        // setSetGr("");
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(true);
        setDisabledRh(true);

        frmImport_blood.setFields([
          {
            name: "blood_group",
            value: "",
            errors: [],
          },
          {
            name: "blood_rh",
            value: "",
            errors: [],
          },
        ]);
        break;

      default:
        setRequireGroup(false);
        setRequireRh(false);
        setDisabledGr(false);
        setDisabledRh(false);
        break;
    }

    frmImport_blood.setFieldsValue({
      ...DateTypeExp,
      time_exp: DateTypeExp.date_expri,
      date_exp: call_exp,
    });
  };

  const CalExpdate = (value) => {
    const collect = frmImport_blood.getFieldValue("time_exp");
    const call_exp = moment(value._d).add(collect, "days");

    frmImport_blood.setFieldsValue({
      date_exp: call_exp,
    });
  };

  const columnImport = [
    {
      title: "ลำดับ",
      dataIndex: "",
      key: "",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "เลขที่ถุงเลือด",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
    },
    {
      title: "ชนิดเลือด",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: 90,
    },
    {
      title: "หมู่เลือด",
      dataIndex: "blood_group",
      key: "",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return `${record.blood_group}${record.blood_rh}`;
      },
    },
    {
      title: "ปริมาณ",
      dataIndex: "blood_value",
      key: "blood_value",
      align: "center",
      width: 90,
    },
    {
      title: "วันที่รับ",
      dataIndex: "unit_receive",
      key: "unit_receive",
      align: "center",
      width: 120,
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "unit_exp",
      key: "unit_exp",
      align: "center",
      width: 120,
    },
    {
      title: "รับมาจาก",
      dataIndex: "hos_long_name_th",
      key: "hos_long_name_th",
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "status_name",
      key: "status_name",
      align: "center",
    },
    {
      title: "ลบ",
      dataIndex: "",
      key: "delete",
      align: "center",
      width: 100,
      render: (text, record) => (
        <Button type="text">
          <AiOutlineDelete
            style={{ fontSize: "25px", color: "#FF6633" }}
            onClick={() => Delete_data(record.id)}
          />
        </Button>
      ),
    },
  ];
  const column_Sum = [
    {
      title: "ประเภท",
      dataIndex: "Type",
      key: "Type",
      width: "15%",
    },
    {
      title: "จำนวน",
      dataIndex: "Type_num",
      key: "Type_num",
      align: "center",
      width: "20%",
    },
  ];
  return (
    <>
      <Layout keyTab="stock_import_blood">
        <div>
          <Head>
            <title>SIBSOFT : รับเลือดเข้าระบบ</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row>
          <Col span={2}></Col>
        </Row>
        <div style={{ marginTop: 10 }}>
          <Form
            form={frmImport_blood}
            // labelCol={{ span: 8 }}
            // layout="vertical"
            onFinish={onFinishInsert}
            initialValues={{
              date_received: moment(),
              exp_time: moment("00:00:00", "HH:mm:ss"),
            }}
          >
            <Row>
              <Col span={20} offset={2}>
                <Card >
                  <Row>
                    <Col span={18}>
                      <Row>
                        <Form.Item
                          label="รับเลือดจาก"
                          name="hos_id"
                          style={{ width: "40%" }}
                        >
                          <Select
                            placeholder="รับเลือดจาก"
                            size="small"
                            style={{
                              fontSize: "14px",
                              width: "100%",
                            }}
                          >
                            {senderBlood?.map((item) => (
                              <Option key={item.hos_id} value={item.hos_id}>
                                {item.hos_shot_name_th}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-18px" }}>
                        <Form.Item
                          label="ชนิด"
                          name="type_id"
                          style={{
                            marginTop: "-6px",
                            width: "34%",
                            marginLeft: "41px",
                          }}
                        >
                          <Select
                            onChange={onChangeTypeID}
                            placeholder="ชนิด"
                            size="small"
                            style={{
                              width: "100%",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            {opttype?.map((item) => (
                              <Option key={item.id} value={item.id}>
                                {item.s_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        &nbsp;
                      </Row>

                      <Row style={{ marginTop: "-27px" }}>
                        <Form.Item
                          label="ประเภทถุง"
                          name="bag_type_id"
                          style={{
                            width: "39%",
                            marginLeft: "6px",
                          }}
                        >
                          <Select
                            size="small"
                            style={{
                              width: "100%",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                            placeholder="ประเภทถุง"
                          >
                            {bagType?.map((item) => (
                              <Option key={item.bagcode} value={item.bagcode}>
                                {item.bagtype}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        &nbsp;
                        <Form.Item
                          label="น้ำยา"
                          name="liquid_id"
                          style={{ width: "21%" }}
                        >
                          <Select
                            size="small"
                            style={{
                              width: "100%",
                              fontSize: "12px",
                              textAlign: "center",
                            }}
                            placeholder="น้ำยา"
                          >
                            {blood_liquid?.map((item) => (
                              <Option
                                key={item.id}
                                value={item.id}
                                style={{ fontSize: "12px" }}
                              >
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-27px" }}>
                        <Form.Item
                          label="วันเจาะ"
                          name="date_collect"
                          style={{ width: "27%", marginLeft: "22px" }}
                        >
                          <DatePicker
                            style={{ width: "100%", fontSize: "14px" }}
                            format="DD-MM-YYYY"
                            onChange={CalExpdate}
                            locale={th_TH}
                            size="small"
                          />
                        </Form.Item>

                        <Form.Item
                          label="วันที่รับ"
                          name="date_received"
                          style={{ marginLeft: "5px", width: "27%" }}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                            size="small"
                          />
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-27px" }}>
                        <Form.Item
                          label="วันหมดอายุ"
                          name="date_exp"
                          style={{ marginLeft: "0px", width: "30%" }}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            format="DD-MM-YYYY"
                            locale={th_TH}
                            size="small"
                          />
                        </Form.Item>

                        <Form.Item
                          label="จำนวนวันหมดอายุ"
                          name="time_exp"
                          style={{ marginLeft: "5px", width: "30%" }}
                        >
                          <Input
                            style={{
                              paddingLeft: "30px",
                              width: "100%",
                              fontSize: "14px",
                              //marginTop: "3px",
                            }}
                            size="small"
                            suffix="วัน"
                            disabled
                          />
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-27px" }}>
                        <Form.Item
                          label="เวลาหมดอายุ"
                          name="exp_time"
                          style={{ marginLeft: "-11px", width: "32%" }}
                        >
                          <TimePicker size="small" style={{ width: "100%" }} />
                        </Form.Item>
                      </Row>

                      <Row style={{ marginTop: "-22px" }}>
                        <Form.Item
                          label="หมายเหตุ"
                          name="note"
                          style={{ marginLeft: "10px", width: "50%" }}
                        >
                          <TextArea
                            rows={1}
                            showCount
                            maxLength={250}
                            style={{
                              width: "100% ",
                            }}
                          />
                        </Form.Item>
                      </Row>
                    </Col>

                    <Col span={6}>
                      <Row style={{ marginTop: "0px" }}>
                        <Form.Item
                          name="blood_group"
                          rules={[
                            {
                              required: requireGroup,
                              message: "โปรดระบุหมู่เลือด",
                            },
                          ]}
                          style={{ marginLeft: "-110px", width: "45%" }}
                        >
                          <Select
                            className={
                              colorGr === "A"
                                ? "select-group groupA"
                                : colorGr === "B"
                                ? "select-group groupB"
                                : colorGr === "AB"
                                ? "select-group groupAB"
                                : colorGr === "O"
                                ? "select-group groupO"
                                : "select-group"
                            }
                            onChange={selectGroup}
                            dropdownClassName="select-group-option"
                            disabled={disabledGr}
                            style={{ width: "100%", backgroundColor: "red" }}
                            placeholder="Gr."
                          >
                            {blood_name?.map((item) => (
                              <Option
                                key={item.blood_name}
                                value={item.blood_name}
                              >
                                {item.blood_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        &nbsp; &nbsp;
                        <Form.Item
                          name="blood_rh"
                          rules={[
                            {
                              required: requireRh,
                              message: "โปรดระบุ Rh.",
                            },
                          ]}
                          style={{ width: "35%" }}
                        >
                          <Select
                            className="select-groupRh "
                            dropdownClassName="select-group-optionRh"
                            disabled={disabledRh}
                            size="large"
                            style={{ width: "100%", marginTop: "5px" }}
                            placeholder="rh"
                          >
                            {rh_name?.map((item) => (
                              <Option
                                key={item.rh_shot_name}
                                value={item.rh_shot_name}
                              >
                                {item.rh_shot_name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Row>

                      <Row justify="center" style={{ marginTop: "-15px" }}>
                        <Form.Item
                          name="volume"
                          style={{ marginLeft: "-250px", width: "100%" }}
                        >
                          <Input
                            style={{ width: "100%" }}
                            prefix="ปริมาณ : "
                            suffix="ml."
                          />
                        </Form.Item>
                      </Row>

                      <Row justify="center">
                        <Form.Item
                          name="unit_no"
                          id="unit_no"
                          style={{
                            marginTop: "-10px",
                            marginLeft: "-250px",
                            width: "100%",
                          }}
                        >
                          <Input
                            prefix={
                              <BiBarcodeReader style={{ color: "#B22222" }} />
                            }
                            className="ant-input-lg"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              color: "#FFF2F2",
                              // height: "70px",
                            }}
                            placeholder="เลขที่ถุงเลือด"
                            maxLength={11}
                          />
                        </Form.Item>
                      </Row>
                    </Col>
                  </Row>

                  <Row justify="end" style={{ marginTop: "-27px" }}>
                    <Form.Item
                      style={{ marginTop: "-10px", marginBottom: "-10px" }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ display: "none" }}
                      >
                        OK
                      </Button>
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
                        onClick={Refresh}
                      >
                        เริ่มใหม่
                      </Button>
                    </Form.Item>
                  </Row>

                  <Row justify="center" style={{ marginTop: "-12px" }}>
                    <Button
                      style={{
                        fontSize: "12px",
                        height: "28px",
                        backgroundColor:
                          listimport === undefined || listimport.length == 0
                            ? ""
                            : "#3AB0FF",
                        color:
                          listimport === undefined || listimport.length == 0
                            ? ""
                            : "white",
                      }}
                      size="small"
                      type="primary"
                      onClick={showModalView}
                      disabled={
                        listimport === undefined || listimport.length == 0
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
                    >
                      บันทึกข้อมูล
                    </Button>
                  </Row>

                  <br />
                  <Row justify="center" style={{ marginTop: "-12px" }}>
                    <Col span={24}>
                      <Table
                        columns={columnImport}
                        dataSource={listimport}
                        bordered
                        className="xm"
                        size="small"
                        pagination={false}
                        scroll={{ y: 700 }}
                        style={{ width: "100%", border: "1px solid" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
        <br />

        <br />
        <Row justify="end">
          <Col></Col>
          <Col span={1}></Col>
        </Row>
        <br />
        <br />
      </Layout>
      {/* /-----------------------/ */}
      <Modal
        title="ตรวจสอบ"
        visible={isModalVisibleView}
        onOk={showModalPass}
        onCancel={handleCancelView}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <Table
          className="xm"
          size="small"
          columns={column_Sum}
          dataSource={sumlists}
          bordered
          pagination={false}
        />
      </Modal>
      <Modal
        visible={isModalVisiblePassword}
        onCancel={() => {
          setIsModalVisiblePassword(false), setPassword();
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
              handleOkView();
            }
          }}
        />
        <Row justify="end" style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsModalVisiblePassword(false), setPassword();
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
            onClick={handleOkView}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Import_blood;
//////// print_sticker
const TestPrintComponent = ({ barcode, data }) => {
  const [barcodeImage, setBarcodeImage] = useState();

  const onClickGenBarcode = (input) => {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, input, { format: "CODE128", fontSize: 14 });
    const barcodeBase64 = canvas.toDataURL("image/png");
    setBarcodeImage(barcodeBase64);
  };

  useEffect(() => {
    if (barcode) {
      onClickGenBarcode(barcode);
    }
  }, [barcode]);

  return (
    <div className="print">
      Test Test {barcode}
      <img src={barcodeImage} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
