// ตัดเลือดทิ้ง
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
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

const { Option } = Select;
const { TabPane } = Tabs;

const Report_daily_cut_blood = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const { RangePicker } = DatePicker;
  const printComponent = useRef(null);

  const [loading, setLoading] = useState(false);
  const [frm_searchdata] = Form.useForm();
  const [choice1, setchoice1] = useState();
  const [data_table, setdata_table] = useState();

  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();

  const [timeChoice, setTimeChoice] = useState();

  const [choice_input, setchoice_input] = useState();
  const [HosSearch, setHosSearch] = useState();
  const [fromcause, setfromcause] = useState();
  const [cause, setcause] = useState();

  useEffect(async () => {
    await loadcause();
    await LoadTime();
  }, []);

  const loadcause = async () => {
    const result = await api.get("/Blood_eject_choice");
    setcause(result.data[0]);
    console.log(result.data[0]);
  };

  const LoadTime = async () => {
    const result = await api.get("/timeWorking_choice");
    setTimeChoice(result.data[0]);
  };

  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setTimeFrom();
    setTimeTo();
    setNameWork();
    setchoice_input();
  };

  const Search_data = async () => {
    setLoading(true);
    const frmData = frm_searchdata.getFieldValue();
    console.log("frmData", frmData);
    let time_from;
    let time_to;
    let name_work;

    const time = timeChoice.filter((item) => item.id == frmData.time_search);
    time_from = time[0]?.time_from;
    time_to = time[0]?.time_to;
    name_work = time[0]?.name_working; 

    const result = await api.get("/Get_report_daily_cut_blood", {
      params: {
        date_from: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_to: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        choice_input: frmData.choice_input,
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
    console.log("result.data[0]", result.data[0]);
    setdata_table(result.data[0]);
    setdata_print(result.data[0]);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setchoice_input(frmData.choice_input);
    setTimeFrom(time_from);
    setTimeTo(time_to);
    setNameWork(name_work);
    setLoading(false);
  };
  const focus_gr = async () => {
    document.getElementById("choice_input_id").focus();
  };
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return record.type_name == "รวม" ? "" : index + 1;
      },
    },
    {
      title: "unit no",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "6%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Group",
      dataIndex: "gr",
      key: "gr",
      align: "center",
      width: "5%",
    },
    {
      title: "Type",
      dataIndex: "type_gr",
      key: "type_gr",
      align: "center",
      width: "5%",
    },

    {
      title: "สาเหตุ",
      dataIndex: "ej_note",
      key: "ej_note",
      align: "center",
      width: "20%",
    },
    {
      title: "วันที่ทำรายการ",
      dataIndex: "ej_date",
      key: "ej_date",
      align: "center",
      width: "8%",
    },
    {
      title: "ผู้ทำรายการ",
      dataIndex: "ej_staff",
      key: "ej_staff",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานตัดเลือดทิ้ง");
    const worksheet = workbook.getWorksheet("รายงานตัดเลือดทิ้ง");

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

    // const result = await api.get("/Hospitals_choice");
    let data_from = [];
    let data = frmData.choice_input;

    if (data == "") {
      data_from = "ทั้งหมด";
    } else {
      data_from = frmData.choice_input;
    }
    worksheet.columns = [
      { header: "", key: "c1", width: 5 },
      { header: "", key: "c2", width: 14 },
      { header: "", key: "c3", width: 7 },
      { header: "", key: "c4", width: 7 },
      { header: "", key: "c5", width: 40 },
      { header: "", key: "c6", width: 20 },
      { header: "", key: "c7", width: 30 },
      { header: "", key: "c8", width: 30 },
      { header: "", key: "c9", width: 20 },
      { header: "", key: "c10", width: 20 },
      { header: "", key: "c11", width: 20 },
      { header: "", key: "c12", width: 20 },
      { header: "", key: "c13", width: 20 },
      { header: "", key: "c14", width: 20 },
      { header: "", key: "c15", width: 20 },
      { header: "", key: "c16", width: 20 },
      { header: "", key: "c17", width: 20 },
      { header: "", key: "c18", width: 20 },
      { header: "", key: "c19", width: 20 },
      { header: "", key: "c20", width: 20 },
    ];
    worksheet.addRows([
      { c5: "       รายงานตัดเลือดทิ้ง" },
      {
        c5:
          " " +
          moment(frmData.Request_date_blood_search).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.Request_date_blood_to_search).format("DD-MM-YYYY"),
      },
      {
        c5:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },
      {
        c5: " สาเหตุ  :  " + data_from,
      },
      {
        c4: " ",
      },
      {
        c1: "ลำดับ",
        c2: "unit no",
        c3: "Group",
        c4: "Type",
        c5: "สาเหตุ",
        c6: "วันที่ทำรายการ",
        c7: "ผู้ทำรายการ",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].unit_no,
        c3: data_table[i].gr,
        c4: data_table[i].type_gr,
        c5: data_table[i].ej_note,
        c6: data_table[i].ej_date,
        c7: data_table[i].ej_staff,
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
    a.download = `รายงานตัดเลือดทิ้ง  ${date}.` + format;
    a.click();
    a.remove();
  };

  return (
    <>
      <Layout keyTab="report_daily_cut_blood">
        <div>
          <Head>
            <title>SIBSOFT : รายงานตัดเลือดทิ้ง</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานตัดเลือดทิ้ง" key="1">
                  <Row justify="center" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          choice_input: "",
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
                          <Form.Item label="สาเหตุ" name="choice_input">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "250px" }}
                              placeholder="สาเหตุ"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {cause?.map((item) => (
                                <Option key={item.id} value={item.ejc_name}>
                                  {item.ejc_name}
                                </Option>
                              ))}
                            </Select>
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
                          choice_inputs={choice_input}
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
                        : "รายงานตัดเลือดทิ้ง"}
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
                      {choice_input == undefined || choice_input == ""
                        ? " "
                        : ` สาเหตุ  :   ${choice_input} `}
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
                        columns={columns}
                        dataSource={data_table}
                        pagination={false}
                        bordered
                        size="small"
                        loading={loading}
                        scroll={{ y: 300 }}
                        // scroll={{
                        //   x: "calc(800px + 100%)",
                        //   // y: "40vh",
                        // }}
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

export default Report_daily_cut_blood;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  choice_inputs,
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
      title: "unit no",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "6%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Group",
      dataIndex: "gr",
      key: "gr",
      align: "center",
      width: "5%",
    },
    {
      title: "Type",
      dataIndex: "type_gr",
      key: "type_gr",
      align: "center",
      width: "5%",
    },

    {
      title: "สาเหตุ",
      dataIndex: "ej_note",
      key: "ej_note",
      align: "center",
      width: "20%",
    },
    {
      title: "วันที่ทำรายการ",
      dataIndex: "ej_date",
      key: "ej_date",
      align: "center",
      width: "6%",
    },
    {
      title: "ผู้ทำรายการ",
      dataIndex: "ej_staff",
      key: "ej_staff",
      align: "center",
      width: "8%",
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานตัดเลือดทิ้ง</h>
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
          {choice_inputs == undefined || choice_inputs == ""
            ? "สาเหตุ  :  ทั้งหมด"
            : ` สาเหตุ  :   ${choice_inputs} `}
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
            pagination={false}
            size="small"
          />
        </Col>
      </Row>
      {/* <Row>
        <span
          style={{ paddingRight: "10px", paddingBottom: "5px" }}
          id="footerPrint"
        >
          วันที่พิมพ์ : {date} เวลา : {time} น.
        </span>
      </Row> */}
    </div>
  );
};
