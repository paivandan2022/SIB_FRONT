// P4P
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
import ExcelJS from "exceljs";
import moment from "moment";
import "moment/locale/th";

import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { MdManageSearch, MdOutlinePrint, MdRefresh } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import ReactToPrint from "react-to-print";

import Layout from "../components/layout";
import api from "../lib/api";

const { TabPane } = Tabs;
const { Option } = Select;


const Report_daily_P4P = () => {

  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [frm_searchdata] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [data_table, setdata_table] = useState();
  const [dataStaff, setDataStaff] = useState();
  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [staffSearch, setstaffSearch] = useState();
  const printComponent = useRef(null);

  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [nameWork, setNameWork] = useState();
  const [timeChoice, setTimeChoice] = useState();

  const LoadStaff = async () => {
    const result = await api.get("/Staff_choice");
    setDataStaff(result.data[0]);
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
    setTimeFrom();
    setTimeTo();
    setNameWork();
    setstaffSearch();
  };

  const Search_data = async () => {
    const frmData = frm_searchdata.getFieldValue();
    document.getElementById("selectStaff").blur();
    if (frmData.staff_code == "") {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "กรุณาเลือกผู้ทำรายการ",
      });
    } else {
      const frmData = frm_searchdata.getFieldValue();
      let time_from;
      let time_to;
      let name_work;

      const time = timeChoice.filter((item) => item.id == frmData.time_search);
      time_from = time[0]?.time_from;
      time_to = time[0]?.time_to;
      name_work = time[0]?.name_working;

      const result = await api.get("/Get_daily_p4p", {
        params: {
          date_start: moment(frmData.date_from)
            .subtract(543, "years")
            .format("YYYY-MM-DD"),
          date_last: moment(frmData.date_to)
            .subtract(543, "years")
            .format("YYYY-MM-DD"),
          time_from: time_from,
          time_to: time_to,
          staff_code: frmData.staff_code,
        },
      });
      setdata_table(result.data[0]);
      let sum_count = result.data[0]
        .map((item) => item.count_number)
        .reduce((partialSum, a) => partialSum + a, 0);
      const keytype = [];
      const keyList = result.data[0];

      let lastType = "";
      keyList.forEach((item, index) => {
        //เช็ค part
        if (item.part !== lastType) {
          keytype.push({
            process: item.part,
            type: "header",
          });
          lastType = item.part;
        }
        keytype.push(item);
      });

      const dataNew = [];
      let countNo = 0;

      for (let i = 0; i < keytype.length; i++) {
        if (keytype[i].type == "header") {
          countNo = null;
        } else {
          countNo += 1;
        }
        dataNew[i] = {
          ...keytype[i],
          no: countNo,
          sum: sum_count,
        };
      }
      dataNew.push({
        process: "รวม",
        count_number: sum_count,
        sum: sum_count,
      });

      setdata_table(dataNew);

      const staffPrint = dataStaff.filter(
        (item) => item.user_name == frmData.staff_code
      );
      setdata_print(dataNew);
      setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
      setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
      setstaffSearch(staffPrint[0].fullname);
      setTimeFrom(time_from);
      setTimeTo(time_to);
      setNameWork(name_work);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: "1%",
    },
    {
      title: "งานที่ทำ",
      dataIndex: "process",
      key: "process",
      width: "12%",
      render: (text, record, index) => {
        return record.type == "header" || record.process == "รวม" ? (
          <b
            style={{
              fontSize: "14px",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            {record.process}
          </b>
        ) : (
          record.process
        );
      },
    },
    {
      title: "จำนวนที่ทำ",
      dataIndex: "count_number",
      key: "count_number",
      align: "center",
      width: "4%",
    },
    {
      title: "%",
      dataIndex: "",
      key: "",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return record.type == "header" || record.sum == 0
          ? ""
          : `${((record.count_number * 100) / record.sum).toFixed(2)} %`;
      },
    },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานCT_ratio_ward");
    const worksheet = workbook.getWorksheet("รายงานCT_ratio_ward");

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
      { header: "", key: "c5", width: 35 },
      { header: "", key: "c6", width: 10 },
      { header: "", key: "c7", width: 10 },
      { header: "", key: "c8", width: 10 },
      { header: "", key: "c9" },
      { header: "", key: "c10" },
      { header: "", key: "c11" },
      { header: "", key: "c12" },
    ];
    worksheet.addRows([
      { c5: "รายงานP4P" },
      {
        c5:
          " " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c5: staffSearch === "" ? "" : " ผู้ทำรายการ :" + staffSearch,
      },
      {
        c5:
          nameWork === ""
            ? ""
            : " เวร  : " + nameWork + " เวลา " + timeFrom + " ถึง " + timeTo,
      },

      {
        c5: " ",
      },
      {
        c4: "ลำดับ",
        c5: "งานที่ทำ",
        c6: "จำนวนที่ทำ",
        c7: "%",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      const c7 =
        data_table[i].type == "header" || data_table[i].sum == 0
          ? ""
          : `${((data_table[i].count_number * 100) / data_table[i].sum).toFixed(
              2
            )} %`;
      const c6 =
        data_table[i].type == "header" || data_table[i].sum == 0
          ? ""
          : Number(data_table[i].count_number);

      dataTest[i] = {
        c4: i + 1,
        c5: data_table[i].process,
        c6: c6,
        c7: c7,
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
    a.download = `รายงานP4P  ${date}.` + format;
    a.click();
    a.remove();
  };

  useEffect(async () => {
    LoadStaff();
    LoadTime();
  }, []);
  return (
    <>
      <Layout keyTab="report_daily_P4P">
        <div>
          <Head>
            <title>SIBSOFT : รายงาน P4P</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงาน P4P" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          // time_from: moment("08:00:00", "HH:mm:ss"),
                          // time_to: moment("23:59:59", "HH:mm:ss"),
                          staff_code: "",
                          time_search: 1,
                        }}
                        onFinish={Search_data}
                      >
                        <Row>
                          <Form.Item label="วันที่" name="date_from">
                            <DatePicker
                              style={{ width: "100%" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={() =>
                                document.getElementById("selectStaff").focus()
                              }
                            />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="ถึง" name="date_to">
                            <DatePicker
                              style={{ width: "100%" }}
                              format="DD-MM-YYYY"
                              locale={th_TH}
                              onChange={() =>
                                document.getElementById("selectStaff").focus()
                              }
                            />
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="ผู้ทำรายการ" name="staff_code">
                            <Select
                              id="selectStaff"
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "200px" }}
                              placeholder="ผู้ทำรายการ"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {dataStaff?.map((item) => (
                                <Option
                                  key={item.user_name}
                                  value={item.user_name}
                                >
                                  {item.fullname}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          &nbsp;
                          <Form.Item label="เวร" name="time_search">
                            <Select
                              id="selectWork"
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
                              marginLeft: "20px",
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
                          staffSearch={staffSearch}
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
                        : "รายงานP4P"}
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
                      {staffSearch == undefined || staffSearch == ""
                        ? ""
                        : ` ผู้ทำรายการ : ${staffSearch}`}
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
                        scroll={{ y: 300 }}
                        rowClassName={(record, index) => {
                          return record.type == "header" ? "clickRow" : "";
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

export default Report_daily_P4P;

const PrintDetail = ({
  data,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  nameWork,
  staffSearch,
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
      title: "งานที่ทำ",
      dataIndex: "process",
      key: "process",
      width: "12%",
      render: (text, record, index) => {
        return record.type == "header" || record.process == "รวม" ? (
          <b
            style={{
              fontSize: "14px",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            {record.process}
          </b>
        ) : (
          record.process
        );
      },
    },
    {
      title: "จำนวนที่ทำ",
      dataIndex: "count_number",
      key: "count_number",
      align: "center",
      width: "4%",
    },
    {
      title: "%",
      dataIndex: "",
      key: "",
      align: "center",
      width: "4%",
      render: (text, record, index) => {
        return record.type == "header" || record.sum == 0
          ? ""
          : `${((record.count_number * 100) / record.sum).toFixed(2)} %`;
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
        <h style={{ fontSize: "18px" }}>รายงานP4P</h>
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
          {staffSearch == undefined || staffSearch == ""
            ? ""
            : ` ผู้ทำรายการ : ${staffSearch}`}
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
            className="xm"
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered
            size="small"
            rowClassName={(record, index) => {
              return record.type == "header" ? "clickRow" : "";
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
