import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { MdManageSearch, MdRefresh } from "react-icons/md";

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
  Tabs,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import { internalIpV4 } from "internal-ip";
import moment from "moment";
import "moment/locale/th";
import Head from "next/head";
import os from "os";
import { useEffect, useRef, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import ReactToPrint from "react-to-print";
import { Layout } from "../components";

import api from "../lib/api";
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Stock_split_release = ({ computerName }) => {
  const [opt_type, setOpt_type] = useState();
  const [password, setPassword] = useState();
  const [isModalPassword, setIsModalPassword] = useState(false);

  const [data_show_tb, setData_show_tb] = useState([]);
  const [data_table, setData_table] = useState();

  const [data_to_print, setData_to_print] = useState([]);

  const [frm_save_release] = Form.useForm();
  const [frm_search_unit_no] = Form.useForm();
  const [frm_search_his] = Form.useForm();

  const printComponent = useRef(null);

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
  const search_unit_release = async () => {
    const frmData = frm_search_unit_no.getFieldValue();
    console.log("-------->frmData", frmData);
    const results = await api.get(`/search_blood_release`, {
      params: {
        keyword: frmData.unit_no,
        keyword_type: frmData.bag_type_id,
      },
    });

    if (results.data[0] === undefined || results.data[0] === "") {
      Modal.error({
        content: <>ไม่พบถุงเลือด</>,
      });
      frm_search_unit_no.setFieldsValue({
        unit_no: "",
      });
      document.getElementById("unit_no").focus();
    } else {
      if (data_show_tb.length > 0) {
        const data_chk = data_show_tb.map((item) => item);
        console.log("item", data_chk);
        let check_repeat = false;
        for (let index = 0; index < data_chk.length; index++) {
          const item = data_chk[index];
          console.log("data_chk", item);
          if (
            item.blood_no === results.data[0].blood_no &&
            item.blood_type === results.data[0].blood_type
          ) {
            check_repeat = true;
          }
        }

        if (check_repeat != true) {
          setData_show_tb([...data_show_tb, results.data[0]]);
        } else {
          frm_search_unit_no.setFieldsValue({
            unit_no: "",
          });
          document.getElementById("unit_no").focus();
          Modal.warning({
            content: <>ถุงเลือดซ้ำ</>,
          });
        }
      } else {
        setData_show_tb([...data_show_tb, results.data[0]]);
        console.log("data---==>data", results.data[0]);
        frm_search_unit_no.setFieldsValue({
          unit_no: "",
        });
        document.getElementById("unit_no").focus();
      }
    }
  };

  const save_release = async () => {
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
        const dataToPrint = [];
        const data_send = data_show_tb.map((item) => item);

        for (let index = 0; index < data_send.length; index++) {
          const item = data_send[index];
          console.log("data_send", item);

          const results = await api.put(`/save_blood_release`, {
            data: item,

            staff_name: staff_name,
          });
          dataToPrint.push({ ...item, staff_name });
        }
        setData_to_print(dataToPrint);
        console.log(dataToPrint);
        if ("success") {
          success();
          document.getElementById("print").click();
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

  const refresh = () => {
    frm_search_unit_no.resetFields();
    frm_split_unit_no.resetFields();
  };

  const success = () => {
    Modal.success({
      title: "แจ้งเตือน",
      content: "ทำรายการสำเร็จ!!",
      onOk() {
        setData_show_tb();
      },
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "xm_id",
      key: "xm_id",
      align: "center",
      render: (text, record, index) => {
        return <b style={{ fontSize: "12px" }}>{index + 1}</b>;
      },
    },
    {
      title: "Unit No.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
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
      title: "Group",
      dataIndex: "blood_group",
      key: "blood_group",
      align: "center",
      render: (text, record) => (
        <b style={{ fontSize: "12px" }}>
          {record?.blood_group + record?.blood_rh}
        </b>
      ),
    },
    {
      title: "วันหมดอายุ",
      dataIndex: "date_exp",
      key: "date_exp",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "เลขที่ขอเลือด",
      dataIndex: "order_number",
      key: "order_number",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "ผู้จองเลือด",
      dataIndex: "patientname",
      key: "patientname",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "Ward",
      dataIndex: "ward_name",
      key: "ward_name",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      title: "วันที่ XM",
      dataIndex: "date_xm",
      key: "date_xm",
      align: "center",
      render: (text, record) => <b style={{ fontSize: "12px" }}>{text}</b>,
    },
    {
      dataIndex: "id",
      align: "center",
      width: 20,
      //   render: (text, record) => (
      //     <>
      //       <Print_split data={record} />
      //     </>
      //   ),
    },
  ];
  //-------------------------
  const onChange = (key) => {
    // console.log(key);
    if (key === "1") {
      // console.log("1");
    }
    if (key === "2") {
      // console.log("2");
    }
  };
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
    const result = await api.get(`/search_his_release`, { params });
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
      title: "วันที่ปลด",
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
      <Layout keyTab="stock_blood_release">
        <div>
          <Head>
            <title>SIBSOFT : ปลดเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={22}>
            <Card style={{ height: "100%" }}>
              <Tabs onChange={onChange} type="card" style={{ marginTop: -20 }}>
                <TabPane tab="เมนูปลดเลือด" key="1">
                  <Form
                    form={frm_search_unit_no}
                    onFinish={search_unit_release}
                  >
                    <Row>
                      <Col span={3}>
                        <Form.Item
                          label="ประเภท"
                          name="bag_type_id"
                          style={{ width: "100%", marginTop: "-5px" }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
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
                      <Col span={5}>
                        <Form.Item
                          label="เลขที่ถุง"
                          name="unit_no"
                          id="unit_no"
                          style={{
                            width: "100%",
                            marginTop: "-5px",
                            paddingLeft: "0px",
                          }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            style={{
                              fontSize: "16px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      &nbsp; &nbsp;
                      <Col span={3}>
                        <Form.Item style={{ marginTop: "-3px" }}>
                          <Button
                            htmlType="submit"
                            icon={
                              <MdManageSearch
                                style={{
                                  fontSize: "16px",
                                  marginRight: "3px",
                                  marginBottom: "-3px",
                                }}
                              />
                            }
                            style={{
                              fontSize: "12px",
                              height: "33px",
                              marginLeft: "5px",
                              backgroundColor: "#17a2b8",
                              color: "white",
                            }}
                          >
                            ค้นหา
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>

                  <Form form={frm_save_release} onFinish={save_release}>
                    <Row justify="end">
                      <Button
                        type="primary"
                        style={{
                          fontSize: "12px",
                          height: "28px",
                          backgroundColor:
                            data_show_tb?.length > 0 ? "#3AB0FF" : "",
                          color: data_show_tb?.length > 0 ? "white" : "",
                        }}
                        onClick={showModalPass}
                        disabled={data_show_tb?.length > 0 ? false : true}
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
                    <Table
                      bordered
                      style={{ marginTop: "-10px" }}
                      size="small"
                      className="xm"
                      columns={columns}
                      dataSource={data_show_tb}
                    />
                  </Form>
                </TabPane>
                <TabPane tab="เมนูประวัติการปลดเลือด" key="2">
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
        <TestPrint
          printComponent={printComponent}
          data_to_print={data_to_print}
        />
      </Layout>

      {/* /-----------------------/ */}
      <Modal
        visible={isModalPassword}
        onOk={save_release}
        onCancel={() => {
          setIsModalPassword(false), setPassword();
        }}
        okButtonProps={{
          disabled: !password,
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
              save_release();
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
            onClick={save_release}
            disabled={!password}
          >
            ยืนยัน
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default Stock_split_release;
//////// print_sticker

const TestPrint = ({ printComponent, data_to_print }) => {
  return (
    <div className="print">
      {/* <Button onClick={() => document.getElementById("print").click()}>
        Print
      </Button> */}
      <div ref={(el) => (printComponent = el)} className="print-test">
        {data_to_print.map(
          (item) => console.log("item", item.blood_no)
          // <Row>
          //   <Col>{item.blood_no}</Col>
          //   <Col>{item.staff_name}</Col>
          // </Row>
        )}
      </div>
      <ReactToPrint
        trigger={() => {
          // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
          // to the root node of the returned component as it will be overwritten.
          return (
            <a href="#" id="print" style={{ display: "none" }}>
              Print this out!
            </a>
          );
        }}
        content={() => printComponent}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const computerName = os.hostname();
  return {
    props: { computerName }, // will be passed to the page component as props
  };
}
