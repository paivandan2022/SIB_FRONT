import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Table,
  Tabs,
  Select
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

const Report_donor_bloodresults = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [loading, setLoading] = useState(false);

  const [frm_searchdata] = Form.useForm();

  const [data_table, setdata_table] = useState();
  const [data_Doctor, setData_Doctor] = useState();
  const [data_Ward, setData_Ward] = useState();
  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

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

    const result = await api.get("/Get_Get_daily_blood_deposit", {
      params: {
        date_from: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_to: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
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
    console.log("vvvvvvvvvvvvv", result.data[0]);
    setdata_table(result.data[0]);
    setdata_print(result.data[0]);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
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
        return index + 1;
      },
    },
    {
      title: "Unit_no",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Group",
      dataIndex: "blood_group",
      key: "blood_group",
      align: "center",
      width: "4%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>
              &nbsp;&nbsp;{record.blood_group}
              {record.blood_rh}
            </span>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "4%",
    },
    {
      title: "รายการฝาก",
      dataIndex: "dep_comm_name",
      key: "dep_comm_name",
      align: "center",
      width: "7%",
    },
    {
      title: "วันที่ฝาก",
      dataIndex: "dep_datetime",
      key: "dep_datetime",
      align: "center",
      width: "5%",
    },
    {
      title: "ฝากถึงวันที่",
      dataIndex: "dep_datetime_end",
      key: "dep_datetime_end",
      align: "center",
      width: "5%",
    },
    {
      title: "Note",
      dataIndex: "dep_note",
      key: "dep_note",
      align: "center",
      width: "5%",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "dep_staff",
      key: "dep_staff",
      align: "center",
      width: "9%",
    },
    {
      title: "วันที่จ่าย",
      dataIndex: "dep_datetime_trans",
      key: "dep_datetime_trans",
      align: "center",
      width: "7%",
    },
    {
      title: "ผู้จ่าย",
      dataIndex: "dep_staff_trans",
      key: "dep_staff_trans",
      align: "center",
      width: "9%",
    },
  ];

  const handlerClickDownloadButton = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานผลตรวจเลือด", {
      pageSetup: {
        horizontalCentered: true,
        verticalCentered: true,
      },
    });
    const worksheet = workbook.getWorksheet("รายงานผลตรวจเลือด");

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
      { header: "", key: "c1" },
      { header: "", key: "c2", width: 15 },
      { header: "", key: "c3", width: 10 },
      { header: "", key: "c4" },
      { header: "", key: "c5", width: 20 },
      { header: "", key: "c6", width: 15 },
      { header: "", key: "c7", width: 15 },
      { header: "", key: "c8", width: 15 },
      { header: "", key: "c9", width: 15 },
      { header: "", key: "c10", width: 15 },
      { header: "", key: "c11", width: 15 },
    ];
    worksheet.addRows([
      { c6: "รายงานผลตรวจเลือด" },
      {
        c6:
          "ประจำวันที่ " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c6:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c6: "",
      },
      {
        c1: "#",
        c2: "Unit no.",
        c3: "Group",
        c4: "Type",
        c5: "รายการฝาก",
        c6: "วันที่ฝาก",
        c7: "ฝากถึงวันที่",
        c8: "Note",
        c9: "ผู้บันทึก",
        c10: "วันที่จ่าย",
        c11: "ผู้จ่าย",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].blood_no,
        c3: data_table[i].blood_group + data_table[i].blood_rh,
        c4: data_table[i].s_name,
        c5: data_table[i].dep_comm_name,
        c6: data_table[i].dep_datetime,
        c7: data_table[i].dep_datetime_end,
        c8: data_table[i].dep_note,
        c9: data_table[i].dep_staff,
        c10: data_table[i].dep_datetime_trans,
        c11: data_table[i].dep_staff_trans,
      };
    }
    worksheet.addRows(dataTest);

    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
        "B",
        "C",
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
    a.download = `รายงานการผลตรวจเลือด วันที่ ${date}.` + format;
    a.click();
    a.remove();
  };

  return (
    <>
      <Layout keyTab="report_daily_depositblood">
        <div>
          <Head>
            <title>SIBSOFT : รายงานการฝากเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานการฝากเลือด" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          time_search: 1,
                        }}
                        onFinish={Search_data}
                      >
                        <Row justify="start">
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
                        : "รายงานการฝากเลือด"}
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
                        scroll={{ y: 320 }}
                        loading={loading}
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

export default Report_donor_bloodresults;

const PrintDetail = ({
  timeFrom,
  timeTo,
  nameWork,
  data,
  dateFrom,
  dateTo,
}) => {
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit_no",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Group",
      dataIndex: "blood_group",
      key: "blood_group",
      align: "center",
      width: "4%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>
              &nbsp;&nbsp;{record.blood_group}
              {record.blood_rh}
            </span>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "s_name",
      key: "s_name",
      align: "center",
      width: "4%",
    },
    {
      title: "รายการฝาก",
      dataIndex: "dep_comm_name",
      key: "dep_comm_name",
      align: "center",
      width: "7%",
    },
    {
      title: "วันที่ฝาก",
      dataIndex: "dep_datetime",
      key: "dep_datetime",
      align: "center",
      width: "5%",
    },
    {
      title: "ฝากถึงวันที่",
      dataIndex: "dep_datetime_end",
      key: "dep_datetime_end",
      align: "center",
      width: "5%",
    },
    {
      title: "Note",
      dataIndex: "dep_note",
      key: "dep_note",
      align: "center",
      width: "5%",
    },
    {
      title: "ผู้บันทึก",
      dataIndex: "dep_staff",
      key: "dep_staff",
      align: "center",
      width: "9%",
    },
    {
      title: "วันที่จ่าย",
      dataIndex: "dep_datetime_trans",
      key: "dep_datetime_trans",
      align: "center",
      width: "7%",
    },
    {
      title: "ผู้จ่าย",
      dataIndex: "dep_staff_trans",
      key: "dep_staff_trans",
      align: "center",
      width: "9%",
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานการฝากเลือด</h>
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
          {nameWork == undefined || nameWork == ""
            ? ""
            : `เวร : ${nameWork} เวลา ${timeFrom} ถึง ${timeTo}`}
        </h>
      </Row>
      <br />
      <Row justify="center" style={{ paddingBottom: "5px" }}>
        <Col span={22}>
          <Table
            id="report_stock_tackblood_tb_id"
            className="print_a4"
            columns={columns}
            dataSource={data}
            // pagination={{
            //   hideOnSinglePage: true,
            //   showSizeChanger: false,
            //   pageSize: 35,
            // }}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
    </div>
  );
};
