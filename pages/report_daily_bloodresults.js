// การขอเลือด
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
import ExcelJS from "exceljs";
import Head from "next/head";
import ReactToPrint from "react-to-print";

import th_TH from "antd/lib/date-picker/locale/th_TH";
import moment from "moment";
import "moment/locale/th";
import React, { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdOutlinePrint, MdRefresh } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import Layout from "../components/layout";
import api from "../lib/api";

const { Option } = Select;
const { TabPane } = Tabs;

const Report_daily_bloodresults = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [frm_searchdata] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data_table, setdata_table] = useState();
  const [data_Doctor, setData_Doctor] = useState();
  const [data_Ward, setData_Ward] = useState();
  const [timeChoice, setTimeChoice] = useState();

  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [docSearch, setDocSearch] = useState();
  const [wardSearch, setwardSearch] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();

  const printComponent = useRef(null);

  const LoadDoctor = async () => {
    const result = await api.get("/Doctor_choice");
    setData_Doctor(result.data[0]);
  };
  const LoadWard = async () => {
    const result = await api.get("/Ward_choice");
    setData_Ward(result.data[0]);
  };

  const LoadTime = async () => {
    const result = await api.get("/timeWorking_choice");
    setTimeChoice(result.data[0]);
  };

  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setDocSearch();
    setwardSearch();
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

    const result = await api.get("/Get_daily_request", {
      params: {
        date_start: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_last: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        doc_code: frmData.doc_code,
        ward_code: frmData.ward_code,
        time_from: time_from,
        time_to: time_to,
      },
    });
    // console.log("result", result.data[0]);
    if (result.data[0].length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
    let dataSource = [];

    let temCount = 1;
    let temIndex = 0;
    let countNo = 0;

    result.data[0]?.forEach((item, index) => {
      const doctor_name = `${item.doctor_name}`;
      const ward_name = `${item.ward_name}`;
      if (dataSource[index - 1]?.doctor_name == doctor_name) {
        temCount += 1;
        dataSource.push({
          ...item,
          rowSpan: 0,
        });
        if (index + 1 === result.data[0].length) {
          dataSource[temIndex].rowSpan = temCount;
        }
      } else {
        dataSource.push({
          ...item,
          rowSpan: 1,
          no: (countNo += 1),
        });

        if (dataSource[temIndex]) {
          dataSource[temIndex].rowSpan = temCount;
        }
        temIndex = index;
        temCount = 1;
      }
    });

    let dataSourceNew = [];
    let temCountWard = 1;
    let temIndexWard = 0;
    dataSource?.forEach((item, index) => {
      const ward_name = `${item.ward_name}`;
      const doctor_name = `${item.doctor_name}`;

      if (
        dataSourceNew[index - 1]?.ward_name == ward_name &&
        dataSourceNew[index - 1]?.doctor_name == doctor_name
      ) {
        temCountWard += 1;
        dataSourceNew.push({
          ...item,
          rowSpan2: 0,
        });
        if (index + 1 === dataSource.length) {
          dataSourceNew[temIndexWard].rowSpan2 = temCountWard;
        }
      } else if (
        dataSourceNew[index - 1]?.ward_name == ward_name &&
        dataSourceNew[index - 1]?.doctor_name != doctor_name
      ) {
        dataSourceNew.push({
          ...item,
          rowSpan2: 1,
        });

        if (dataSourceNew[temIndexWard]) {
          dataSourceNew[temIndexWard].rowSpan2 = temCountWard;
        }
        temIndexWard = index;
        temCountWard = 1;
      } else {
        dataSourceNew.push({
          ...item,
          rowSpan2: 1,
        });

        if (dataSourceNew[temIndexWard]) {
          dataSourceNew[temIndexWard].rowSpan2 = temCountWard;
        }
        temIndexWard = index;
        temCountWard = 1;
      }
    });
    setdata_table(dataSourceNew);
    setdata_print(dataSourceNew);

    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setTimeFrom(time_from);
    setTimeTo(time_to);
    setNameWork(name_work);

    if (frmData.doc_code != "") {
      const result = await api.get("/Doctor_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].code == frmData.doc_code) {
          setDocSearch(result.data[0][i].name);
        }
      }
    } else {
      setDocSearch("");
    }
    if (frmData.ward_code != "") {
      const result = await api.get("/Ward_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].ward == frmData.ward_code) {
          setwardSearch(result.data[0][i].name);
        }
      }
    } else {
      setwardSearch("");
    }

    setLoading(false);
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "4%",
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Doctor",
      dataIndex: "doctor_name",
      key: "doctor_name",
      align: "center",
      width: "10%",
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Ward",
      dataIndex: "ward_name",
      key: "ward_name",
      align: "center",
      width: "10%",
      onCell: (record, index) => ({
        rowSpan: record.rowSpan2,
      }),
    },
    {
      title: "Component",
      dataIndex: "component_name",
      key: "component_name",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวนที่ขอ",
      dataIndex: "sum_req",
      key: "sum_req",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวนที่ได้",
      dataIndex: "sum_tran",
      key: "sum_tran",
      align: "center",
      width: "5%",
    },
    {
      title: "ส่วนต่าง",
      dataIndex: "aa",
      key: "aa",
      align: "center",
      width: "5%",
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานการขอเลือด");
    const worksheet = workbook.getWorksheet("รายงานการขอเลือด");

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

    let doc_name = {};
    let ward_name = {};

    if (frmData.doc_code != "") {
      const result = await api.get("/Doctor_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].code == frmData.doc_code) {
          doc_name = result.data[0][i].name;
        }
      }
    } else {
      doc_name = "";
    }
    if (frmData.ward_code != "") {
      const result = await api.get("/Ward_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].ward == frmData.ward_code) {
          ward_name = result.data[0][i].name;
        }
      }
    } else {
      ward_name = "";
    }

    worksheet.columns = [
      { header: "", key: "c1" },
      { header: "", key: "c2" },
      { header: "", key: "c3" },
      { header: "", key: "c4", width: 7 },
      { header: "", key: "c5", width: 25 },
      { header: "", key: "c6", width: 20 },
      { header: "", key: "c7", width: 20 },
      { header: "", key: "c8", width: 10 },
      { header: "", key: "c9", width: 10 },
      { header: "", key: "c10", width: 10 },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
    ];
    worksheet.addRows([
      { c7: "รายงานการขอเลือด" },
      {
        c7:
          " " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c7: doc_name === "" ? "" : "Doctor : " + doc_name,
      },
      {
        c7: ward_name === "" ? "" : "Ward : " + ward_name,
      },
      {
        c7:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c7: " ",
      },
      {
        c4: "ลำดับ",
        c5: "แพทย์ผู้สั่ง",
        c6: "Ward",
        c7: "Component",
        c8: "จำนวนที่ขอ",
        c9: "จำนวนที่ได้",
        c10: "ส่วนต่าง",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c4: i + 1,
        c5: data_table[i].doctor_name,
        c6: data_table[i].ward_name,
        c7: data_table[i].component_name,
        c8: Number(data_table[i].sum_req),
        c9: Number(data_table[i].sum_tran),
        c10: Number(data_table[i].aa),
      };
    }
    worksheet.addRows(dataTest);
    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
        "C",
        "D",
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
    a.download = `รายงานการขอเลือด  ${date}.` + format;
    a.click();
    a.remove();
  };

  useEffect(async () => {
    await LoadDoctor();
    await LoadWard();
    await LoadTime();
  }, []);

  return (
    <>
      <Layout keyTab="report_daily_bloodresults">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน การขอเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>

        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานการขอเลือด" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          doc_code: "",
                          ward_code: "",
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
                          <Form.Item label="Doc" name="doc_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "170px" }}
                              placeholder="Doc"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {data_Doctor?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="Ward" name="ward_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "150px" }}
                              placeholder="Ward"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {data_Ward?.map((item) => (
                                <Option key={item.ward} value={item.ward}>
                                  {item.name}
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
                          docSearch={docSearch}
                          wardSearch={wardSearch}
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
                        : "รายงานการขอเลือด"}
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
                      {docSearch == undefined || docSearch == ""
                        ? ""
                        : `Doctor : ${docSearch}`}
                    </h>
                  </Row>
                  <Row justify="center">
                    <h style={{ fontSize: "14px" }}>
                      {wardSearch == undefined || wardSearch == ""
                        ? ""
                        : `Ward : ${wardSearch}`}
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

export default Report_daily_bloodresults;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  docSearch,
  wardSearch,
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
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Doctor",
      dataIndex: "doctor_name",
      key: "doctor_name",
      align: "center",
      width: "10%",
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: "Ward",
      dataIndex: "ward_name",
      key: "ward_name",
      align: "center",
      width: "10%",
      onCell: (record, index) => ({
        rowSpan: record.rowSpan2,
      }),
    },
    {
      title: "Component",
      dataIndex: "component_name",
      key: "component_name",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวนที่ขอ",
      dataIndex: "sum_req",
      key: "sum_req",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวนที่ได้",
      dataIndex: "sum_tran",
      key: "sum_tran",
      align: "center",
      width: "5%",
    },
    {
      title: "ส่วนต่าง",
      dataIndex: "aa",
      key: "aa",
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
        <h style={{ fontSize: "18px" }}>รายงานการขอเลือด</h>
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
          {docSearch == undefined || docSearch == ""
            ? ""
            : `Doctor : ${docSearch}`}
        </h>
      </Row>
      <Row justify="center">
        <h style={{ fontSize: "16px" }}>
          {wardSearch == undefined || wardSearch == ""
            ? ""
            : `Ward : ${wardSearch}`}
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
