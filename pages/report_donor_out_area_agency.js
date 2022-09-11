// ลงรับเลือด
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

const Report_donor_out_area_agency = () => {
  const [placement, SetPlacement] = React.useState("bottomLeft");
  const [loading, setLoading] = useState(false);
  const { TabPane } = Tabs;

  const [frm_searchdata] = Form.useForm();

  const [data_table, setdata_table] = useState();
  const [data_MOB, setData_MOB] = useState();
  const [data_print, setdata_print] = useState([]);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [docSearch, setDocSearch] = useState();
  const [wardSearch, setwardSearch] = useState();
  const printComponent = useRef(null);

  useEffect(async () => {
  await  LoadMOB();
  }, []);

  const Refresh = async () => {
    frm_searchdata.resetFields();
    setdata_table();
    setdata_print([]);
    setDateFrom();
    setDateTo();
    setDocSearch();
    setwardSearch();
  };

  const LoadMOB = async () => {
    const result = await api.get("/Mob_choice");
    setData_MOB(result.data[0]);
  };
  const Search_data = async () => {
    setLoading(true);
    const frmData = frm_searchdata.getFieldValue();

    const result = await api.get("/Get_report_out_area", {
      params: {
        date_from: moment(frmData.date_from)
          .subtract(543, "year")
          .format("YYYY-MM-DD"),
        date_to: moment(frmData.date_to)
          .subtract(543, "year")
          .format("YYYY-MM-DD"),
        mob_code: frmData.mob_code,
      },
    });
    console.log("result---+++", result.data[0]);
    let resultMOB = result.data[0];
    if (resultMOB.length <= 0) {
      Modal.warning({
        title: "แจ้งเตือน",
        content: "ไม่พบข้อมูล",
      });
    }
    const Data = resultMOB.map((item) => item);
    let item_count = 0;

    for (let index = 0; index < Data.length; index++) {
      const item = Data[index];
      console.log("item", item.donor_date);
      console.log("resultMOB.mob_code", resultMOB[index].donor_date);

      if (
        item.mob_code == resultMOB[index].mob_code &&
        item.bagcode == resultMOB[index].bagcode &&
        item.donor_date == resultMOB[index].donor_date
      ) {
        item_count++;
      }
    }
    console.log("item_count", item_count);
    setdata_table(resultMOB);
    setdata_print(resultMOB);
    setDateFrom(moment(frmData.date_from).format("DD-MM-YYYY"));
    setDateTo(moment(frmData.date_to).format("DD-MM-YYYY"));
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
      title: "สถานที่",
      dataIndex: "MOBNAME",
      key: "MOBNAME",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "วันที่",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "5%",
    },
    {
      title: "ประเภทถุง",
      dataIndex: "bagtype",
      key: "bagtype",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวน",
      dataIndex: "Apos",
      key: "Apos",
      align: "center",
      width: "5%",
    },
    // {
    //   title: "รวม",
    //   dataIndex: "num_sum",
    //   key: "",
    //   align: "center",
    //   width: "20%",
    //   render: (text, record) => {
    //     return (
    //       <div>
    //         {/* <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span> */}
    //         {Number(record.Aneg) +
    //           Number(record.A) +
    //           Number(record.Apos) +
    //           Number(record.Bneg) +
    //           Number(record.B) +
    //           Number(record.Bpos) +
    //           Number(record.Oneg) +
    //           Number(record.O) +
    //           Number(record.Opos) +
    //           Number(record.ABneg) +
    //           Number(record.AB) +
    //           Number(record.ABpos) +
    //           Number(record.Cryo)}
    //       </div>
    //     );
    //   },
    // },
  ];

  const handlerClickDownloadButton = async () => {
    // e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("รายงานการออกหน่วย");
    const worksheet = workbook.getWorksheet("รายงานการออกหน่วย");

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

    let mob_name = {};
    if (frmData.mob_code != "") {
      const result = await api.get("/Mob_choice");

      for (let i = 0; i < result.data[0].length; i++) {
        if (result.data[0][i].mob_code == frmData.mob_code) {
          mob_name = result.data[0][i].MOBNAME;
        }
      }
    } else {
      mob_name = "";
    }

    worksheet.columns = [
      { header: "", key: "c1", width: 5 },
      { header: "", key: "c2", width: 35 },
      { header: "", key: "c3", width: 25 },
      { header: "", key: "c4", width: 25 },
      { header: "", key: "c5" },
    ];
    worksheet.addRows([
      { c7: "รายงานการออกหน่วย" },
      {
        c6:
          "ประจำวันที่ " +
          moment(frmData.date_from).format("DD-MM-YYYY") +
          " ถึง " +
          moment(frmData.date_to).format("DD-MM-YYYY"),
      },
      {
        c7: mob_code === "" ? "" : "MOB : " + mob_name,
      },
      {
        c6: "",
      },
      {
        c1: "ลำดับ",
        c2: "สถานที่",
        c3: "วันที่",
        c4: "ประเภทถุง",
        c5: "จำนวน",
      },
    ]);
    let dataTest = [];
    for (let i = 0; i < data_table.length; i++) {
      dataTest[i] = {
        c1: i + 1,
        c2: data_table[i].MOBNAME,
        c3: data_table[i].donor_date,
        c4: data_table[i].bagtype,
        c5: data_table[i].Apos,
      };
    }
    worksheet.addRows(dataTest);
    for (let i = 0; i < data_table.length + 10; i++) {
      [
        "A",
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
    a.download = `รายงานการออกหน่วย ประจำวันที่ ${date}.` + format;
    a.click();
    a.remove();
  };
  return (
    <>
      <Layout keyTab="report_donor_out_area_agency">
        <div>
          <Head>
            <title>SIBSOFT : รายงานการออกหน่วย</title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
        </div>
        <Row justify="center">
          <Col span={24} style={{ padding: "10px" }}>
            <Card style={{ minHeight: "90vh" }}>
              <Tabs type="card">
                <TabPane tab="รายงานการออกหน่วย" key="1">
                  <Row justify="start" style={{ marginTop: "5px" }}>
                    <Col span={24}>
                      <Form
                        form={frm_searchdata}
                        initialValues={{
                          date_from: moment().add(543, "year"),
                          date_to: moment().add(543, "year"),
                          mob_code: "",
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
                          <Form.Item label="หน่วยบริจาค" name="mob_code">
                            <Select
                              showSearch
                              dropdownMatchSelectWidth={false}
                              placement={placement}
                              style={{ width: "200px" }}
                              placeholder="MOB"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={Search_data}
                            >
                              {data_MOB?.map((item) => (
                                <Option key={item.MOBCODE} value={item.MOBCODE}>
                                  {item.MOBNAME}
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
                        : "รายงานการออกหน่วย"}
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
                    <Col span={24}>
                      <Table
                        className="xm"
                        columns={columns}
                        dataSource={data_table}
                        pagination={false}
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

export default Report_donor_out_area_agency;

const PrintDetail = ({ data, dateFrom, dateTo, docSearch, wardSearch }) => {
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
      title: "สถานที่",
      dataIndex: "MOBNAME",
      key: "MOBNAME",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <div>
            <span style={{ float: "left" }}>&nbsp;&nbsp;{text}</span>
          </div>
        );
      },
    },
    {
      title: "วันที่",
      dataIndex: "donor_date",
      key: "donor_date",
      align: "center",
      width: "5%",
    },
    {
      title: "ประเภทถุง",
      dataIndex: "bagtype",
      key: "bagtype",
      align: "center",
      width: "5%",
    },
    {
      title: "จำนวน",
      dataIndex: "",
      key: "",
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
        <h style={{ fontSize: "18px" }}>รายงานการออกหน่วย</h>
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
      {/* <Row>
        <span
          style={{ paddingRight: "10px", paddingBottom: "5px" }}
          id="footerPrint"
        >
          เวลาที่พิมพ์ : {date} {time} น.
        </span>
      </Row> */}
    </div>
  );
};
