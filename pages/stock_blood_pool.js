import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { FcPrint } from "react-icons/fc";
import { MdEditNote } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";

import Layout from "../components/layout";
import api from "../lib/api";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;


const Stock_blood_pool = () => {

  const [frm_searchdata] = Form.useForm();
  const [frm_search_unit_no] = Form.useForm();

  const [Spinloading, setSpinLoading] = useState(false);
  const [choice1, setchoice1] = useState();
  const [data_table, setdata_table] = useState([]);

  const [data_table_search_poolblood, setdata_table_search_poolblood] =
    useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [time, settime] = useState();
  const [date, setdate] = useState();

  const [gr_search, setgr_search] = useState();

  useEffect(async () => {}, []);
  const Refresh = async () => {
    frm_searchdata.resetFields();
    // setdata_table([]);
    setdata_table_search_poolblood([]);
    setDateFrom();
    setDateTo();
  };

  const Search_data = async () => {
    const frmData = frm_search_unit_no.getFieldValue();
    console.log("frmData", frmData);

    const result = await api.get("/search_unit", {
      params: {
        unit_no: frmData.unit_no_search,
      },
    });

    if (result?.data[0].length > 0) {
      const results = data_table.filter(
        (item) => item.id === frmData.unit_no_search
      );
      if (results.length > 0) {
        Modal.warning({
          content: "ถุงเลือดซ้ำ",
          onOk() {
            frm_search_unit_no.resetFields();
            setTimeout(() => {
              document.getElementById("unit_no_id").focus();
            }, 200);
          },
        });
      } else {
        setdata_table([...data_table, result.data[0][0]]);
        frm_search_unit_no.resetFields();
        setTimeout(() => {
          document.getElementById("unit_no_id").focus();
        }, 200);
      }
    } else {
      Modal.error({
        content: "ข้อมูลไม่ถูกต้อง",
        onOk() {
          frm_search_unit_no.resetFields();
          setTimeout(() => {
            document.getElementById("unit_no_id").focus();
          }, 200);
        },
      });
    }
  };
  const Search_data_plete = async () => {
    const frmData = frm_searchdata.getFieldValue();

    const result = await api.get("/search_plete", {
      params: {
        date_from: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_to: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        unit_no: frmData.unit_no_P,
      },
    });
    setdata_table_search_poolblood(result.data[0]);
  };
  const focus_p = async () => {
    document.getElementById("unit_no_P_ID").focus();
  };
  const columns_tab2 = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "Unit no",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "ABO",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "EXP",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "Vol",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "Pool date",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "Pool staff",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "2%",
      render: (_, record) => (
        <div>
          <Tooltip title="แก้ไข">
            <p
              onClick={() => Modal_Editcross_value_con(record.xm_id)}
              className="pointer"
              style={{
                marginBottom: "-8px",
                marginTop: "-3px",
              }}
            >
              <MdEditNote size={"20px"} />
            </p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "2%",
      render: (_, record) => (
        <div>
          <Tooltip title="พิมพ์">
            <p
              className="pointer"
              style={{
                marginBottom: "-8px",
                marginTop: "-3px",
              }}
            >
              <FcPrint size={"20px"} />
            </p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "5%",
      render: (_, record) => (
        <div>
          {/* {record.xm_status_name && ( */}
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDeleteCross(record.key)}
          >
            <Button type="danger" size="small">
              <span style={{ fontSize: "12px" }}>Cancel</span>
            </Button>
          </Popconfirm>
          {/* )} */}
        </div>
      ),
    },
  ];
  const columns = [
    {
      title: "#",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "2%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit no",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
    },
    {
      title: "ABO",
      dataIndex: "ABO",
      key: "ABO",
      align: "center",
      width: "10%",
    },
    {
      title: "EXP",
      dataIndex: "dateexp",
      key: "dateexp",
      align: "center",
      width: "10%",
    },
    {
      title: "Vol",
      dataIndex: "volume",
      key: "volume",
      align: "center",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "operation",
      align: "center",
      width: "7%",
      render: (_, record, index) =>
        data_table.length >= 1 ? (
          <Popconfirm
            title="คุณต้องการบข้อมูลใช่หรือไม่ ?"
            onConfirm={() => handleDelete(index)}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key) => {
    const dataLast = data_table[key];
    const newData = data_table.filter((item) => item !== dataLast);
    setdata_table(newData);
  };
  return (
    <>
      <Layout keyTab="stock_blood_pool">
        <Spin tip="Loading..." spinning={Spinloading} size="large">
          <div>
            <Head>
              <title>SIBSOFT : Pool Platelet</title>
              <meta property="og:title" content="My page title" key="title" />
            </Head>
          </div>
          <Row justify="center">
            <Col span={24} style={{ padding: "10px" }}>
              <Card style={{ minHeight: "90vh" }}>
                <Tabs type="card" style={{ marginTop: "-10px" }}>
                  <TabPane tab="Pool Platelet" key="1">
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Form form={frm_search_unit_no}>
                            <Row justify="start">
                              <Col span={24}>
                                <Form.Item
                                  label="Unit no"
                                  name="unit_no_search"
                                  style={{ width: "139%" }}
                                >
                                  <Input
                                    id="unit_no_id"
                                    onKeyDown={({
                                      target: { value },
                                      keyCode,
                                    }) => {
                                      if (keyCode === 13) {
                                        // 13 คือ enter
                                        Search_data();
                                      }
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </Row>
                        <Row
                          justify="center"
                          style={{ marginBottom: "10px", marginTop: "-10px" }}
                        >
                          <Col span={24}>
                            <Table
                              id="report_stock_tackblood_tb_id"
                              className="table_report_stock_tackblood"
                              columns={columns}
                              dataSource={data_table}
                              pagination={false}
                              size="small"
                              scroll={{
                                // x: "calc(800px + 100%)",
                                y: "60vh",
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          {/* <Form form={frm_search_unit_no}> */}
                          <Row justify="start">
                            <Col span={20}>
                              <Form.Item
                                label="ใช้เบอร์ถุงเลือด"
                                name="unit_no"
                                style={{ width: "100%" }}
                              >
                                <Input id="gr_all_ID" />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              {" "}
                              <Button
                                // disabled={!dataReq || dataReq == undefined}
                                type="primary"
                                // onClick={showModal}
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
                                  //   backgroundColor:
                                  //     !dataReq || dataReq == undefined
                                  //       ? ""
                                  //       : "#3AB0FF",
                                  //   color:
                                  //     !dataReq || dataReq == undefined
                                  //       ? ""
                                  //       : "white",
                                }}
                                //   size="small"
                              >
                                &nbsp; บันทึกข้อมูล
                              </Button>
                            </Col>
                          </Row>
                          {/* </Form> */}
                        </Row>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="รายการ Pool Platelet" key="2">
                    <Row justify="center" style={{ marginTop: "5px" }}>
                      <Col span={24}>
                        <Form
                          form={frm_searchdata}
                          initialValues={{
                            date_from: moment().add(543, "year"),
                            date_to: moment().add(543, "year"),
                            gr_all: "",
                          }}
                          onFinish={Search_data_plete}
                        >
                          <Row justify="start">
                            <Form.Item label="วันที่" name="date_from">
                              <DatePicker
                                style={{ width: "120px" }}
                                format="DD-MM-YYYY"
                                locale={th_TH}
                                onChange={focus_p}
                              />
                            </Form.Item>
                            &nbsp;
                            <Form.Item label="ถึง" name="date_to">
                              <DatePicker
                                style={{ width: "120px" }}
                                format="DD-MM-YYYY"
                                locale={th_TH}
                                onChange={focus_p}
                              />
                            </Form.Item>
                            &nbsp; &nbsp;
                            <Form.Item label="Unit no" name="unit_no_P">
                              <Input
                                style={{ width: "120px" }}
                                id="unit_no_P_ID"
                              />
                            </Form.Item>
                            &nbsp;
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
                              htmlType="submit"
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
                              onClick={Refresh}
                            >
                              เริ่มใหม่
                            </Button>
                          </Row>
                        </Form>
                      </Col>
                    </Row>

                    <Row justify="center">
                      <Col span={24}>
                        <Table
                          id="report_stock_tackblood_tb_id"
                          className="table_report_stock_tackblood"
                          columns={columns_tab2}
                          dataSource={data_table_search_poolblood}
                          pagination={false}
                          size="small"
                          scroll={{
                            // x: "calc(800px + 100%)",
                            y: "60vh",
                          }}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Spin>
      </Layout>
    </>
  );
};

export default Stock_blood_pool;
