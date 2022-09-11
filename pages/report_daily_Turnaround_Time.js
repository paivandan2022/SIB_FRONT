// Turnaround_Time
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
import moment from "moment";
import "moment/locale/th";
import { RiFileExcel2Line } from "react-icons/ri";

import ExcelJS from "exceljs";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdOutlinePrint, MdRefresh } from "react-icons/md";

import ReactToPrint from "react-to-print";
import Layout from "../components/layout";
import api from "../lib/api";

const { TabPane } = Tabs;
const { Option } = Select;

const Report_daily_Turnaround_Time = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [frm_searchdata] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data_table, setdata_table] = useState();
  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [hn_search, setHn_search] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();
  const [timeChoice, setTimeChoice] = useState();

  const printComponent = useRef(null);
  const LoadTime = async () => {
    const result = await api.get("/timeWorking_choice");
    setTimeChoice(result.data[0]);
  };

  useEffect(async () => {
    await LoadTime();
  }, []);
  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setHn_search();
    setTimeFrom();
    setTimeTo();
    setNameWork();
  };

  const Search_data = async () => {
    setLoading(true);
    const frmData = frm_searchdata.getFieldValue();
    let time_from;
    let time_to;
    let name_work;

    const time = timeChoice.filter((item) => item.id == frmData.time_search);
      time_from = time[0]?.time_from;
      time_to = time[0]?.time_to;
      name_work = time[0]?.name_working;

    const result = await api.get("/Get_daily_turnaround_time", {
      params: {
        date_start: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_last: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        hn_search: frmData.hn_search,
        time_from: time_from,
        time_to: time_to,
      },
    });
    if (result.data[0].length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
    setdata_table(result.data[0]);

    setdata_print(result.data[0]);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setHn_search(frmData.hn_search);
    setTimeFrom(time_from);
    setTimeTo(time_to);
    setNameWork(name_work);
    setLoading(false);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: "8%",
    },
    {
      title: "Name.",
      dataIndex: "name",
      key: "name",
      width: "12%",
    },
    {
      title: "Priority.",
      dataIndex: "priority_name",
      key: "priority_name",
      align: "center",
      width: "13%",
    },
    {
      title: "Normal Renge",
      dataIndex: "NormalRenge",
      key: "NormalRenge",
      align: "center",
      width: "5%",
    },
    {
      title: "Date Request",
      dataIndex: "date_request",
      key: "date_request",
      align: "center",
      width: "10%",
    },
    {
      title: "Date Confirm",
      dataIndex: "dateCF",
      key: "dateCF",
      align: "center",
      width: "10%",
    },
    {
      title: "TAT",
      dataIndex: "TAT",
      key: "TAT",
      align: "center",
      width: "5%",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
      align: "center",
      width: "7%",
      render: (text, record) =>
        record.Total < 0 ? (
          <div className={record.Total < 0 ? "totalColorR" : ""}>
            {record.Total}
          </div>
        ) : (
          <div className={record.Total > 0 ? "totalColorG" : ""}>
            {record.Total}
          </div>
        ),
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานTurnaround_Time");
    const worksheet = workbook.getWorksheet("รายงานTurnaround_Time");

    const format = "xlsx";
    const charcode = "UTF8";
    const dayNames = [
      "วันอาทิตย์ที่",
      "วันจันทร์ที่",
      "วันอังคารที่",
      "วันพุทธที่",
      "วันพฤหัสบดีที่",
      "วันศุกร์ที่",
      "วันเสาร์ที่",
    ];
    const monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    const d = new Date();
    const frmData = frm_searchdata.getFieldValue();

    const years = moment().add(543, "years").format("YYYY");
    const months = moment().format("MM");
    const day = moment().format("DD");
    const date =
      dayNames[d.getDay()] +
      " " +
      day +
      " เดือน" +
      monthNamesThai[d.getMonth()] +
      " พ.ศ." +
      years;

    worksheet.columns = [
      { header: "", key: "c1", width: 5 },
      { header: "", key: "c2", width: 15 },
      { header: "", key: "c3", width: 25 },
      { header: "", key: "c4", width: 30 },
      { header: "", key: "c5", width: 15 },
      { header: "", key: "c6", width: 22 },
      { header: "", key: "c7", width: 22 },
      { header: "", key: "c8", width: 15 },
      { header: "", key: "c9", width: 15 },
      { header: "", key: "c10" },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
      { header: "", key: "c13" },
      { header: "", key: "c14" },
      { header: "", key: "c15" },
    ];
    worksheet.addRows([
      { c5: "รายงาน Turnaround Time" },
      {
        c5:
          "ประจำวันที่ " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c5: frmData.hn_search === "" ? "" : "HN : " + frmData.hn_search,
      },
      {
        c5:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c5: "",
      },
      {
        c1: "ลำดับ",
        c2: "HN",
        c3: "Name",
        c4: "Priority",
        c5: "Normal Renge",
        c6: "Date Request",
        c7: "Date Confirm",
        c8: "TAT",
        c9: "Total",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].hn,
        c3: data_table[i].name,
        c4: data_table[i].priority_name,
        c5: data_table[i].NormalRenge,
        c6: data_table[i].date_request,
        c7: data_table[i].dateCF,
        c8: data_table[i].TAT,
        c9: data_table[i].Total,
      };
    }
    worksheet.addRows(dataTest);
    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
        "B",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ].forEach((char) => {
        worksheet.getCell(`${char}${i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      });
    }
    const uint8Array =
      format === "xlsx"
        ? await workbook.xlsx.writeBuffer()
        : charcode === "UTF8"
        ? await workbook.csv.writeBuffer()
        : new Uint8Array(
            encoding.convert(await workbook.csv.writeBuffer(), {
              from: "UTF8",
              to: "SJIS",
            })
          );
    const blob = new Blob([uint8Array], {
      type: "application/octet-binary",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // a.download = "sampleData." + format;
    a.download = `รายงานTurnaround_Time ประจำวันที่ ${date}.` + format;
    a.click();
    a.remove();
  };

  return (
    <>
      <Layout keyTab="report_daily_Turnaround_Time">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน Turnaround Time</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานTurnaround Time" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          hn_search: "",
                         time_search: 1,
                        }}
                        onFinish={Search_data}
                      >
                        <Row>
                          <Form.Item label="วันที่" name="date_from">
                            <DatePicker
                              style={{ width: "120px" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={Search_data}
                            />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="ถึง" name="date_to">
                            <DatePicker
                              style={{ width: "120px" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={Search_data}
                            />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="HN" name="hn_search">
                            <Input placeholder="HN" id="hn_ID" />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="เวร" name="time_search">
                            <Select
                              style={{ width: "100px" }}
                              placeholder="เวร"
                              onChange={Search_data}
                            >
                              {timeChoice?.map((item) => (
                                <Option key={item.id} value={item.id}>
                                  {item.name_working}
                                </Option>
                              ))}
                            </Select>
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
                    <div ref={(el) => (printComponent = el)}>
                      <div key="1">
                        <PrintDetail
                          data={data_print}
                          dateFrom={dateFrom}
                          dateTo={dateTo}
                          hnSearch={hn_search}
                          timeFrom={timeFrom}
                          timeTo={timeTo}
                          nameWork={nameWork}
                        />
                      </div>
                    </div>

                    <ReactToPrint
                      trigger={() => (
                        <Button
                          disabled={!data_table}
                          type="primary"
                          style={{
                            fontSize: "12px",
                            height: "32px",
                            marginLeft: "5px",
                          }}
                          icon={
                            <MdOutlinePrint
                              style={{
                                fontSize: "16px",
                                marginRight: "3px",
                                marginBottom: "-3px",
                              }}
                            />
                          }
                        >
                          Print
                        </Button>
                      )}
                      content={() => printComponent}
                    />
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
                      onClick={() => handlerClickDownloadButton("xlsx")}
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

                  <Row
                    justify="center"
                    style={{
                      marginTop:
                        dateFrom == undefined || dateFrom == "" ? "" : "-20px",
                    }}
                  >
                    <h style={{ fontSize: "14px" }}>
                      {dateFrom == undefined || dateFrom == ""
                        ? ""
                        : "รายงาน Turnaround Time"}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {dateFrom == undefined || dateFrom == ""
                        ? ""
                        : ` วันที่ ${dateFrom} ถึง ${dateTo}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {hn_search == undefined || hn_search == ""
                        ? ""
                        : `HN : ${hn_search}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {nameWork == undefined || nameWork == ""
                        ? ""
                        : `เวร : ${nameWork} เวลา ${timeFrom} ถึง ${timeTo}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <Col span={24}>
                      <Table
                        className="xm"
                        dataSource={data_table}
                        columns={columns}
                        pagination={false}
                        bordered
                        size="small"
                        loading={loading}
                        scroll={{ y: 340 }}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Report_daily_Turnaround_Time;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  hnSearch,
  timeFrom,
  timeTo,
  nameWork,
}) => {
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
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: "3%",
    },
    {
      title: "Name.",
      dataIndex: "name",
      key: "name",
      width: "12%",
    },
    {
      title: "Priority.",
      dataIndex: "priority_name",
      key: "priority_name",
      align: "center",
      width: "13%",
    },
    {
      title: "Normal Renge",
      dataIndex: "NormalRenge",
      key: "NormalRenge",
      align: "center",
      width: "5%",
    },
    {
      title: "Date Request",
      dataIndex: "date_request",
      key: "date_request",
      align: "center",
      width: "10%",
    },
    {
      title: "Date Confirm",
      dataIndex: "dateCF",
      key: "dateCF",
      align: "center",
      width: "10%",
    },
    {
      title: "TAT",
      dataIndex: "TAT",
      key: "TAT",
      align: "center",
      width: "5%",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
      align: "center",
      width: "7%",
      render: (text, record) =>
        record.Total < 0 ? (
          <div className={record.Total < 0 ? "totalColorR" : ""}>
            {record.Total}
          </div>
        ) : (
          record.Total
        ),
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงาน Turnaround Time</h>
      </Row>

      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {dateFrom == undefined || dateFrom == ""
            ? ""
            : ` วันที่ ${dateFrom} ถึง ${dateTo}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {hnSearch == undefined || hnSearch == "" ? "" : `HN : ${hnSearch}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {nameWork == undefined || nameWork == ""
            ? ""
            : `เวร : ${nameWork} เวลา ${timeFrom} ถึง ${timeTo}`}
        </h>
      </Row>

      <br />

      <Row justify="center">
        <Col span={22}>
          <Table
            columns={columns}
            dataSource={data}
            className="table_report_stock_tackblood"
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
    </div>
  );
};
