// การจ่ายเลือด
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


const Report_daily_tranblood = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [frm_searchdata] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data_table, setdata_table] = useState();
  const [data_Ward, setData_Ward] = useState();
  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [wardSearch, setwardSearch] = useState();
  const [hn_search, setHn_search] = useState();

  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();

  const [timeChoice, setTimeChoice] = useState();
  const printComponent = useRef(null);

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
    setwardSearch();
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

    const result = await api.get("/Get_daily_trans_blood", {
      params: {
        date_start: moment(frmData.date_from)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        date_last: moment(frmData.date_to)
          .subtract(543, "years")
          .format("YYYY-MM-DD"),
        ward_code: frmData.ward_code,
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

    const keytype = [];
    const keyList = result.data[0];
    let lastType = "";
    const dataNew = [];
    let lastdep = "";
    let countNo = 0;
    keyList.forEach((item, index) => {
      //เช็ค dep
      if (item.dep_code !== lastdep) {
        keytype.push({
          type_name: 1,
          department: item.department,
        });

        lastdep = item.dep_code;
      }

      // เช็ค hn
      if (item.hn !== lastType) {
        keytype.push({
          type_name: 2,
          hn: item.hn,
          patient_name: item.patient_name,
        });
        lastType = item.hn;
      }
      keytype.push(item);
    });

    //count NO
    for (let i = 0; i < keytype.length; i++) {
      if (keytype[i].type_name == 1 || keytype[i].type_name == 2) {
        countNo = null;
      } else {
        countNo += 1;
      }
      dataNew[i] = {
        ...keytype[i],
        no: countNo,
      };
    }

    setdata_table(dataNew);

    setdata_print(dataNew);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
    setHn_search(frmData.hn_search);
    setTimeFrom(time_from);
    setTimeTo(time_to);
    setNameWork(name_work);

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
    },
    {
      title: "Component",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return record.type_name == 1 || record.type_name == 2
          ? ""
          : record.type_name;
      },
    },
    {
      title: "Unit no.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "4%",
    },
    {
      title: "Donor Gr.",
      dataIndex: "blood_group",
      key: "blood_group",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return !record.blood_group ? "" : record.blood_group + record.blood_rh;
      },
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        return record.type_name == 1 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            จุดที่จ่าย :
          </b>
        ) : record.type_name == 2 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.hn}
          </b>
        ) : (
          record.hn
        );
      },
    },
    {
      title: "Patient name",
      dataIndex: "patient_name",
      key: "patient_name",
      align: "center",
      width: "7%",
      render: (text, record, index) => {
        return record.type_name == 1 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.department}
          </b>
        ) : record.type_name == 2 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.patient_name}
          </b>
        ) : (
          record.patient_name
        );
      },
    },
    {
      title: "Patient Gr.",
      dataIndex: "p_gr",
      key: "p_gr",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return !record.p_gr ? "" : record.p_gr + record.p_rh;
      },
    },
    {
      title: "Date Trans",
      dataIndex: "date_time",
      key: "date_time",
      align: "center",
      width: "5%",
    },
    {
      title: "Staff Trans",
      dataIndex: "staff_trans",
      key: "staff_trans",
      align: "center",
      width: "7%",
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานการจ่ายเลือด");
    const worksheet = workbook.getWorksheet("รายงานการจ่ายเลือด");

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

    let ward_name = {};
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
      { c7: "รายงานการจ่ายเลือด" },
      {
        c7:
          " " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c7: ward_name === "" ? "" : "Ward : " + ward_name,
      },
      {
        c7: frmData.hn_search === "" ? "" : "HN : " + frmData.hn_search,
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
        c5: "Component",
        c6: "Unit no.",
        c7: "Donor Gr.",
        c8: "HN",
        c9: "Patient name",
        c10: "Patient Gr.",
        c11: "Date Trans",
        c12: "Staff Trans",
      },
    ]);
    let dataTest = [];

    for (let i = 0; i < data_table.length; i++) {
      console.log(data_table[i].department);
      const c8 =
        data_table[i].type_name == 1
          ? "จุดที่จ่าย : "
          : data_table[i].type_name == 2
          ? data_table[i].hn
          : data_table[i].hn;

      const c9 =
        data_table[i].type_name == 1
          ? data_table[i].department
          : data_table[i].type_name == 2
          ? data_table[i].patient_name
          : data_table[i].patient_name;

      dataTest[i] = {
        c4: data_table[i].no,
        c5:
          data_table[i].type_name == 1 || data_table[i].type_name == 2
            ? ""
            : data_table[i].type_name,
        c6: data_table[i].blood_no,
        c7: !data_table[i].blood_group
          ? ""
          : data_table[i].blood_group + data_table[i].blood_rh,
        c8: c8,
        c9: c9,
        c10: !data_table[i].p_gr ? "" : data_table[i].p_gr + data_table[i].p_rh,
        c11: data_table[i].date_time,
        c12: data_table[i].staff_trans,
      };
    }
    console.log("**", data_table);
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
    a.download = `รายงานการจ่ายเลือด  ${date}.` + format;
    a.click();
    a.remove();
  };

  useEffect(async () => {
    LoadWard();
    LoadTime();
  }, []);

  return (
    <>
      <Layout keyTab="report_daily_tranblood">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน การจ่ายเลือด</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานการจ่ายเลือด" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          ward_code: "",
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
                          <Form.Item label="Ward" name="ward_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "170px" }}
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
                          <Form.Item label="HN" name="hn_search">
                            <Input
                              placeholder="HN"
                              style={{ width: "150px" }}
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
                          wardSearch={wardSearch}
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
                        : "รายงานการจ่ายเลือด"}
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
                      {wardSearch == undefined || wardSearch == ""
                        ? ""
                        : `Ward : ${wardSearch}`}
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
                        loading={loading}
                        className="xm"
                        dataSource={data_table}
                        columns={columns}
                        pagination={false}
                        bordered
                        size="small"
                        scroll={{ y: 340 }}
                        rowClassName={(record, index) => {
                          return record.type_name == 1 ? "clickRow" : "";
                        }}
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

