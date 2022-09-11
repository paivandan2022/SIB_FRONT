// จ่ายเลือด-คืน
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

const { TabPane } = Tabs;
const { Option } = Select;

const Report_donor_bloodresults = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [loading, setLoading] = useState(false);

  const [frm_searchdata] = Form.useForm();

  const [data_table, setdata_table] = useState();
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

    const result = await api.get("/Get_report_blood_result", {
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
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "9%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Collected date",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "8%",
    },
    {
      title: "Group",
      dataIndex: "Group",
      key: "Group",
      align: "center",
      width: "5%",
    },
    {
      title: "Rh",
      dataIndex: "Rh",
      key: "Rh",
      align: "center",
      width: "3%",
    },
    {
      title: "Saline",
      dataIndex: "Saline",
      key: "Saline",
      align: "center",
      width: "5%",
    },
    {
      title: "Papain",
      dataIndex: "Papain",
      key: "Papain",
      align: "center",
      width: "5%",
    },
    {
      title: "Coombs",
      dataIndex: "Coombs",
      key: "Coombs",
      align: "center",
      width: "5%",
    },
    {
      title: "Anti-A",
      dataIndex: "antia",
      key: "antia",
      align: "center",
      width: "5%",
    },
    {
      title: "Anti-B",
      dataIndex: "antib",
      key: "antib",
      align: "center",
      width: "5%",
    },
    {
      title: "HBsAg",
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      width: "5%",
    },
    {
      title: "TPHA",
      dataIndex: "TPHA",
      key: "TPHA",
      align: "center",
      width: "5%",
    },
    {
      title: "HIV",
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      width: "5%",
    },
    {
      title: "HBVNAT",
      dataIndex: "HBVNAT",
      key: "HBVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "HCVNAT",
      dataIndex: "HCVNAT",
      key: "HCVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "HIVNAT",
      dataIndex: "HIVNAT",
      key: "HIVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "ALT",
      dataIndex: "alt",
      key: "alt",
      align: "center",
      width: "5%",
    },
    {
      title: "HCV",
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      width: "5%",
    },
    {
      title: "HIVAg",
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      width: "5%",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      align: "center",
      width: "5%",
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
      { header: "", key: "c2", width: 13 },
      { header: "", key: "c3", width: 12 },
      { header: "", key: "c4" },
      { header: "", key: "c5" },
      { header: "", key: "c6" },
      { header: "", key: "c7" },
      { header: "", key: "c8" },
      { header: "", key: "c9" },
      { header: "", key: "c10" },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
      { header: "", key: "c13" },
      { header: "", key: "c14" },
      { header: "", key: "c15" },
      { header: "", key: "c16" },
      { header: "", key: "c17" },
      { header: "", key: "c18" },
      { header: "", key: "c19" },
      { header: "", key: "c20" },
    ];
    worksheet.addRows([
      { c9: "รายงานผลตรวจเลือด" },
      {
        c9:
          "ประจำวันที่ " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c9:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c7: "",
      },
      {
        c1: "#",
        c2: "Unit no.",
        c3: "Collected date",
        c4: "Group",
        c5: "RH",
        c6: "Saline",
        c7: "Papain",
        c8: "Coombs",
        c9: "Anti-A",
        c10: "Anti-B",
        c11: "HBsAg",
        c12: "TPHA",
        c13: "HIV",
        c14: "HBVNAT",
        c15: "HCVNAT",
        c16: "HIVNAT",
        c17: "ALT",
        c18: "HCV",
        c19: "HIVAg",
        c20: "Result",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].unit_no,
        c3: data_table[i].donor_date,
        c4: data_table[i].Group,
        c5: data_table[i].Rh,
        c6: data_table[i].Saline,
        c7: data_table[i].Papain,
        c8: data_table[i].Coombs,
        c9: data_table[i].antia,
        c10: data_table[i].antib,
        c11: data_table[i].hbsag,
        c12: data_table[i].TPHA,
        c13: data_table[i].hiv,
        c14: data_table[i].HBVNAT,
        c15: data_table[i].HCVNAT,
        c16: data_table[i].HIVNAT,
        c17: data_table[i].alt,
        c18: data_table[i].hcv,
        c19: data_table[i].hivag,
        c20: data_table[i].result,
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

    // worksheet.pageSetup.horizontalCentered = true;
    // worksheet.pageSetup.verticalCentered = true;

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
      <Layout keyTab="report_donor_bloodresults">
        <div>
          <Head>
            <title>SIBSOFT : รายงานผลตรวจเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานผลตรวจเลือด" key="1">
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
                          <Form.Item label="วันที่เจาะ" name="date_from">
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
                        : "รายงานผลตรวจเลือด"}
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
                        // bordered
                        size="small"
                        scroll={{ y: 300 }}
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
      width: "1%",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Unit_no",
      dataIndex: "unit_no",
      key: "unit_no",
      align: "center",
      width: "9%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "center" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "Collected date",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "8%",
    },
    {
      title: "Group",
      dataIndex: "Group",
      key: "Group",
      align: "center",
      width: "5%",
    },
    {
      title: "Rh",
      dataIndex: "Rh",
      key: "Rh",
      align: "center",
      width: "3%",
    },
    {
      title: "Saline",
      dataIndex: "Saline",
      key: "Saline",
      align: "center",
      width: "5%",
    },
    {
      title: "Papain",
      dataIndex: "Papain",
      key: "Papain",
      align: "center",
      width: "5%",
    },
    {
      title: "Coombs",
      dataIndex: "Coombs",
      key: "Coombs",
      align: "center",
      width: "5%",
    },
    {
      title: "Anti-A",
      dataIndex: "antia",
      key: "antia",
      align: "center",
      width: "5%",
    },
    {
      title: "Anti-B",
      dataIndex: "antib",
      key: "antib",
      align: "center",
      width: "5%",
    },
    {
      title: "HBsAg",
      dataIndex: "hbsag",
      key: "hbsag",
      align: "center",
      width: "5%",
    },
    {
      title: "TPHA",
      dataIndex: "TPHA",
      key: "TPHA",
      align: "center",
      width: "5%",
    },
    {
      title: "HIV",
      dataIndex: "hiv",
      key: "hiv",
      align: "center",
      width: "5%",
    },
    {
      title: "HBVNAT",
      dataIndex: "HBVNAT",
      key: "HBVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "HCVNAT",
      dataIndex: "HCVNAT",
      key: "HCVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "HIVNAT",
      dataIndex: "HIVNAT",
      key: "HIVNAT",
      align: "center",
      width: "5%",
    },
    {
      title: "ALT",
      dataIndex: "alt",
      key: "alt",
      align: "center",
      width: "5%",
    },
    {
      title: "HCV",
      dataIndex: "hcv",
      key: "hcv",
      align: "center",
      width: "5%",
    },
    {
      title: "HIVAg",
      dataIndex: "hivag",
      key: "hivag",
      align: "center",
      width: "5%",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      align: "center",
      width: "5%",
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานผลตรวจเลือด</h>
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
            // id="report_stock_tackblood_tb_id"
            className="print_a4"
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </Col>
        {/* <Row>
          <p
          style={{ paddingRight: "10px", paddingBottom: "5px" }}
          id="footerPrint"
          >
            วันที่พิมพ์ : {date} เวลา : {time} น.
          </p>
        </Row> */}
      </Row>
    </div>
  );
};
