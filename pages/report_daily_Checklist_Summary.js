// สรุปรายการตรวจ
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
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import { RiFileExcel2Line } from "react-icons/ri";

import ExcelJS from "exceljs";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MdManageSearch, MdRefresh } from "react-icons/md";
import Layout from "../components/layout";
import api from "../lib/api";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Report_daily_Checklist_Summary = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const { RangePicker } = DatePicker;

  const [Spinloading, setSpinLoading] = useState(false);

  const [frm_searchdata] = Form.useForm();

  const [data_table, setdata_table] = useState();


  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "1%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "30%",
      render: (text, record, index) => {
        return (
          <div>
            <span
              style={{ float: record.type_name == "รวม" ? "center" : "left" }}
            >
              &nbsp;&nbsp;{text}
            </span>
          </div>
        );
      },
    },
    {
      title: "A-",
      dataIndex: "Aneg",
      key: "Aneg",
      align: "center",
      width: "5%",
    },
    {
      title: "A",
      dataIndex: "A",
      key: "A",
      align: "center",
      width: "5%",
    },
    {
      title: "A+",
      dataIndex: "Apos",
      key: "Apos",
      align: "center",
      width: "5%",
    },
    {
      title: "B-",
      dataIndex: "Bneg",
      key: "Bneg",
      align: "center",
      width: "5%",
    },
    {
      title: "B",
      dataIndex: "B",
      key: "B",
      align: "center",
      width: "5%",
    },
    {
      title: "B+",
      dataIndex: "Bpos",
      key: "Bpos",
      align: "center",
      width: "5%",
    },
    {
      title: "O-",
      dataIndex: "Oneg",
      key: "Oneg",
      align: "center",
      width: "5%",
    },
    {
      title: "O",
      dataIndex: "O",
      key: "O",
      align: "center",
      width: "5%",
    },
    {
      title: "O+",
      dataIndex: "Opos",
      key: "Opos",
      align: "center",
      width: "5%",
    },
    {
      title: "AB-",
      dataIndex: "ABneg",
      key: "ABneg",
      align: "center",
      width: "5%",
    },
    {
      title: "AB",
      dataIndex: "AB",
      key: "AB",
      align: "center",
      width: "5%",
    },
    {
      title: "AB+",
      dataIndex: "ABpos",
      key: "ABpos",
      align: "center",
      width: "5%",
    },
    {
      title: "Cryo",
      dataIndex: "Cryo",
      key: "Cryo",
      align: "center",
      width: "5%",
    },
    {
      title: "รวม",
      dataIndex: "num_sum",
      key: "",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <div>
            {/* <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span> */}
            {Number(record.Aneg) +
              Number(record.A) +
              Number(record.Apos) +
              Number(record.Bneg) +
              Number(record.B) +
              Number(record.Bpos) +
              Number(record.Oneg) +
              Number(record.O) +
              Number(record.Opos) +
              Number(record.ABneg) +
              Number(record.AB) +
              Number(record.ABpos) +
              Number(record.Cryo)}
          </div>
        );
      },
    },
  ];

  const handlerClickDownloadButton = async () => {

  }

  const Search_data = async () => {

  }

  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
  };

  return (
    <>
      <Layout keyTab="report_daily_Checklist_Summary">
        <Spin tip="Loading..." spinning={Spinloading} size="large">
          <div>
            <Head>
              <title>SIBSOFT : รายงาน สรุปรายการตรวจ</title>
              <meta property="og:title" content="My page title" key="title" />
            </Head>
          </div>
          <Row justify="center">
            <Col span={24} style={{ padding: "10px" }}>
              <Card style={{ minHeight: "90vh" }}>
                <Tabs type="card">
                  <TabPane tab="รายงานสรุปรายการตรวจ (กำลังดำเนินการ)" key="1">
                    <Row justify="start" style={{ marginTop: "5px" }}>
                      <Col span={24}>
                        <Form
                          form={frm_searchdata}
                          initialValues={{
                            date_Search: [
                              moment().add(543, "year"),
                              moment().add(543, "year"),
                            ],
                          }}
                          onFinish={Search_data}
                        >
                          <Row justify="center" style={{ marginTop: "5px" }}>
                            <Col span={24}>
                              <Form
                                form={frm_searchdata}
                                initialValues={{
                                  date_Search: [
                                    moment().add(543, "year"),
                                    moment().add(543, "year"),
                                  ],
                                  hos_search: "",
                                }}
                                onFinish={Search_data}
                              >
                                <Row justify="center">
                                  <Form.Item name="date_Search" label="">
                                    <RangePicker
                                      placeholder={["วันเริ่ม", "วันสุดท้าย"]}
                                      format="DD-MM-YYYY"
                                      locale={th_TH}
                                    />
                                  </Form.Item>
                                  &nbsp; &nbsp;
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
                          <Row
                            justify="end"
                            style={{ marginTop: "-20px", marginBottom: "5px" }}
                          >
                           <Button
                      disabled={!data_table}
                      type="primary"
                      style={{
                        fontSize: "12px",
                        height: "32px",
                        marginLeft: "5px",
                        backgroundColor: !data_table ? "" : "green",
                        color: !data_table ? "" : "white",
                      }}
                      onClick={handlerClickDownloadButton}
                      icon={
                        <RiFileExcel2Line
                          style={{
                            fontSize: "16px",
                            marginRight: "3px",
                            marginBottom: "-3px",
                          }}
                        />
                      }
                    >
                      Export
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
                          columns={columns}
                          dataSource={data_table}
                          pagination={false}
                          size="small"
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>{" "}
            </Col>{" "}
          </Row>
        </Spin>
      </Layout>
    </>
  );
};

export default Report_daily_Checklist_Summary;