export default Report_daily_tranblood;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  wardSearch,
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
    },
    {
      title: "Component",
      dataIndex: "type_name",
      key: "type_name",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return record.type_name == 1 || record.type_name == 2
          ? ""
          : record.type_name;
      },
    },
    {
      title: "Unit no.",
      dataIndex: "blood_no",
      key: "blood_no",
      align: "center",
      width: "4%",
    },
    {
      title: "Donor Gr.",
      dataIndex: "blood_group",
      key: "sum_tran",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return !record.blood_group ? "" : record.blood_group + record.blood_rh;
      },
    },
    {
      title: "HN",
      dataIndex: "hn",
      key: "hn",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        return record.type_name == 1 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            จุดที่จ่าย :
          </b>
        ) : record.type_name == 2 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.hn}
          </b>
        ) : (
          record.hn
        );
      },
    },
    {
      title: "Patient name",
      dataIndex: "patient_name",
      key: "patient_name",
      align: "center",
      width: "7%",
      render: (text, record, index) => {
        return record.type_name == 1 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.department}
          </b>
        ) : record.type_name == 2 ? (
          <b style={{ fontSize: "13px", textDecoration: "underline" }}>
            {record.patient_name}
          </b>
        ) : (
          record.patient_name
        );
      },
    },
    {
      title: "Patient Gr.",
      dataIndex: "p_gr",
      key: "p_gr",
      align: "center",
      width: "3%",
      render: (text, record, index) => {
        return !record.p_gr ? "" : record.p_gr + record.p_rh;
      },
    },
    {
      title: "Date Trans",
      dataIndex: "date_time",
      key: "date_time",
      align: "center",
      width: "5%",
    },
    {
      title: "Staff Trans",
      dataIndex: "staff_trans",
      key: "staff_trans",
      align: "center",
      width: "7%",
    },
  ];

  return (
    <div
      className="print"
      style={{ backgroundColor: "white", width: "1370px", height: "960px" }}
    >
      <br />
      <Row justify="center">
        <h style={{ fontSize: "18px" }}>รายงานการจ่ายเลือด</h>
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
          {wardSearch == undefined || wardSearch == ""
            ? ""
            : `Ward : ${wardSearch}`}
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
            rowClassName={(record, index) => {
              return record.type_name == 1 ? "clickRow" : "";
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
